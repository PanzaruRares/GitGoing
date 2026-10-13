import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { findRelevantCoursePages, getLectureCatalog } from './courseKnowledge.js';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const LETTERS = ['A', 'B', 'C', 'D'];

function formatSize(bytes) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(file) {
  if (!/\.(pdf|docx)$/i.test(file.name)) {
    return 'Only .pdf and .docx files are supported.';
  }
  if (file.size === 0) {
    return 'That file is empty.';
  }
  if (file.size > MAX_FILE_BYTES) {
    return 'The file is larger than 5 MB.';
  }
  return '';
}

function clip(text, length) {
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

function describeFailure(question, pickedLetter) {
  const options = question.options
    .map((option, i) => `${LETTERS[i]}) ${clip(option, 110)}`)
    .join(' ');
  const correctText = clip(question.options[LETTERS.indexOf(question.answer)], 110);
  const pickedText = clip(question.options[LETTERS.indexOf(pickedLetter)], 110);
  return clip(
    `I got this quiz question wrong. Question: "${clip(question.question, 300)}" Options: ${options}. `
      + `I chose ${pickedLetter} (${pickedText}) but the correct answer is ${question.answer} (${correctText}). `
      + `Please explain simply why ${question.answer} is correct and why my choice is not.`,
    1000,
  );
}

function QuizMaker({ apiBaseUrl }) {
  const catalog = useMemo(() => getLectureCatalog(), []);
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState('lecture');
  const [courseSlug, setCourseSlug] = useState(() => {
    const requested = searchParams.get('course');
    return catalog.some(({ slug }) => slug === requested) ? requested : catalog[0].slug;
  });
  const [chapterNumber, setChapterNumber] = useState(searchParams.get('chapter') || '');
  const [lectureNumber, setLectureNumber] = useState(searchParams.get('lecture') || '');
  const [quizCourse, setQuizCourse] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [help, setHelp] = useState({});
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [truncated, setTruncated] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  function chooseFile(candidate) {
    if (!candidate) {
      return;
    }
    const problem = validateFile(candidate);
    setError(problem);
    setFile(problem ? null : candidate);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  }

  function removeFile() {
    setFile(null);
    setError('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const course = catalog.find(({ slug }) => slug === courseSlug) || catalog[0];
  const chapter = course.chapters.find(({ number }) => number === chapterNumber) || course.chapters[0];
  const lecture = chapter.lectures.find(({ number }) => number === lectureNumber) || chapter.lectures[0];

  async function makeQuiz() {
    const fromLecture = source === 'lecture';
    if ((!fromLecture && !file) || isLoading) {
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const response = fromLecture
        ? await fetch(`${apiBaseUrl}/api/quiz/lecture`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${course.name}: ${lecture.title}`,
            text: lecture.text.slice(0, 25000),
          }),
        })
        : await fetch(`${apiBaseUrl}/api/quiz/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/octet-stream' },
          body: file,
        });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The quiz service returned an unreadable response.');
      }
      if (!response.ok) {
        throw new Error(result.error || `Quiz request failed (${response.status}).`);
      }

      setQuiz(result.questions);
      setQuizCourse(fromLecture ? course.slug : '');
      setQuizTitle(fromLecture ? `${course.name}: ${lecture.title}` : '');
      setHelp({});
      setTruncated(Boolean(result.truncated));
      setIndex(0);
      setAnswers([]);
      setFinished(false);
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Could not reach the quiz service. Make sure the server is running.'
          : requestError.message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  function leaveQuiz() {
    setQuiz(null);
    setAnswers([]);
    setHelp({});
    setIndex(0);
    setFinished(false);
    removeFile();
  }

  async function askGitBuddy(questionIndex) {
    const question = quiz[questionIndex];
    const text = describeFailure(question, answers[questionIndex]);
    setHelp((current) => ({ ...current, [questionIndex]: { status: 'loading' } }));

    try {
      const correctOption = question.options[LETTERS.indexOf(question.answer)];
      const response = await fetch(`${apiBaseUrl}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          context: quizCourse
            ? findRelevantCoursePages(`${question.question} ${correctOption}`, quizCourse)
            : [],
          history: [],
        }),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('GitBuddy returned an unreadable response.');
      }
      if (!response.ok) {
        throw new Error(result.error || `GitBuddy request failed (${response.status}).`);
      }
      setHelp((current) => ({ ...current, [questionIndex]: { status: 'done', answer: result.answer } }));
    } catch (requestError) {
      setHelp((current) => ({
        ...current,
        [questionIndex]: {
          status: 'error',
          error: requestError instanceof TypeError
            ? 'Could not reach GitBuddy. Make sure the server is running.'
            : requestError.message,
        },
      }));
    }
  }

  function retake() {
    setHelp({});
    setAnswers([]);
    setIndex(0);
    setFinished(false);
  }

  if (quiz && finished) {
    const score = quiz.filter((question, i) => answers[i] === question.answer).length;
    const missed = quiz
      .map((question, i) => ({ question, i }))
      .filter(({ question, i }) => answers[i] !== question.answer);

    return (
      <article className="stat-card quiz-card" aria-label="Quiz results">
        <p className="stat-label">Quiz results{quizTitle ? ` · ${quizTitle}` : ''}</p>
        <div className="quiz-score">
          <strong>{score}</strong>
          <span>/ {quiz.length} correct</span>
        </div>
        {missed.length > 0 && (
          <details className="quiz-review">
            <summary>Review {missed.length} missed {missed.length === 1 ? 'question' : 'questions'}</summary>
            <ol>
              {missed.map(({ question, i }) => (
                <li key={i} value={i + 1}>
                  <p>{question.question}</p>
                  <p className="quiz-review-answer">
                    Correct: {question.answer}. {question.options[LETTERS.indexOf(question.answer)]}
                  </p>
                  {question.explanation && <p className="quiz-review-note">{question.explanation}</p>}
                </li>
              ))}
            </ol>
          </details>
        )}
        <div className="quiz-actions">
          <button type="button" className="quiz-button" onClick={retake}>Retake quiz</button>
          <button type="button" className="quiz-button quiz-button-secondary" onClick={leaveQuiz}>
            {quizCourse ? 'Choose another' : 'New document'}
          </button>
        </div>
      </article>
    );
  }

  if (quiz) {
    const question = quiz[index];
    const picked = answers[index];
    const isAnswered = picked !== undefined;
    const isLast = index === quiz.length - 1;

    return (
      <article className="stat-card quiz-card" aria-label="Quiz">
        <div className="quiz-progress-row">
          <p className="stat-label">{quizTitle ? `${quizTitle} · ` : ''}Question {index + 1} of {quiz.length}</p>
          <button type="button" className="quiz-link" onClick={leaveQuiz}>Quit</button>
        </div>
        <div
          className="quiz-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={quiz.length}
          aria-valuenow={index + (isAnswered ? 1 : 0)}
        >
          <span style={{ width: `${((index + (isAnswered ? 1 : 0)) / quiz.length) * 100}%` }} />
        </div>
        <h3 className="quiz-question">{question.question}</h3>
        <div className="quiz-options" role="group" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const letter = LETTERS[optionIndex];
            let state = '';
            if (isAnswered && letter === question.answer) {
              state = 'is-correct';
            } else if (isAnswered && letter === picked) {
              state = 'is-wrong';
            }
            return (
              <button
                type="button"
                key={letter}
                className={`quiz-option ${state}`}
                disabled={isAnswered}
                onClick={() => setAnswers((current) => {
                  const next = [...current];
                  next[index] = letter;
                  return next;
                })}
              >
                <span className="quiz-letter">{letter}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
        <div aria-live="polite">
          {isAnswered && (
            <p className={`quiz-feedback ${picked === question.answer ? 'is-correct' : 'is-wrong'}`}>
              {picked === question.answer ? 'Correct. ' : `Not quite, the answer is ${question.answer}. `}
              {question.explanation}
            </p>
          )}
          {isAnswered && picked !== question.answer && (
            <div className="quiz-help">
              {!help[index] && (
                <button type="button" className="quiz-button quiz-button-secondary" onClick={() => askGitBuddy(index)}>
                  Ask GitBuddy why
                </button>
              )}
              {help[index]?.status === 'loading' && (
                <p className="quiz-note" role="status">GitBuddy is looking at your answer…</p>
              )}
              {help[index]?.status === 'error' && (
                <>
                  <p className="quiz-error" role="alert">{help[index].error}</p>
                  <button type="button" className="quiz-button quiz-button-secondary" onClick={() => askGitBuddy(index)}>
                    Try again
                  </button>
                </>
              )}
              {help[index]?.status === 'done' && (
                <div className="quiz-help-answer">
                  <span className="assistant-message-role">GitBuddy</span>
                  <p>{help[index].answer}</p>
                </div>
              )}
            </div>
          )}
        </div>
        {truncated && index === 0 && (
          <p className="quiz-note">Only the first part of a long document was used.</p>
        )}
        <div className="quiz-actions">
          <button
            type="button"
            className="quiz-button"
            disabled={!isAnswered}
            onClick={() => (isLast ? setFinished(true) : setIndex(index + 1))}
          >
            {isLast ? 'See results' : 'Next question'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="stat-card quiz-card" aria-label="Quiz maker">
      <p className="stat-label">Quiz maker</p>
      <div className="quiz-tabs" role="tablist" aria-label="Quiz source">
        <button
          type="button"
          role="tab"
          aria-selected={source === 'lecture'}
          className={`quiz-tab ${source === 'lecture' ? 'is-active' : ''}`}
          onClick={() => { setSource('lecture'); setError(''); }}
        >
          Course lectures
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={source === 'upload'}
          className={`quiz-tab ${source === 'upload' ? 'is-active' : ''}`}
          onClick={() => { setSource('upload'); setError(''); }}
        >
          Upload a document
        </button>
      </div>
      {source === 'lecture' ? (
        <div className="quiz-picker">
          <h3>Quiz yourself on a lecture</h3>
          <label>
            <span>Course</span>
            <select
              value={course.slug}
              onChange={(event) => {
                setCourseSlug(event.target.value);
                setChapterNumber('');
                setLectureNumber('');
              }}
            >
              {catalog.map(({ slug, name }) => <option key={slug} value={slug}>{name}</option>)}
            </select>
          </label>
          <label>
            <span>Chapter</span>
            <select
              value={chapter.number}
              onChange={(event) => {
                setChapterNumber(event.target.value);
                setLectureNumber('');
              }}
            >
              {course.chapters.map(({ number, title }) => (
                <option key={number} value={number}>{number}. {title}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Lecture</span>
            <select value={lecture.number} onChange={(event) => setLectureNumber(event.target.value)}>
              {chapter.lectures.map(({ number, title }) => (
                <option key={number} value={number}>{number}. {title}</option>
              ))}
            </select>
          </label>
        </div>
      ) : (
      <>
      <h3>Turn a document into a quiz</h3>
      <div
        className={`quiz-dropzone ${isDragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id="quiz-file"
          className="quiz-file-input"
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => chooseFile(event.target.files?.[0])}
        />
        {file ? (
          <div className="quiz-file">
            <strong>{file.name}</strong>
            <span>{formatSize(file.size)}</span>
            <button type="button" className="quiz-link" onClick={removeFile}>Remove</button>
          </div>
        ) : (
          <label htmlFor="quiz-file" className="quiz-drop-label">
            <span>Drag a .pdf or .docx file here</span>
            <span className="quiz-drop-hint">or click to browse (max 5 MB)</span>
          </label>
        )}
      </div>
      </>
      )}
      <button
        type="button"
        className="quiz-button"
        disabled={(source === 'upload' && !file) || isLoading}
        onClick={makeQuiz}
      >
        {isLoading ? 'Making quiz…' : source === 'lecture' ? 'Start quiz' : 'Make quiz'}
      </button>
      {isLoading && <p className="quiz-note">Writing 20 questions. This can take up to a minute.</p>}
      {error && <p className="quiz-error" role="alert">{error}</p>}
      <p className="quiz-note">
        {source === 'lecture'
          ? 'The lecture text is sent to Google Gemini to write the questions. Quizzes are easy, 20 questions each.'
          : 'The document text is sent to Google Gemini. The free tier may use submitted content to improve Google products, so avoid sensitive files.'}
      </p>
    </article>
  );
}

export default QuizMaker;

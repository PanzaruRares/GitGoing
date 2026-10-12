import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findRelevantCoursePages } from './courseKnowledge.js';

const welcomeMessage = {
  role: 'assistant',
  content: 'Ask me about a course concept, code example, or data structure.',
};

function getCurrentCourse(pathname) {
  const match = pathname.match(/^\/courses\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export default function ChatAssistant({ apiBaseUrl }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([welcomeMessage]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const endOfMessagesRef = useRef(null);
  const currentCourse = getCurrentCourse(location.pathname);

  useEffect(() => {
    if (isOpen) endOfMessagesRef.current?.scrollIntoView({ block: 'end' });
  }, [isOpen, isSending, messages]);

  async function sendQuestion(event) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion || isSending) return;
    if (!apiBaseUrl) {
      setErrorMessage('The course assistant needs a configured API server.');
      return;
    }

    const userMessage = { role: 'user', content: submittedQuestion };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setQuestion('');
    setErrorMessage('');
    setIsSending(true);

    try {
      const context = findRelevantCoursePages(submittedQuestion, currentCourse);
      const history = nextMessages
        .filter(({ role }) => role === 'user' || role === 'assistant')
        .slice(-8)
        .map(({ role, content }) => ({ role, content: content.slice(0, 500) }));

      const response = await fetch(`${apiBaseUrl}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: submittedQuestion,
          context,
          history,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The assistant service returned an unreadable response.');
      }

      if (!response.ok) {
        throw new Error(result.error || `Assistant request failed (${response.status}).`);
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: result.answer,
          sources: result.sources || [],
        },
      ]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not reach the assistant.');
    } finally {
      setIsSending(false);
    }
  }

  function clearConversation() {
    setMessages([welcomeMessage]);
    setErrorMessage('');
    setQuestion('');
  }

  return (
    <aside className="course-assistant" aria-label="Course assistant">
      {isOpen && (
        <section className="course-assistant-panel" aria-label="Ask the course assistant">
          <header className="course-assistant-header">
            <div>
              <strong>GitBuddy</strong>
              <span>Gemini · grounded in course lessons</span>
            </div>
            <div className="course-assistant-actions">
              <button type="button" onClick={clearConversation} aria-label="Clear conversation">
                Clear
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
                ×
              </button>
            </div>
          </header>
          <div className="course-assistant-privacy">
            Your question and matching lesson excerpts are sent to Google Gemini.
            The free tier may use submitted content to improve Google products.
            Don’t include personal or sensitive information.
          </div>
          <div className="course-assistant-messages" aria-live="polite">
            {messages.map((message, index) => (
              <article className={`assistant-message assistant-message-${message.role}`} key={`${index}-${message.content.slice(0, 20)}`}>
                <span className="assistant-message-role">
                  {message.role === 'user' ? 'You' : 'Tutor'}
                </span>
                <p>{message.content}</p>
                {message.sources?.length > 0 && (
                  <details className="assistant-sources">
                    <summary>Course references</summary>
                    <ul>
                      {message.sources.map((source) => <li key={source}>{source}</li>)}
                    </ul>
                  </details>
                )}
              </article>
            ))}
            {isSending && (
              <p className="assistant-pending" role="status">Looking through the course and thinking…</p>
            )}
            <div ref={endOfMessagesRef} />
          </div>
          {errorMessage && <p className="assistant-error" role="alert">{errorMessage}</p>}
          <form className="course-assistant-form" onSubmit={sendQuestion}>
            <label className="sr-only" htmlFor="course-assistant-question">Ask a course question</label>
            <textarea
              id="course-assistant-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={1000}
              placeholder="Ask about a course topic…"
              rows={2}
              disabled={isSending}
            />
            <button type="submit" disabled={isSending || !question.trim()}>
              {isSending ? 'Sending…' : 'Ask'}
            </button>
          </form>
        </section>
      )}
      <button
        className="course-assistant-toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close GitBuddy' : 'Open GitBuddy'}
      >
        {isOpen ? 'Close GitBuddy' : 'Ask GitBuddy'}
      </button>
    </aside>
  );
}

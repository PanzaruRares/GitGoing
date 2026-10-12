import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaJava, FaUser } from 'react-icons/fa';
import {
  SiCplusplus,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiPython,
} from 'react-icons/si';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl =
  configuredApiUrl || (import.meta.env.DEV ? 'http://127.0.0.1:5000' : '');
const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '');

const shellCommands = [
  { command: 'ls -la', note: 'List all files with details' },
  { command: 'cd projects', note: 'Enter the projects folder' },
  { command: 'cd ..', note: 'Move up one folder' },
  { command: 'cd ~', note: 'Go to your home folder' },
  { command: 'pwd', note: 'Print the current folder' },
  { command: 'mkdir -p my-app/src', note: 'Create nested folders' },
  { command: 'cp file.txt backup.txt', note: 'Copy a file' },
  { command: 'mv old.txt new.txt', note: 'Rename a file' },
  { command: 'mv file.txt ~/Documents/', note: 'Move a file' },
  { command: 'rm file.txt', note: 'Delete a file' },
  { command: 'rm -r old-folder', note: 'Delete a folder and contents' },
  { command: 'cat notes.txt', note: 'Print a file to the terminal' },
  { command: 'less bigfile.log', note: 'Read a file page by page' },
  { command: 'grep "error" app.log', note: 'Search a file for text' },
  { command: 'grep -r "TODO" ./src', note: 'Search a folder recursively' },
  { command: 'man ls', note: 'Open the command manual' },
  { command: 'ls --help', note: 'Show quick command help' },
  { command: 'history', note: 'List previous commands' },
];

const courses = [
  {
    name: 'Linux',
    slug: 'linux',
    level: 'Beginner',
    description: 'Explore the Linux command line, navigate files, and learn the tools used to work inside an operating system.',
    icons: [{ Icon: SiLinux, tone: 'linux' }],
  },
  {
    name: 'HTML / CSS',
    slug: 'html-css',
    level: 'Beginner',
    description: 'Build the structure and visual style of web pages with HTML and CSS, the foundations of the web.',
    icons: [
      { Icon: SiHtml5, tone: 'html' },
      { Icon: SiCss, tone: 'css' },
    ],
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    level: 'Beginner',
    description: 'Learn the language that brings interactive behavior to websites and powers applications across the web.',
    icons: [{ Icon: SiJavascript, tone: 'javascript' }],
  },
  {
    name: 'Python',
    slug: 'python',
    level: 'Beginner',
    description: 'Get started with clear, readable code and use Python to solve problems and create useful programs.',
    icons: [{ Icon: SiPython, tone: 'python' }],
  },
  {
    name: 'Java',
    slug: 'java',
    level: 'Advanced',
    description: 'Study object-oriented programming and build a strong foundation for reliable, large-scale applications.',
    icons: [{ Icon: FaJava, tone: 'java' }],
  },
  {
    name: 'C++',
    slug: 'cpp',
    level: 'Advanced',
    description: 'Understand powerful programming fundamentals, from types and memory to efficient native applications.',
    icons: [{ Icon: SiCplusplus, tone: 'cplusplus' }],
  },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const currentWeekStart = new Date(today);
currentWeekStart.setDate(today.getDate() - today.getDay());

const activityStart = new Date(currentWeekStart);
activityStart.setDate(currentWeekStart.getDate() - 52 * 7);

const activityWeeks = Array.from({ length: 53 }, (_, week) => {
  const days = Array.from({ length: 7 }, (_, day) => {
    const date = new Date(activityStart);
    date.setDate(activityStart.getDate() + week * 7 + day);
    return { date, day, level: 0 };
  });

  return { week, days };
});

const activityMonths = activityWeeks.flatMap(({ week, days }) => {
  const firstOfMonth = days.find(({ date }) => date.getDate() === 1);
  return firstOfMonth
    ? [{ week, label: firstOfMonth.date.toLocaleString('en', { month: 'short' }) }]
    : [];
});

function VimPanel() {
  return (
    <aside className="vim-window" aria-label="Scrollable Bash command examples">
      <div className="vim-titlebar">
        <span className="vim-file">shell.sh</span>
        <span className="vim-mode">BASH</span>
      </div>
      <div className="vim-content">
        <div className="vim-lines">
          {shellCommands.map(({ command, note }, index) => (
            <div className="vim-line" key={command}>
              <span className="vim-line-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <code className={`command ${index % 3 === 1 ? 'accent-cyan' : 'accent-pink'}`}>
                {command}
              </code>
              <span className="command-note"># {note}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="vim-statusbar">
        <span>-- SHELL COMMANDS --</span>
      </div>
    </aside>
  );
}

function TerminalPanel({ onExit }) {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submitCommand(event) {
    event.preventDefault();
    const entered = command.trim();
    if (!entered) return;

    setCommand('');
    const tokens = entered.match(/"[^"]*"|'[^']*'|\S+/g) || [];
    const [name, ...args] = tokens;
    const commandName = name.toLowerCase();
    const argument = args.join(' ').replace(/^["']|["']$/g, '');
    let output = '';

    if (commandName === 'whoami') {
      output = 'guest';
    } else if (commandName === 'ls') {
      output = courses.map(({ name: courseName }) => courseName).join('  ');
    } else if (commandName === 'pwd') {
      output = '/home/guest';
    } else if (commandName === 'help') {
      output = 'Available commands: ls, whoami, pwd, cd <course>, cd .., clear, exit';
    } else if (commandName === 'clear') {
      setHistory([]);
      return;
    } else if (commandName === 'exit') {
      onExit();
      return;
    } else if (commandName === 'cd') {
      if (!argument || argument === '~' || argument === '/' || argument === '..') {
        output = 'Returned to the course home.';
        setHistory((current) => [...current, { command: entered, output }]);
        navigate('/');
        return;
      }

      const normalizedArgument = argument.toLowerCase().replace(/[^a-z0-9]/g, '');
      const course = courses.find(({ name: courseName, slug }) => (
        courseName.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedArgument
        || slug.replace(/[^a-z0-9]/g, '') === normalizedArgument
      ));

      if (course) {
        output = `Opening ${course.name}...`;
        setHistory((current) => [...current, { command: entered, output }]);
        navigate(`/courses/${course.slug}`);
        return;
      }

      output = `cd: ${argument}: course not found. Run "ls" to list available courses.`;
    } else {
      output = `${name}: command not found. Run "help" to see available commands.`;
    }

    setHistory((current) => [...current, { command: entered, output }]);
  }

  return (
    <section className="terminal-window" aria-label="Interactive course navigation terminal">
      <div className="terminal-titlebar">
        <span className="terminal-file">guest@gitgoing: ~</span>
      </div>
      <div className="terminal-output" aria-live="polite">
        <p className="terminal-welcome">GitGoing shell — try <code>whoami</code>, <code>ls</code>, or <code>cd Java</code>.</p>
        {history.map(({ command: entered, output }, index) => (
          <div className="terminal-entry" key={`${index}-${entered}`}>
            <p><span className="terminal-prompt">guest@gitgoing:~$</span> {entered}</p>
            {output && <p className="terminal-result">{output}</p>}
          </div>
        ))}
        <form className="terminal-form" onSubmit={submitCommand}>
          <label className="terminal-prompt" htmlFor="terminal-command">guest@gitgoing:~$</label>
          <input
            id="terminal-command"
            ref={inputRef}
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Enter a terminal command"
          />
        </form>
      </div>
      <div className="terminal-statusbar">
        <span>-- GITGOING SHELL --</span>
        <span>type help for commands</span>
      </div>
    </section>
  );
}

function ProfileDashboard() {
  return (
    <aside className="profile-dashboard" aria-label="Your profile and learning statistics">
      <div className="profile-heading">
        <div className="profile-avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="8" r="3.25" />
            <path d="M5.5 20c.45-3.6 2.75-5.5 6.5-5.5s6.05 1.9 6.5 5.5" />
          </svg>
        </div>
        <div>
          <p className="profile-label">Welcome back</p>
          <h3>Your profile</h3>
        </div>
      </div>

      <div className="dashboard-stats">
        <article className="stat-card chapters-stat">
          <p className="stat-label">Course progress</p>
          <strong>0</strong>
          <span>chapters completed</span>
        </article>

        <article className="stat-card daily-stat">
          <div className="activity-heading">
            <div>
              <p className="stat-label">Daily activity</p>
              <h3>Learning activity</h3>
            </div>
            <span className="activity-total">0 min today</span>
          </div>

          <div className="heatmap-wrap">
            <div className="heatmap-day-labels" aria-hidden="true">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
              <span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="heatmap-calendar">
              <div className="heatmap-months" aria-hidden="true">
                {activityMonths.map(({ week, label }) => (
                  <span key={`${week}-${label}`} style={{ gridColumnStart: week + 1 }}>
                    {label}
                  </span>
                ))}
              </div>
              <div
                className="activity-heatmap"
                role="img"
                aria-label="No learning activity recorded in the past year"
              >
                {activityWeeks.map(({ week, days }) => (
                  <div className="heatmap-week" key={week}>
                    {days.map(({ date, day, level }) => (
                      <span
                        className={`heatmap-cell activity-level-${level}`}
                        key={day}
                        title={`${date.toLocaleDateString('en', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}: no activity`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="heatmap-range" aria-hidden="true">
            <span>{activityStart.getFullYear()}</span><span>{today.getFullYear()}</span>
          </div>
          <div className="heatmap-footer">
            <div className="heatmap-legend" aria-label="Activity level: no activity to more activity">
              <span>Less</span>
              <i className="activity-level-0" />
              <i className="activity-level-1" />
              <i className="activity-level-2" />
              <i className="activity-level-3" />
              <i className="activity-level-4" />
              <span>More</span>
            </div>
          </div>
        </article>
      </div>
    </aside>
  );
}

function HomePage({ terminalOpen, onToggleTerminal }) {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="prompt-mark">&gt;</span> A place to begin</p>
          <h1>Your first line of code starts here<span className="cursor" aria-hidden="true">_</span></h1>
          <a className="primary-cta" href="#courses">
            Explore courses <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        {terminalOpen
          ? <TerminalPanel onExit={onToggleTerminal} />
          : <VimPanel />}
      </section>

      <section className="courses-section" id="courses">
        <div className="dashboard-layout">
          <div className="course-list-column">
            <div className="course-list-heading">
              <p className="eyebrow"><span className="prompt-mark">&gt;</span> Pick your starting point</p>
              <h2>Courses</h2>
              <p>Choose a topic and start learning.</p>
            </div>
            <div className="course-list">
              {courses.map(({ name, level, icons, slug }, index) => (
                <Link className="course-row" to={`/courses/${slug}`} key={name}>
                  <span className="course-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="course-icons" aria-hidden="true">
                    {icons.map(({ Icon, tone }) => (
                      <Icon className={`course-logo logo-${tone}`} key={tone} />
                    ))}
                  </span>
                  <span className="course-name">{name}</span>
                  <span className={`course-level ${level === 'Advanced' ? 'level-advanced' : ''}`}>
                    {level}
                  </span>
                  <span className="course-arrow" aria-hidden="true">-&gt;</span>
                </Link>
              ))}
            </div>
          </div>
          <ProfileDashboard />
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow"><span className="prompt-mark">&gt;</span> Your learning space</p>
        <h2>Make the first step. Then keep going.</h2>
        <p>Explore a topic, practice what you learn, and work toward a project of your own.</p>
      </section>
    </main>
  );
}

function CoursePage() {
  const { courseSlug } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const course = courses.find(({ slug }) => slug === courseSlug);

  if (!course) {
    return (
      <main className="course-not-found">
        <p className="eyebrow"><span className="prompt-mark">&gt;</span> 404 / course not found</p>
        <h1>This course directory does not exist.</h1>
        <Link className="course-back-link" to="/#courses">Back to all courses</Link>
      </main>
    );
  }

  const CourseIcon = course.icons[0].Icon;
  const pageClass = `course-page course-theme-${course.slug}`;

  return (
    <main className={pageClass}>
      <section className="course-detail">
        <div className="course-detail-topline">
          <span>GITGOING / COURSES / {course.name.toUpperCase()}</span>
          <span>{course.level.toUpperCase()}</span>
        </div>
        <div className="course-detail-content">
          <div className="course-detail-copy">
            <p className="course-detail-kicker">COURSE DIRECTORY</p>
            <h1>{course.name}<span className="course-detail-cursor">_</span></h1>
            <p className="course-detail-description">{course.description}</p>
            <Link className="course-back-link" to="/#courses">
              <span aria-hidden="true">&lt;-</span> Back to all courses
            </Link>
          </div>
          <div className="course-emblem" aria-hidden="true">
            <CourseIcon />
          </div>
        </div>
      </section>

      <section className="chapter-section" aria-labelledby="chapter-section-title">
        <div className="chapter-section-heading">
          <p className="course-detail-kicker">COURSE CONTENT</p>
          <h2 id="chapter-section-title">Chapters</h2>
          <p>Select a chapter to view its lectures, quizzes, and test.</p>
        </div>
        <div className="chapter-list">
          {Array.from({ length: 5 }, (_, index) => {
            const isSelected = selectedChapter === index;
            const panelId = `${course.slug}-chapter-${index + 1}-content`;

            return (
              <div className={`chapter-item${isSelected ? ' is-open' : ''}`} key={panelId}>
                <button
                  className="chapter-tab"
                  type="button"
                  aria-expanded={isSelected}
                  aria-controls={panelId}
                  onClick={() => setSelectedChapter(isSelected ? null : index)}
                >
                  <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>Chapter {index + 1}</span>
                  <span className="chapter-chevron" aria-hidden="true">{isSelected ? '−' : '+'}</span>
                </button>
                {isSelected && (
                  <div className="chapter-dropdown" id={panelId}>
                    <ol className="chapter-sequence">
                      <li className="chapter-group">
                        <h3>01 <span>Learn & check</span></h3>
                        <div className="chapter-group-resources">
                          <Link className="chapter-resource lecture-resource" to={`/courses/${course.slug}/lecture/1`}>
                            Lecture 1
                          </Link>
                          <Link className="chapter-resource quiz-resource" to={`/courses/${course.slug}/quiz/1`}>
                            Quiz 1
                          </Link>
                        </div>
                      </li>
                      <li className="chapter-group">
                        <h3>02 <span>Learn & check</span></h3>
                        <div className="chapter-group-resources">
                          <Link className="chapter-resource lecture-resource" to={`/courses/${course.slug}/lecture/2`}>
                            Lecture 2
                          </Link>
                          <Link className="chapter-resource quiz-resource" to={`/courses/${course.slug}/quiz/2`}>
                            Quiz 2
                          </Link>
                        </div>
                      </li>
                      <li className="chapter-group final-chapter-group">
                        <h3>03 <span>Finish chapter</span></h3>
                        <div className="chapter-group-resources">
                          <Link className="chapter-resource lecture-resource" to={`/courses/${course.slug}/lecture/3`}>
                            Lecture 3
                          </Link>
                          <div className="chapter-resource chapter-test">Chapter Test</div>
                        </div>
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function CourseActivityPage() {
  const { courseSlug, itemType, itemNumber } = useParams();
  const course = courses.find(({ slug }) => slug === courseSlug);
  const number = Number(itemNumber);
  const validType = itemType === 'lecture' || itemType === 'quiz';
  const maxNumber = itemType === 'lecture' ? 3 : 2;

  if (!course || !validType || !Number.isInteger(number) || number < 1 || number > maxNumber) {
    return (
      <main className="course-not-found">
        <p className="eyebrow"><span className="prompt-mark">&gt;</span> 404 / lesson not found</p>
        <h1>This course activity does not exist.</h1>
        <Link className="course-back-link" to="/#courses">Back to all courses</Link>
      </main>
    );
  }

  const title = `${itemType === 'lecture' ? 'Lecture' : 'Quiz'} ${number}`;

  return (
    <main className={`course-page course-theme-${course.slug}`}>
      <section className="course-detail activity-detail">
        <div className="course-detail-topline">
          <span>GITGOING / COURSES / {course.name.toUpperCase()}</span>
          <span>{itemType.toUpperCase()} {String(number).padStart(2, '0')}</span>
        </div>
        <div className="activity-detail-content">
          <p className="course-detail-kicker">{course.name} / CHAPTER 1</p>
          <h1>{title}<span className="course-detail-cursor">_</span></h1>
          <p className="course-detail-description">
            {title} content for {course.name} will be available here.
          </p>
          <Link className="course-back-link" to={`/courses/${course.slug}`}>
            <span aria-hidden="true">&lt;-</span> Back to {course.name}
          </Link>
        </div>
      </section>
    </main>
  );
}

function AccountDialog({ mode, onClose, onAuthenticated }) {
  const dialogRef = useRef(null);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isSignUp = mode === 'signup';
  const isForgotPassword = mode === 'forgot';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mode && !dialog.open) dialog.showModal();
    if (!mode && dialog.open) dialog.close();
  }, [mode]);

  useEffect(() => {
    setEmail('');
    setDisplayName('');
    setPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  }, [mode]);

  async function submitAccountForm(event) {
    event.preventDefault();
    if (!apiBaseUrl) {
      setErrorMessage('Accounts are unavailable in this static preview.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/auth/${
          isSignUp ? 'register' : isForgotPassword ? 'forgot-password' : 'login'
        }`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            ...(!isForgotPassword ? { password } : {}),
            ...(isSignUp && displayName.trim()
              ? { displayName: displayName.trim() }
              : {}),
          }),
        },
      );

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('The account service returned an unreadable response.');
      }

      if (!response.ok) {
        throw new Error(result.error || `Request failed (${response.status}).`);
      }

      if (isSignUp || isForgotPassword) {
        setPassword('');
        setSuccessMessage(result.message);
        return;
      }

      onAuthenticated(result.user);
      onClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Could not complete the account request.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeDialog() {
    onClose();
  }

  return (
    <dialog
      className="auth-dialog"
      ref={dialogRef}
      aria-labelledby="auth-dialog-title"
      onClose={() => onClose()}
    >
      <section className="auth-dialog-content">
        <div className="auth-dialog-heading">
          <div>
            <p className="eyebrow">GITGOING / ACCOUNT</p>
            <h2 id="auth-dialog-title">
              {isSignUp
                ? 'Create account'
                : isForgotPassword
                  ? 'Reset password'
                  : 'Log in'}
            </h2>
          </div>
          <button
            className="auth-dialog-close"
            type="button"
            onClick={closeDialog}
            aria-label="Close account dialog"
          >
            ×
          </button>
        </div>
        <form className="auth-form" onSubmit={submitAccountForm}>
          {isSignUp && (
            <label>
              Display name <span>(optional)</span>
              <input
                type="text"
                name="displayName"
                autoComplete="name"
                maxLength={80}
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          {!isForgotPassword && (
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                minLength={isSignUp ? 12 : undefined}
                maxLength={128}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {isSignUp && <small>Use at least 12 characters.</small>}
            </label>
          )}
          {mode === 'login' && (
            <button
              className="auth-forgot-link"
              type="button"
              onClick={() => onClose('forgot')}
            >
              Forgot password?
            </button>
          )}
          {errorMessage && <p className="auth-form-message error" role="alert">{errorMessage}</p>}
          {successMessage && <p className="auth-form-message success" role="status">{successMessage}</p>}
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Please wait…'
              : isSignUp
                ? 'Create account'
                : isForgotPassword
                  ? 'Send reset link'
                  : 'Log in'}
          </button>
        </form>
        <p className="auth-dialog-switch">
          {isSignUp
            ? 'Already have an account?'
            : isForgotPassword
              ? 'Remember your password?'
              : 'New to GitGoing?'}
          <button
            type="button"
            onClick={() =>
              onClose(isSignUp ? 'login' : isForgotPassword ? 'login' : 'signup')
            }
          >
            {isSignUp || isForgotPassword ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </section>
    </dialog>
  );
}

function SiteLayout() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [accountUser, setAccountUser] = useState(null);
  const [accountStatus, setAccountStatus] = useState(
    apiBaseUrl ? 'checking' : 'unavailable',
  );
  const [accountError, setAccountError] = useState('');
  const [authMode, setAuthMode] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const accountMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiBaseUrl) return undefined;

    const controller = new AbortController();

    async function loadAccount() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          credentials: 'include',
          signal: controller.signal,
        });

        if (response.status === 401) {
          setAccountUser(null);
          setAccountStatus('anonymous');
          return;
        }

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }

        setAccountUser(result.user);
        setAccountStatus('authenticated');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setAccountStatus('error');
        setAccountError(
          error instanceof Error ? error.message : 'Could not check your account.',
        );
      }
    }

    loadAccount();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView();
      });
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  function toggleTerminal() {
    if (location.pathname !== '/') {
      navigate('/');
      setTerminalOpen(true);
      return;
    }
    setTerminalOpen((isOpen) => !isOpen);
  }

  function openAuthDialog(mode) {
    accountMenuRef.current.open = false;
    setAuthMode(mode);
  }

  function closeAuthDialog(nextMode = null) {
    setAuthMode(nextMode);
  }

  async function logOut() {
    if (!apiBaseUrl) {
      setAccountError('Accounts are unavailable in this static preview.');
      return;
    }

    setIsLoggingOut(true);
    setAccountError('');
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        let result;
        try {
          result = await response.json();
        } catch {
          throw new Error('The account service returned an unreadable response.');
        }
        throw new Error(result.error || `Request failed (${response.status}).`);
      }

      setAccountUser(null);
      setAccountStatus('anonymous');
      accountMenuRef.current.open = false;
    } catch (error) {
      setAccountError(
        error instanceof Error ? error.message : 'Could not log out.',
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="GitGoing home">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span>GitGoing</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <button className="terminal-nav-button" type="button" onClick={toggleTerminal}>
            {terminalOpen && location.pathname === '/' ? 'Vim editor' : 'Terminal'}
          </button>
        </nav>
        <details className="account-menu" ref={accountMenuRef}>
          <summary className="account-trigger">
            <FaUser className="account-icon" aria-hidden="true" />
            <span>Account</span>
            <span className="account-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="account-options">
            {accountUser ? (
              <>
                <div className="account-user">
                  <strong>{accountUser.displayName || 'Learner'}</strong>
                  <small>{accountUser.email}</small>
                </div>
                <button type="button" onClick={logOut} disabled={isLoggingOut}>
                  {isLoggingOut ? 'Logging out…' : 'Log out'}
                </button>
              </>
            ) : accountStatus === 'checking' ? (
              <p className="account-menu-message">Checking account…</p>
            ) : accountStatus === 'unavailable' ? (
              <p className="account-menu-message">
                Accounts are unavailable in this static preview.
              </p>
            ) : (
              <>
                <button type="button" onClick={() => openAuthDialog('login')}>
                  Log in
                </button>
                <button type="button" onClick={() => openAuthDialog('signup')}>
                  Sign up
                </button>
              </>
            )}
            {accountError && <p className="account-menu-message error">{accountError}</p>}
          </div>
        </details>
      </header>
      <AccountDialog
        mode={authMode}
        onClose={closeAuthDialog}
        onAuthenticated={(user) => {
          setAccountUser(user);
          setAccountStatus('authenticated');
          setAccountError('');
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              terminalOpen={terminalOpen}
              onToggleTerminal={() => setTerminalOpen(false)}
            />
          }
        />
        <Route path="/courses/:courseSlug/:itemType/:itemNumber" element={<CourseActivityPage />} />
        <Route path="/courses/:courseSlug" element={<CoursePage />} />
        <Route path="*" element={<CoursePage />} />
      </Routes>
      <footer className="site-footer">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span>GitGoing</span>
        </Link>
        <span>Learn by doing<span className="footer-cursor">_</span></span>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <SiteLayout />
    </BrowserRouter>
  );
}

export default App;

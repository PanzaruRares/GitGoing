import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaJava, FaUser } from 'react-icons/fa';
import linuxLessons from './linuxLessons.jsx';
import htmlCssLessons from './htmlCssLessons.jsx';
import javascriptLessons from './javascriptLessons.jsx';
import javaLessons from './javaLessons.jsx';
import cppLessons from './cppLessons.jsx';
import programmingLessons from './programmingLessons.jsx';
import ChatAssistant from './ChatAssistant.jsx';
import QuizMaker from './QuizMaker.jsx';
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
    chapters: [
      {
        title: 'Linux architecture and navigation',
        lectures: [
          'Linux architecture, filesystem hierarchy and navigation',
          'Permissions, ownership, pipes and text processing',
          'Process management, system monitoring and essential tools',
        ],
      },
      {
        title: 'Navigating the filesystem',
        lectures: ['Understand paths', 'List files with ls', 'Move around with cd'],
      },
      {
        title: 'Working with files',
        lectures: ['Create and manage files', 'Read file contents', 'Search with grep'],
      },
      {
        title: 'Users, permissions, and processes',
        lectures: ['Users and groups', 'Read, write, and execute permissions', 'Inspect and manage processes'],
      },
      {
        title: 'Putting commands together',
        lectures: ['Redirect command output', 'Connect commands with pipes', 'Write a script to organize files'],
      },
    ],
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
    chapters: [
      {
        title: 'HTML Fundamentals & Document Structure',
        lectures: [
          'Introduction to the Web and HTML',
          'HTML Boilerplate and Document Anatomy',
          'Semantic HTML5 and Accessibility',
        ],
      },
      {
        title: 'Essential HTML Elements & Forms',
        lectures: [
          'Text Content, Lists and Formatting',
          'Hyperlinks and Media Elements',
          'Forms and User Input Handling',
        ],
      },
      {
        title: 'CSS Fundamentals & Selectors',
        lectures: [
          'Introduction to CSS and Inclusion Methods',
          'CSS Rules and Declaration Syntax',
          'Selectors and Specificity Hierarchy',
        ],
      },
      {
        title: 'The Box Model & Positioning',
        lectures: [
          'The CSS Box Model and Sizing',
          'Display Types and Document Flow',
          'Positioning Modes and Offsets',
        ],
      },
      {
        title: 'Modern Layout & Responsive Design',
        lectures: [
          'Flexbox Layout Engine',
          'CSS Grid Layout Engine',
          'Responsive Design, Media Queries and CSS Variables',
        ],
      },
    ],
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    level: 'Beginner',
    description: 'Learn the language that brings interactive behavior to websites and powers applications across the web.',
    icons: [{ Icon: SiJavascript, tone: 'javascript' }],
    allowQuizzes: false,
    chapters: [
      {
        title: 'Introduction',
        lectures: [
          'Lecture 1: What Is JavaScript & How the Web Works',
          'Lecture 2: Data Types & the Console',
          'Lecture 3: Variables & String Interpolation',
          'Lecture 4: JavaScript Style Guide & Best Practices',
        ],
      },
      {
        title: 'Conditionals',
        lectures: [
          'Lecture 1: Decision Making and Boolean Logic',
          'Lecture 2: if, else, and Comparison Operators',
          'Lecture 3: Logical Operators and Truthy/Falsy Values',
          'Lecture 4: Ternary and switch',
          'Lecture 5: Short-Circuiting, Defaults, and Optional Chaining',
          'Lecture 6: Guard Clauses and Early Returns',
          'Lecture 7: Lookup Tables, Maps, and Strategy Patterns',
          'Lecture 8: Common Pitfalls and Best Practices',
        ],
      },
      {
        title: 'Functions',
        lectures: [
          'Lecture 1: Introduction to Functions',
          'Lecture 2: Function Declarations and Expressions',
          'Lecture 3: Arrow Functions',
          'Lecture 4: Parameters, Arguments, and Defaults',
          'Lecture 5: Return Values and Execution Flow',
          'Lecture 6: Scope, Hoisting, and Closures',
          'Lecture 7: Execution Context and `this`',
          'Lecture 8: Callbacks, Promises, and Async Functions',
          'Lecture 9: Recursion, Memoization, Composition, and Currying',
          'Lecture 10: Higher-Order Functions and Best Practices',
        ],
      },
      {
        title: 'Scope',
        lectures: [
          'Lecture 1: Introduction to Scope',
          'Lecture 2: Global, Function, Block, and Module Scope',
          'Lecture 3: The Scope Chain and Variable Lookup',
          'Lecture 4: Lexical Scope',
          'Lecture 5: Hoisting and the Temporal Dead Zone',
          'Lecture 6: Closures and Scope Preservation',
          'Lecture 7: Global Scope and Best Practices',
        ],
      },
      {
        title: 'Arrays',
        lectures: [
          'Lecture 1: Introduction to Arrays',
          'Lecture 2: Accessing, Updating, and Sparse Arrays',
          'Lecture 3: Mutating and Non-Mutating Array Methods',
          'Lecture 4: Searching and Transforming Arrays',
          'Lecture 5: Sorting, Reversing, and Uniqueness',
          'Lecture 6: Destructuring and Spread Syntax',
          'Lecture 7: Typed Arrays, Performance, and Best Practices',
        ],
      },
      {
        title: 'Loops',
        lectures: [
          'Lecture 1: Introduction to Loops',
          'Lecture 2: Loop Counters and Scope',
          'Lecture 3: for...in, for...of, and for await...of',
          'Lecture 4: break, continue, and Labeled Loops',
          'Lecture 5: Loops and Array Methods',
          'Lecture 6: Iterables and Generators',
          'Lecture 7: Safe and Efficient Looping',
        ],
      },
      {
        title: 'Iterators',
        lectures: [
          'Lecture 1: Understanding the Iteration Protocols',
          'Lecture 2: The Iterator Protocol',
          'Lecture 3: The Iterable Protocol and Built-in Iterables',
          'Lecture 4: Custom Iterables and Symbols',
          'Lecture 5: Lazy and Infinite Iterators',
          'Lecture 6: Asynchronous Iterators',
          'Lecture 7: Iterator Best Practices and Generators',
        ],
      },
      {
        title: 'Objects',
        lectures: [
          'Lecture 1: Introduction to Objects',
          'Lecture 2: Creating Objects',
          'Lecture 3: Accessing and Updating Properties',
          'Lecture 4: Object Mutability and Protection',
          'Lecture 5: Property Descriptors, Getters, and Setters',
          'Lecture 6: Traversing and Enumerating Objects',
          'Lecture 7: Cloning and Merging Objects',
          'Lecture 8: Prototypes and Inheritance',
          'Lecture 9: Destructuring and Symbols',
          'Lecture 10: Object Best Practices and Maps',
        ],
      },
    ],
  },
  {
    name: 'Python',
    slug: 'python',
    level: 'Beginner',
    description: 'Get started with clear, readable code and use Python to solve problems and create useful programs.',
    icons: [{ Icon: SiPython, tone: 'python' }],
    allowQuizzes: false,
    chapters: [
      {
        title: 'Introduction',
        lectures: [
          'Lecture 1: What Is Python?',
          'Lecture 2: Running Python and Using print()',
          'Lecture 3: Variables, Values, and Basic Types',
          'Lecture 4: Strings, Numbers, and Python Style',
        ],
      },
      {
        title: 'Conditionals',
        lectures: [
          'Lecture 1: Decisions and Boolean Values',
          'Lecture 2: if, elif, and else',
          'Lecture 3: Comparison and Membership Operators',
          'Lecture 4: Combining Conditions with and, or, and not',
          'Lecture 5: Truthiness and Conditional Expressions',
          'Lecture 6: match and Guard Clauses',
          'Lecture 7: Nested Decisions and Clear Branches',
          'Lecture 8: Conditional Best Practices',
        ],
      },
      {
        title: 'Functions',
        lectures: [
          'Lecture 1: Introduction to Functions',
          'Lecture 2: Defining and Calling Functions',
          'Lecture 3: Parameters and Arguments',
          'Lecture 4: Return Values and None',
          'Lecture 5: Default and Keyword Arguments',
          'Lecture 6: Scope and Closures in Functions',
          'Lecture 7: Functions as Values and Lambdas',
          'Lecture 8: Callbacks and Higher-Order Functions',
          'Lecture 9: Recursion and Base Cases',
          'Lecture 10: Function Design and Documentation',
        ],
      },
      {
        title: 'Scope',
        lectures: [
          'Lecture 1: Introduction to Scope',
          'Lecture 2: Local, Global, and Enclosing Names',
          'Lecture 3: LEGB Name Resolution',
          'Lecture 4: Blocks, Modules, and Lifetime',
          'Lecture 5: Closures and nonlocal',
          'Lecture 6: Imports and Namespaces',
          'Lecture 7: Scope Best Practices',
        ],
      },
      {
        title: 'Arrays',
        lectures: [
          'Lecture 1: Python Lists and Sequences',
          'Lecture 2: Indexing, Slicing, and Updating',
          'Lecture 3: Adding, Removing, and Copying Lists',
          'Lecture 4: Searching, Sorting, and Common Methods',
          'Lecture 5: Tuples, Dictionaries, and Sets',
          'Lecture 6: Comprehensions and Unpacking',
          'Lecture 7: Collections and Performance Practices',
        ],
      },
      {
        title: 'Loops',
        lectures: [
          'Lecture 1: Introduction to Loops',
          'Lecture 2: range(), enumerate(), and Loop Variables',
          'Lecture 3: while Loops and Termination',
          'Lecture 4: break and continue',
          'Lecture 5: Nested Loops and Collection Processing',
          'Lecture 6: Loops and Comprehensions',
          'Lecture 7: Loop Best Practices',
        ],
      },
      {
        title: 'Iterators',
        lectures: [
          'Lecture 1: Iterables and Iterators',
          'Lecture 2: The Iterator Protocol',
          'Lecture 3: Built-in Iterables',
          'Lecture 4: Custom Iterators',
          'Lecture 5: Generator Functions and yield',
          'Lecture 6: Lazy Iteration and Generator Expressions',
          'Lecture 7: Asynchronous Iteration and Best Practices',
        ],
      },
      {
        title: 'Objects',
        lectures: [
          'Lecture 1: Introduction to Objects',
          'Lecture 2: Creating Classes and Instances',
          'Lecture 3: Attributes and Methods',
          'Lecture 4: Instance and Class Attributes',
          'Lecture 5: Properties and Encapsulation',
          'Lecture 6: Special Methods and Object Representation',
          'Lecture 7: Inheritance and Method Overriding',
          'Lecture 8: Composition and Object Collaboration',
          'Lecture 9: Dataclasses and Simple Records',
          'Lecture 10: Object Design and Best Practices',
        ],
      },
    ],
  },
  {
    name: 'Java',
    slug: 'java',
    level: 'Advanced',
    description: 'Learn Java from its core types and collections through object-oriented design, error handling, and file input/output.',
    icons: [{ Icon: FaJava, tone: 'java' }],
    chapters: [
      {
        title: 'Introduction',
        lectures: [
          'Lecture 1: What Java Is and Where It Runs',
          'Lecture 2: Running a Java Program and Using the Console',
          'Lecture 3: Variables, Values, and Primitive Types',
          'Lecture 4: Reference Types, Strings, and null',
          'Lecture 5: Expressions, Operators, and Basic Style',
        ],
      },
      {
        title: 'Conditionals',
        lectures: [
          'Lecture 1: Boolean Logic and Comparisons',
          'Lecture 2: if, else if, and else',
          'Lecture 3: switch Statements and Expressions',
          'Lecture 4: Input Validation and Conditional Best Practices',
        ],
      },
      {
        title: 'Methods and Scope',
        lectures: [
          'Lecture 1: Declaring and Calling Methods',
          'Lecture 2: Overloading, Parameters, and Return Values',
          'Lecture 3: Static Members, Instance Members, and this',
          'Lecture 4: Scope, Visibility, and Packages',
          'Lecture 5: Method Contracts, Documentation, and Testing',
        ],
      },
      {
        title: 'Arrays and Strings',
        lectures: [
          'Lecture 1: Arrays and Fixed-Size Sequences',
          'Lecture 2: Indexing, Updating, and Multidimensional Arrays',
          'Lecture 3: String Operations and Immutability',
          'Lecture 4: Comparing, Formatting, and Parsing Text',
        ],
      },
      {
        title: 'Loops and Iteration',
        lectures: [
          'Lecture 1: for, while, and do-while Loops',
          'Lecture 2: for-each, break, and continue',
          'Lecture 3: Iterators and the Iterable Protocol',
          'Lecture 4: Loop Design, Nested Traversal, and Common Errors',
        ],
      },
      {
        title: 'Collections and Generics',
        lectures: [
          'Lecture 1: The Java Collections Framework',
          'Lecture 2: Lists, ArrayList, and LinkedList',
          'Lecture 3: Sets, Maps, and Choosing Collection Types',
          'Lecture 4: Iterating, Sorting, and Transforming Collections',
          'Lecture 5: Generics, Wildcards, and Type Safety',
        ],
      },
      {
        title: 'Objects',
        lectures: [
          'Lecture 1: Classes, Objects, and Instance State',
          'Lecture 2: Encapsulation, Accessors, and Invariants',
          'Lecture 3: Object Equality, toString, and Records',
          'Lecture 4: Inheritance, Interfaces, and Polymorphism',
          'Lecture 5: Composition and Object Collaboration',
          'Lecture 6: Object Design and Best Practices',
        ],
      },
      {
        title: 'Exceptions',
        lectures: [
          'Lecture 1: Exceptions and Failure Paths',
          'Lecture 2: Checked Exceptions and Validation',
          'Lecture 3: Designing Reliable Error Handling',
        ],
      },
      {
        title: 'Input and Output',
        lectures: [
          'Lecture 1: Reading Console Input',
          'Lecture 2: Files, Paths, and Text I/O',
          'Lecture 3: Streams, Readers, Writers, and Resources',
          'Lecture 4: Formatting Data and Choosing an I/O Boundary',
          'Lecture 5: A Small Console-to-File Program',
        ],
      },
    ],
  },
  {
    name: 'C++',
    slug: 'cpp',
    level: 'Advanced',
    description: 'Understand powerful programming fundamentals, from types and memory to efficient native applications.',
    icons: [{ Icon: SiCplusplus, tone: 'cplusplus' }],
    chapters: [
      {
        title: 'Introduction',
        lectures: [
          'Lecture 1: What C++ Is and Where It Runs',
          'Lecture 2: Variables, Built-in Types, and Initialization',
          'Lecture 3: Expressions, Conversions, and Operators',
          'Lecture 4: Strings, Characters, and Basic Formatting',
          'Lecture 5: C++ Style, Headers, and Build Basics',
        ],
      },
      {
        title: 'Conditionals',
        lectures: [
          'Lecture 1: Boolean Logic and Comparisons',
          'Lecture 2: if, else if, and else',
          'Lecture 3: switch, Enums, and Patterned Decisions',
          'Lecture 4: Validation and Conditional Best Practices',
        ],
      },
      {
        title: 'Functions and Scope',
        lectures: [
          'Lecture 1: Declaring, Defining, and Calling Functions',
          'Lecture 2: Parameters, References, and const Correctness',
          'Lecture 3: Overloads, Default Arguments, and Function Contracts',
          'Lecture 4: Scope, Lifetime, and Storage Duration',
          'Lecture 5: Headers, Namespaces, and Program Organization',
        ],
      },
      {
        title: 'Arrays and Strings',
        lectures: [
          'Lecture 1: Built-in Arrays and std::array',
          'Lecture 2: std::vector and Dynamic Sequences',
          'Lecture 3: C++ Strings and Text Processing',
          'Lecture 4: Pointers, References, and Views',
        ],
      },
      {
        title: 'Loops and Iteration',
        lectures: [
          'Lecture 1: for, while, and do-while Loops',
          'Lecture 2: Range-Based for, break, and continue',
          'Lecture 3: Iterators and Iterator Categories',
          'Lecture 4: Loop Design, Complexity, and Common Bugs',
        ],
      },
      {
        title: 'Data Structures and Algorithms',
        lectures: [
          'Lecture 1: Choosing a Data Structure and Measuring Complexity',
          'Lecture 2: Linked Lists and Node Ownership',
          'Lecture 3: Stacks, Queues, and Deques',
          'Lecture 4: Heaps and Priority Queues',
          'Lecture 5: Trees, Binary Search Trees, and Traversal',
          'Lecture 6: Hash Tables and Associative Containers',
          'Lecture 7: Standard Algorithms, Complexity, and Data-Structure Choices',
        ],
      },
      {
        title: 'Objects and Memory Management',
        lectures: [
          'Lecture 1: Classes, Objects, and Invariants',
          'Lecture 2: Constructors, Destructors, and RAII',
          'Lecture 3: Stack, Heap, Pointers, and Object Lifetime',
          'Lecture 4: Smart Pointers and Ownership Models',
          'Lecture 5: Copying, Moving, and Value Semantics',
          'Lecture 6: Manual Dynamic Allocation and Memory Safety',
          'Lecture 7: Polymorphism, Virtual Functions, and Object Slicing',
          'Lecture 8: Templates and Generic Programming',
        ],
      },
      {
        title: 'Exceptions and Error Handling',
        lectures: [
          'Lecture 1: Exceptions and Failure Paths',
          'Lecture 2: Result Types, Validation, and Error Contracts',
          'Lecture 3: Error Handling, noexcept, and Testing Failures',
        ],
      },
      {
        title: 'Input and Output',
        lectures: [
          'Lecture 1: Console Input and Output Streams',
          'Lecture 2: Files, Paths, and File Streams',
          'Lecture 3: Binary I/O, Serialization, and Encoding',
          'Lecture 4: Streams, Buffers, and Resource Ownership',
          'Lecture 5: Building a Console-to-File Application',
        ],
      },
    ],
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

function ProfileDashboard({ signedIn }) {
  const [completed] = useCompletedLectures();
  const courseProgress = courses.map((course) => {
    const total = course.chapters.reduce((sum, chapter) => sum + chapter.lectures.length, 0);
    const done = course.chapters.reduce(
      (sum, chapter, chapterIndex) => sum + chapter.lectures.filter((_, lectureIndex) => (
        completed.includes(`${course.slug}/${chapterIndex + 1}/${lectureIndex + 1}`)
      )).length,
      0,
    );
    return { slug: course.slug, name: course.name, total, done, isComplete: total > 0 && done === total };
  });
  const coursesCompleted = courseProgress.filter(({ isComplete }) => isComplete).length;

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
          <strong>{coursesCompleted}</strong>
          <span>of {courses.length} courses completed</span>
          <ul className="course-progress-list">
            {courseProgress.map(({ slug, name, total, done, isComplete }) => (
              <li key={slug} className={isComplete ? 'is-complete' : ''}>
                <div className="course-progress-row">
                  <span>{name}</span>
                  <span>{done}/{total} lectures</span>
                </div>
                <div
                  className="course-progress-bar"
                  role="progressbar"
                  aria-label={`${name} progress`}
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={done}
                >
                  <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                </div>
              </li>
            ))}
          </ul>
          {!signedIn && (
            <small className="course-progress-note">
              Log in to save your progress to your account.
            </small>
          )}
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

function HomePage({ terminalOpen, onToggleTerminal, signedIn }) {
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
          <ProfileDashboard signedIn={signedIn} />
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

const COMPLETED_KEY = 'gitgoing:completed-lectures';

function readCompleted() {
  try {
    const stored = JSON.parse(localStorage.getItem(COMPLETED_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

const ProgressContext = React.createContext([[], () => {}, true]);

function useProgressStore(accountUser) {
  const [guestCompleted, setGuestCompleted] = useState(readCompleted);
  const [accountCompleted, setAccountCompleted] = useState(null);
  const saveQueue = useRef(Promise.resolve());
  const accountId = accountUser?.id;

  function saveToAccount(list) {
    saveQueue.current = saveQueue.current
      .then(() => fetch(`${apiBaseUrl}/api/progress`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: list }),
      }))
      .catch(() => {});
    return saveQueue.current;
  }

  useEffect(() => {
    const sync = (event) => {
      if (!event.key || event.key === COMPLETED_KEY) setGuestCompleted(readCompleted());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    setAccountCompleted(null);
    if (!accountId || !apiBaseUrl) return undefined;

    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/progress`, {
          credentials: 'include',
          signal: controller.signal,
        });
        if (!response.ok) return;
        const { completed: saved } = await response.json();
        // Guest progress stays in this browser and is never mixed into the account.
        setAccountCompleted(saved);
      } catch {
        // Aborted or offline: leave progress unloaded so toggles cannot overwrite saved data.
      }
    })();
    return () => controller.abort();
  }, [accountId]);

  function toggle(id) {
    const flip = (current) => (current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);

    if (accountId) {
      if (accountCompleted === null) return;
      const next = flip(accountCompleted);
      setAccountCompleted(next);
      saveToAccount(next);
      return;
    }

    setGuestCompleted((current) => {
      const next = flip(current);
      try {
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
      } catch {
        // Storage can be unavailable (private mode); the checkbox still works for this visit.
      }
      return next;
    });
  }

  const ready = !accountId || accountCompleted !== null;
  return [accountId ? accountCompleted ?? [] : guestCompleted, toggle, ready];
}

function useCompletedLectures() {
  return React.useContext(ProgressContext);
}

function CompletionCheckbox({ id, label, completed, onToggle }) {
  const [, , ready] = useCompletedLectures();

  return (
    <label className="lecture-complete">
      <input
        type="checkbox"
        aria-label={`Mark ${label} complete`}
        checked={completed.includes(id)}
        disabled={!ready}
        onChange={() => onToggle(id)}
      />
      <span>{completed.includes(id) ? 'Completed' : 'Mark complete'}</span>
    </label>
  );
}

function CoursePage() {
  const { courseSlug } = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [completed, toggleCompleted] = useCompletedLectures();
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
  const chapters = course.chapters || Array.from({ length: 5 }, (_, index) => ({
    title: `Chapter ${index + 1}`,
    lectures: ['Lecture 1', 'Lecture 2', 'Lecture 3'],
  }));
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
          <p>
            {course.allowQuizzes === false
              ? 'Select a part to open its articles and lessons.'
              : 'Select a chapter to view its lectures, quizzes, and test.'}
          </p>
        </div>
        <div className="chapter-list">
          {chapters.map((chapter, index) => {
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
                  <span>{chapter.title}</span>
                  <span className="chapter-chevron" aria-hidden="true">{isSelected ? '−' : '+'}</span>
                </button>
                {isSelected && (
                  <div className="chapter-dropdown" id={panelId}>
                    {chapter.lectures.length > 0 ? (
                      <ol className="chapter-sequence">
                      {chapter.lectures.map((lecture, lectureIndex) => (
                        <li
                          className={`chapter-group${course.allowQuizzes !== false && lectureIndex === chapter.lectures.length - 1 ? ' final-chapter-group' : ''}`}
                          key={lecture}
                        >
                          <h3>
                            {String(lectureIndex + 1).padStart(2, '0')}
                            <span>
                              {course.allowQuizzes === false
                                ? 'Read & learn'
                                : lectureIndex === chapter.lectures.length - 1
                                  ? 'Finish chapter'
                                  : 'Learn & check'}
                            </span>
                          </h3>
                          <CompletionCheckbox
                            id={`${course.slug}/${index + 1}/${lectureIndex + 1}`}
                            label={lecture}
                            completed={completed}
                            onToggle={toggleCompleted}
                          />
                          <div className="chapter-group-resources">
                            <Link
                              className="chapter-resource lecture-resource"
                              to={course.chapters
                                ? `/courses/${course.slug}/chapter/${index + 1}/lecture/${lectureIndex + 1}`
                                : `/courses/${course.slug}/lecture/${lectureIndex + 1}`}
                            >
                              {lecture}
                            </Link>
                            {course.allowQuizzes !== false && lectureIndex < 2 ? (
                              <Link
                                className="chapter-resource quiz-resource"
                                to={course.chapters
                                  ? `/courses/${course.slug}/chapter/${index + 1}/quiz/${lectureIndex + 1}`
                                  : `/courses/${course.slug}/quiz/${lectureIndex + 1}`}
                              >
                                Quiz {lectureIndex + 1}
                              </Link>
                            ) : course.allowQuizzes !== false && lectureIndex === chapter.lectures.length - 1 ? (
                              <div className="chapter-resource chapter-test">Chapter Test</div>
                            ) : course.allowQuizzes !== false ? (
                              <div className="chapter-resource">Guided practice</div>
                            ) : null}
                          </div>
                        </li>
                      ))}
                      </ol>
                    ) : (
                      <p className="chapter-empty-state">Lessons for this part are being prepared.</p>
                    )}
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

function LinuxLessonPager({ onFinish, lessonPages }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    {
      title: 'Terminal vs. shell: separate the layers',
      content: (
        <>
          <p className="lesson-lead">
            They often share a window, but they are not the same program. That
            distinction pays off when you debug input, customize your workflow,
            or figure out which layer produced an unexpected result.
          </p>
          <section className="lesson-topic">
            <h3>Terminal: the interface layer</h3>
            <p>
              A terminal emulator provides the text UI: it renders output,
              handles keyboard input, and connects the session to a
              <code> pseudo-terminal (PTY)</code>. It transports characters; it
              does not decide what <code>ls -la</code> means.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Shell: the command environment</h3>
            <p>
              A <strong>shell</strong> is a process attached to that terminal.
              It parses command lines, expands variables and patterns, locates
              commands, and starts programs. Bash, Zsh, and Fish are different
              shells, each with its own syntax and features.
            </p>
            <p>
              For example, the shell interprets <code>$HOME</code> in a command
              such as <code>cd "$HOME/projects"</code>. The terminal simply
              displays the command and its output.
            </p>
          </section>
          <aside className="lesson-callout">
            <strong>Quick model</strong>
            <p>
              Terminal emulator ⇄ PTY ⇄ shell ⇄ command/processes. Different
              layers, one interactive session.
            </p>
          </aside>
          <section className="lesson-topic">
            <h3>Why the distinction matters</h3>
            <p>
              A broken font or window setting belongs to the terminal emulator.
              A surprising expansion, alias, or “command not found” usually
              points toward the shell environment. Knowing which layer owns a
              behavior narrows the search fast.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Same terminal, different shell</h3>
            <p>
              Launch Bash or Zsh in the same terminal emulator and the window
              stays the same while command interpretation and interactive
              features change. Shell scripts can also declare which interpreter
              should run them, so shell choice can affect portability.
            </p>
          </section>
          <p className="lesson-takeaway">
            When a command-line behavior surprises you, ask: is it the terminal
            UI, the shell, or the program the shell launched?
          </p>
        </>
      ),
    },
    {
      title: 'What happens after you press Enter?',
      content: (
        <>
          <p className="lesson-lead">
            Follow <code>printf '%s\n' "$HOME"</code> from shell syntax to
            process output.
          </p>
          <section className="lesson-topic">
            <h3>1. Parse and expand</h3>
            <p>
              The shell recognizes the command name, quotes, arguments, and
              expansions. Here <code>$HOME</code> is replaced with the current
              user’s home path; the quotes keep that result together as one
              argument.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>2. Resolve and run</h3>
            <p>
              For an external command, the shell searches locations listed in
              <code> PATH</code>, creates a process, and arranges its working
              directory and environment. <code>cd</code> is a built-in: it must
              change the current shell’s directory.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>3. Stream input and output</h3>
            <p>
              Every process starts with standard input (<code>stdin</code>),
              standard output (<code>stdout</code>), and standard error
              (<code>stderr</code>). By default, output and errors appear in the
              terminal. Redirection and pipes can connect those streams to files
              or other commands.
            </p>
            <pre><code>$ printf '%s\n' "$HOME"{"\n"}/home/learner</code></pre>
          </section>
          <section className="lesson-topic">
            <h3>4. Return a status</h3>
            <p>
              A completed command leaves an exit status. By convention,
              <code> 0</code> means success and a non-zero value signals some
              kind of failure. Shell scripts use that status to make decisions;
              it is separate from the human-readable text printed to the screen.
            </p>
          </section>
          <p className="lesson-takeaway">
            The shell parses and coordinates; a program does its work; streams
            carry data; an exit status reports how the command finished.
          </p>
        </>
      ),
    },
    {
      title: 'The prompt is live context',
      content: (
        <>
          <p className="lesson-lead">
            The prompt is a compact status display, not decoration. Depending on
            its configuration, it can expose the user, host, working directory,
            and Git branch.
          </p>
          <section className="lesson-topic">
            <h3>Read the common fields</h3>
            <p>
              In <code>sam@lab:~/project$</code>, <code>sam</code> is the user,
              <code>lab</code> is the host, and <code>~/project</code> is the
              current directory. The <code>~</code> abbreviation represents the
              user’s home directory.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Prompt symbols are conventions</h3>
            <p>
              A trailing <code>$</code> commonly marks a regular-user prompt;
              <code> #</code> often indicates a privileged shell. These are
              conventions, not guarantees.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>The current directory changes command meaning</h3>
            <p>
              Relative paths are interpreted from the working directory. Running
              <code> ls</code> in a project root can show different files from
              running it in <code>src</code>. Use <code>pwd</code> when that
              context is missing or ambiguous.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Prompts can be customized</h3>
            <p>
              Bash builds its prompt from <code>PS1</code>; other shells use
              their own configuration. It might show Git status, a container,
              or a virtual environment; verify with a command when accuracy
              matters.
            </p>
          </section>
          <p className="lesson-takeaway">
            A prompt is a customizable dashboard for the shell session. Know
            your working directory and privilege level before changing files.
          </p>
        </>
      ),
    },
    {
      title: 'Put the model to work',
      content: (
        <>
          <p className="lesson-lead">
            GitGoing’s terminal is a deliberately small simulator, not a full
            Linux shell. Use it to inspect the command loop, then distinguish
            simulation from real system behavior.
          </p>
          <section className="lesson-topic">
            <h3>Inspect the simulator</h3>
            <p>
              Open <strong>Terminal</strong> from the navigation. Run
              <code> help</code> to inspect its supported commands. It models
              course navigation, not your computer’s filesystem.
            </p>
            <pre><code>$ help{"\n"}Available commands: ls, whoami, pwd, cd &lt;course&gt;, cd .., clear, exit</code></pre>
          </section>
          <section className="lesson-topic">
            <h3>Use output to choose the next command</h3>
            <p>
              Run <code>pwd</code>, then <code>ls</code>. The simulator reports
              <code> /home/guest</code> and lists available courses.
              Try <code>cd Linux</code> to open the Linux course, then use the
              back link. Here <code>cd</code> navigates course pages; in Linux
              it changes the working directory.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Compare identity with location</h3>
            <p>
              Back in the terminal, run <code>whoami</code> and <code>pwd</code>.
              It returns <code>guest</code> and <code> /home/guest</code>. On
              Linux, these report your session user and working directory.
            </p>
          </section>
          <aside className="lesson-callout">
            <strong>Transfer the concept, not the simulator’s output</strong>
            <p>
              Real <code>ls</code> lists directory entries; this simulator lists
              courses. Same command name, different implementation.
            </p>
          </aside>
          <p className="lesson-takeaway">
            Use a real Linux environment to explore actual filesystem and process
            behavior.
          </p>
        </>
      ),
    },
    {
      title: 'Keep the layers straight',
      content: (
        <>
          <p className="lesson-lead">
            You do not need to memorize a diagram. Keep the boundaries clear and
            terminal errors become easier to classify, investigate, and fix.
          </p>
          <section className="lesson-topic">
            <h3>The short version</h3>
            <ul>
              <li><strong>Terminal:</strong> UI and PTY connection.</li>
              <li><strong>Shell:</strong> parser, environment, and command launcher.</li>
              <li><strong>Process:</strong> a running program with streams and an exit status.</li>
              <li><strong>Prompt:</strong> configurable context for the current shell.</li>
            </ul>
            <p>
              A terminal starts a shell; that shell can start commands. The
              shell may also handle built-ins directly. Output returns through
              standard streams to the terminal, and the exit status carries a
              machine-readable result.
            </p>
          </section>
          <section className="lesson-topic">
            <h3>Debug by layer</h3>
            <p>
              No window or garbled characters? Inspect the terminal emulator.
              Wrong expansion or command lookup? Inspect shell settings,
              aliases, and <code>PATH</code>. Unexpected application output?
              Check the command, its arguments, and its inputs.
            </p>
          </section>
          <details className="lesson-check">
            <summary>Quick check: where does <code>$HOME</code> get expanded?</summary>
            <p>
              By the shell, before the command receives its arguments.
            </p>
          </details>
          <details className="lesson-check">
            <summary>Quick check: why is <code>cd</code> usually a shell built-in?</summary>
            <p>
              It must change the working directory of the current shell. A child
              process cannot change its parent shell’s directory.
            </p>
          </details>
          <details className="lesson-check">
            <summary>Quick check: what does a non-zero exit status signal?</summary>
            <p>
              Conventionally, that the command did not complete successfully.
              The exact meaning depends on the command.
            </p>
          </details>
          <p className="lesson-takeaway">
            Next: put this model to work while navigating paths and inspecting
            files—the point where shell context starts saving real time.
          </p>
        </>
      ),
    },
  ];
  const activePages = lessonPages || pages;
  const page = activePages[currentPage];
  const progress = Math.round(((currentPage + 1) / activePages.length) * 100);

  return (
    <div className="lesson-pager">
      <div className="lesson-progress">
        <div className="lesson-progress-label">
          <span>PAGE {currentPage + 1} OF {activePages.length}</span>
          <span>{progress}% COMPLETE</span>
        </div>
        <div
          className="lesson-progress-track"
          role="progressbar"
          aria-label="Lecture progress"
          aria-valuemin={1}
          aria-valuemax={activePages.length}
          aria-valuenow={currentPage + 1}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <section className="lesson-page" aria-live="polite">
        <h2>{page.title}</h2>
        {page.content}
      </section>
      <nav className="lesson-pagination" aria-label="Lecture pages">
        <button
          type="button"
          onClick={() => setCurrentPage((pageIndex) => Math.max(0, pageIndex - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>Page {currentPage + 1} / {activePages.length}</span>
        {currentPage === activePages.length - 1 ? (
          <button type="button" onClick={onFinish}>
            Finish
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentPage((pageIndex) => Math.min(activePages.length - 1, pageIndex + 1))}
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
}

function CourseActivityPage() {
  const { courseSlug, chapterNumber, itemType, itemNumber } = useParams();
  const navigate = useNavigate();
  const [completed, toggleCompleted] = useCompletedLectures();
  const course = courses.find(({ slug }) => slug === courseSlug);
  const number = Number(itemNumber);
  const selectedChapterNumber = chapterNumber ? Number(chapterNumber) : 1;
  const chapter = course?.chapters?.[selectedChapterNumber - 1];
  const validType = itemType === 'lecture' ||
    (itemType === 'quiz' && course?.allowQuizzes !== false);
  const maxNumber = itemType === 'lecture' ? chapter?.lectures.length ?? 3 : 2;

  if (
    !course ||
    !validType ||
    !Number.isInteger(number) ||
    number < 1 ||
    number > maxNumber ||
    !Number.isInteger(selectedChapterNumber) ||
    selectedChapterNumber < 1 ||
    (course.chapters && !chapter)
  ) {
    return (
      <main className="course-not-found">
        <p className="eyebrow"><span className="prompt-mark">&gt;</span> 404 / lesson not found</p>
        <h1>This course activity does not exist.</h1>
        <Link className="course-back-link" to="/#courses">Back to all courses</Link>
      </main>
    );
  }

  const courseLessons = course.slug === 'linux'
    ? linuxLessons
    : course.slug === 'html-css'
    ? htmlCssLessons
    : course.slug === 'javascript'
    ? javascriptLessons
    : course.slug === 'java'
    ? javaLessons
    : course.slug === 'cpp'
    ? cppLessons
    : programmingLessons[course.slug];
  const currentChapter = courseLessons
    ? courseLessons[selectedChapterNumber]
    : null;
  const currentLesson = itemType === 'lecture'
    ? currentChapter?.lectures?.[number] ||
      (number === 1 && currentChapter?.pages ? currentChapter : null)
    : null;
  const title = itemType === 'lecture'
    ? currentLesson?.title || chapter?.lectures[number - 1] || `Lecture ${number}`
    : `Quiz ${number}`;

  return (
    <main className={`course-page course-theme-${course.slug}`}>
      <section className="course-detail activity-detail">
        <div className="course-detail-topline">
          <span>GITGOING / COURSES / {course.name.toUpperCase()}</span>
          <span>
            {itemType.toUpperCase()} {String(number).padStart(2, '0')}
            {course.chapters && ` / CHAPTER ${String(selectedChapterNumber).padStart(2, '0')}`}
          </span>
        </div>
        <div className="activity-detail-content">
          <p className="course-detail-kicker">
            {course.name} / {chapter?.title || `CHAPTER ${selectedChapterNumber.toString().padStart(2, '0')}`}
          </p>
          <h1>{title}<span className="course-detail-cursor">_</span></h1>
          {currentLesson ? (
            <LinuxLessonPager
              key={`${course.slug}-${selectedChapterNumber}-${number}`}
              lessonPages={currentLesson.pages}
              onFinish={() => navigate(`/courses/${course.slug}`)}
            />
          ) : (
            <p className="course-detail-description">
              {title} content for {course.name} will be available here.
            </p>
          )}
          {currentLesson && (
            <CompletionCheckbox
              id={`${course.slug}/${selectedChapterNumber}/${number}`}
              label={title}
              completed={completed}
              onToggle={toggleCompleted}
            />
          )}
          <Link className="course-back-link" to={`/courses/${course.slug}`}>
            <span aria-hidden="true">&lt;-</span> Back to {course.name}
          </Link>
          {currentLesson && (
            <Link
              className="course-back-link"
              to={`/quiz?course=${course.slug}&chapter=${selectedChapterNumber}&lecture=${number}`}
            >
              Take the quiz for this lecture <span aria-hidden="true">-&gt;</span>
            </Link>
          )}
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
  const progress = useProgressStore(accountUser);
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
    <ProgressContext.Provider value={progress}>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="GitGoing home">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span>GitGoing</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <button className="terminal-nav-button" type="button" onClick={toggleTerminal}>
            {terminalOpen && location.pathname === '/' ? 'Vim editor' : 'Terminal'}
          </button>
          <Link className="terminal-nav-button" to="/quiz">Quiz Maker</Link>
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
              signedIn={Boolean(accountUser)}
              terminalOpen={terminalOpen}
              onToggleTerminal={() => setTerminalOpen(false)}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            <main className="quiz-page">
              <QuizMaker apiBaseUrl={apiBaseUrl} />
            </main>
          }
        />
        <Route
          path="/courses/:courseSlug/chapter/:chapterNumber/:itemType/:itemNumber"
          element={<CourseActivityPage />}
        />
        <Route path="/courses/:courseSlug/:itemType/:itemNumber" element={<CourseActivityPage />} />
        <Route path="/courses/:courseSlug" element={<CoursePage />} />
        <Route path="*" element={<CoursePage />} />
      </Routes>
      <ChatAssistant apiBaseUrl={apiBaseUrl} />
      <footer className="site-footer">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span>GitGoing</span>
        </Link>
        <span>Learn by doing<span className="footer-cursor">_</span></span>
      </footer>
    </ProgressContext.Provider>
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

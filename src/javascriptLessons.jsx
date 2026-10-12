import React from 'react';

function lessonPage(title, lead, sections, takeaway) {
  return {
    title,
    content: (
      <>
        <p className="lesson-lead">{lead}</p>
        {sections.map(({ title: sectionTitle, content, code }) => (
          <section className="lesson-topic" key={sectionTitle}>
            <h3>{sectionTitle}</h3>
            {content}
            {code && <pre><code>{code}</code></pre>}
          </section>
        ))}
        <p className="lesson-takeaway">{takeaway}</p>
      </>
    ),
  };
}

const javascriptLessons = {
  1: {
    title: 'Introduction',
    lectures: {
      1: {
        title: 'Lecture 1: What Is JavaScript & How the Web Works',
        pages: [
          {
            title: 'The role of JavaScript in web development',
            content: (
              <>
                <p className="lesson-lead">
                  JavaScript (JS) adds dynamic behavior, program logic, state
                  management, event execution, and data fetching to websites.
                  To understand its role, compare it with the other technologies
                  that make up a typical frontend.
                </p>
                <section className="lesson-topic">
                  <h3>The three pillars of frontend development</h3>
                  <ul>
                    <li>
                      <strong>HTML (HyperText Markup Language)</strong> defines
                      document content and structure: headings, paragraphs,
                      forms, and images.
                    </li>
                    <li>
                      <strong>CSS (Cascading Style Sheets)</strong> controls
                      visual styling, layout, animations, and responsive
                      breakpoints.
                    </li>
                    <li>
                      <strong>JavaScript (JS)</strong> provides dynamic
                      behavior, program logic, state management, event
                      execution, and data fetching.
                    </li>
                  </ul>
                  <p>
                    If a web page were a house, HTML would be its framing,
                    walls, and structure; CSS would be the paint, interior
                    design, and styling; JavaScript would be the plumbing,
                    electrical wiring, and smart-home controls that respond to
                    people. The layers work together, but each has a different
                    responsibility.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Where JavaScript runs</h3>
                  <p>
                    JavaScript first ran in web browsers. Chrome, Firefox,
                    Safari, and Edge include JavaScript engines that read,
                    compile, and execute code on the user’s machine. The
                    browser environment provides web APIs such as the document
                    model, allowing a page to react without a full refresh.
                  </p>
                  <p>
                    JavaScript can also run outside the browser. Node.js,
                    introduced in 2009, embeds Google’s V8 engine in a
                    standalone runtime. It provides server-side capabilities
                    such as building APIs, reading files, and connecting to
                    databases. The language is shared, but the environment’s
                    APIs differ: browser code can work with a page, while
                    Node.js code can work with server and filesystem
                    facilities.
                  </p>
                  <p>
                    An engine is the part that executes JavaScript; a runtime
                    includes the engine and the surrounding tools and APIs.
                    V8 and SpiderMonkey are examples of engines. A browser or
                    Node.js supplies the runtime environment around its
                    engine.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>What happens when a browser loads a script?</h3>
                  <ol>
                    <li>The browser downloads the HTML document.</li>
                    <li>
                      The HTML parser encounters a script element such as
                      <code> &lt;script src="app.js"&gt;&lt;/script&gt;</code>.
                    </li>
                    <li>
                      The browser fetches the JavaScript file and hands it to
                      its JavaScript engine.
                    </li>
                    <li>
                      The engine parses the code into an Abstract Syntax Tree
                      (AST), then may compile it into machine instructions
                      using Just-In-Time (JIT) compilation before executing
                      it.
                    </li>
                  </ol>
                  <p>
                    JavaScript code on the main thread executes one step at a
                    time. Browser APIs can handle waiting for work such as
                    network requests, then notify JavaScript when results are
                    ready. That model lets a page respond to user input while
                    waiting for slower operations.
                  </p>
                </section>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'Lecture 2: Data Types & the Console',
        pages: [
          {
            title: 'Print values and recognize primitive types',
            content: (
              <>
                <p className="lesson-lead">
                  In this first interactive lesson, use the developer console
                  to inspect values and try simple arithmetic. The console is
                  a place to print messages, debug errors, inspect data, and
                  run short JavaScript snippets.
                </p>
                <section className="lesson-topic">
                  <h3>The developer console</h3>
                  <p>
                    Use <code>console.log()</code> to print a value. The
                    parentheses contain the argument passed to the
                    <code> log</code> method, and a semicolon ends the
                    instruction in the style used throughout this course.
                  </p>
                  <pre><code>{'console.log("Hello, World!");'}</code></pre>
                  <p>
                    Open the browser’s developer tools and select the Console
                    tab to run this statement. The string appears as output;
                    changing the text inside the quotes changes what is
                    printed.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Primitive data types</h3>
                  <p>
                    JavaScript classifies values into types. This lesson
                    introduces the basic values you will use in later
                    examples:
                  </p>
                  <ul>
                    <li>
                      <strong>Numbers:</strong> JavaScript uses one
                      <code> Number</code> type for whole numbers and decimal
                      values, such as <code>42</code>, <code>-7</code>,
                      <code> 3.14159</code>, and <code>0.05</code>.
                    </li>
                    <li>
                      <strong>Strings:</strong> Text written inside matching
                      single quotes, double quotes, or backticks, such as
                      <code> "Welcome to Learn JS"</code> or
                      <code> 'JavaScript is fun'</code>.
                    </li>
                    <li>
                      <strong>Booleans:</strong> One of two logical values:
                      <code> true</code> or <code>false</code>.
                    </li>
                    <li>
                      <strong>Undefined:</strong> A declared variable that
                      does not yet have an assigned value.
                    </li>
                    <li>
                      <strong>Null:</strong> An intentional, explicit absence
                      of a value.
                    </li>
                  </ul>
                  <p>
                    <code>undefined</code> commonly describes something that
                    has not been given a value, while <code>null</code> is
                    used when a program deliberately represents “no value.”
                    They are different values and can lead to different
                    results in comparisons.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Basic mathematical operators</h3>
                  <p>
                    Operators perform calculations with numeric values. Try
                    each expression in the console and compare the expression
                    with its result:
                  </p>
                  <ul>
                    <li>Addition: <code>10 + 5</code> produces <code>15</code>.</li>
                    <li>Subtraction: <code>20 - 8</code> produces <code>12</code>.</li>
                    <li>Multiplication: <code>4 * 3</code> produces <code>12</code>.</li>
                    <li>Division: <code>15 / 3</code> produces <code>5</code>.</li>
                    <li>
                      Modulus: <code>10 % 3</code> produces <code>1</code>,
                      the remainder after division.
                    </li>
                  </ul>
                  <pre><code>{'console.log(10 + 5);\nconsole.log(10 % 3);'}</code></pre>
                </section>
                <section className="lesson-topic">
                  <h3>String concatenation</h3>
                  <p>
                    The plus operator can join strings as well as add numbers.
                    Include a space as its own string when you want a visible
                    gap between words.
                  </p>
                  <pre><code>{'console.log("Hello" + " " + "World");\n// Output: Hello World'}</code></pre>
                  <p>
                    Compare <code>10 + 5</code>, which adds two numbers, with
                    <code> "10" + "5"</code>, which joins two strings. The
                    quotes change the type of the values and therefore change
                    what the operator does.
                  </p>
                </section>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Lecture 3: Variables & String Interpolation',
        pages: [
          {
            title: 'Store, update, and display values',
            content: (
              <>
                <p className="lesson-lead">
                  A variable is a named reference used to store a value so a
                  program can use it later. Names make values easier to
                  recognize and let a program update information as it runs.
                </p>
                <section className="lesson-topic">
                  <h3>Choose between const and let</h3>
                  <p>
                    Modern JavaScript provides <code>const</code> and
                    <code> let</code> for declaring variables. Use
                    <code> const</code> when the variable should not be
                    reassigned. It must receive a value when it is declared,
                    and attempting to assign a new value later causes an
                    error.
                  </p>
                  <pre><code>{'const birthYear = 2000;\n// birthYear = 2005; // TypeError: assignment is not allowed'}</code></pre>
                  <p>
                    Use <code>let</code> when the program needs to assign a
                    different value later. The same variable can be updated
                    more than once:
                  </p>
                  <pre><code>{'let currentScore = 0;\ncurrentScore = 10;\ncurrentScore = currentScore + 5;\nconsole.log(currentScore); // 15'}</code></pre>
                  <p>
                    A useful comparison is a fixed label versus a changing
                    counter. A birth year normally stays the same, so
                    <code> const</code> communicates that expectation. A
                    score changes as points are earned, so <code>let</code>
                    fits the job.
                  </p>
                  <p>
                    The older <code>var</code> keyword exists in JavaScript,
                    but modern code generally uses <code>const</code> and
                    <code> let</code> because their scope rules are more
                    predictable.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Inspect values with typeof</h3>
                  <p>
                    The <code>typeof</code> operator reports the type of a
                    value as a string. It helps distinguish values that may
                    look similar when printed.
                  </p>
                  <pre><code>{'const age = 25;\nconst username = "Alex";\nconsole.log(typeof age);      // "number"\nconsole.log(typeof username); // "string"'}</code></pre>
                  <p>
                    Here <code>age</code> stores a number and
                    <code> username</code> stores text. The quotation marks
                    are part of the string syntax, not part of the value
                    reported by <code>typeof</code>.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Template literals and interpolation</h3>
                  <p>
                    Template literals use backticks and let you insert
                    expressions with <code>${'{'}...{'}'}</code>. This is
                    called interpolation. It can be easier to read than
                    joining many separate strings with plus signs.
                  </p>
                  <pre><code>{'const userName = "Taylor";\nconst userPoints = 150;\n\n// Traditional concatenation:\nconsole.log("User " + userName + " has " + userPoints + " points.");\n\n// Template literal:\nconsole.log(`User ${userName} has ${userPoints} points.`);'}</code></pre>
                  <p>
                    Both versions produce the same sentence. The template
                    literal keeps the sentence in one readable piece and
                    marks the values to insert. Expressions can also be
                    calculated inside the braces, for example
                    <code> ${'{'}2 + 2{'}'}</code>.
                  </p>
                </section>
              </>
            ),
          },
        ],
      },
      4: {
        title: 'Lecture 4: JavaScript Style Guide & Best Practices',
        pages: [
          {
            title: 'Naming, comments, and reliable declarations',
            content: (
              <>
                <p className="lesson-lead">
                  Consistent style makes JavaScript easier to read, review,
                  and change. These conventions help distinguish variables
                  from classes and explain why a particular piece of code
                  exists.
                </p>
                <section className="lesson-topic">
                  <h3>Use camelCase for variable and function names</h3>
                  <p>
                    Standard variable and function names generally use
                    camelCase: begin with a lowercase word, then capitalize
                    the first letter of each following word. Do not put
                    spaces or hyphens in identifiers.
                  </p>
                  <pre><code>{'// Good examples\nconst totalAccountBalance = 500;\nlet isUserLoggedIn = true;\n\n// Avoid these styles for ordinary variables\nconst TotalAccountBalance = 500; // PascalCase is commonly used for classes\nlet total_account_balance = 500; // snake_case is not the usual JS convention'}</code></pre>
                  <p>
                    Descriptive names explain what a value represents.
                    <code> isUserLoggedIn</code> communicates a true-or-false
                    state, while a vague name such as <code>flag</code> does
                    not explain what is being checked.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Write comments for people</h3>
                  <p>
                    Comments are ignored by the JavaScript engine and are
                    intended for people reading the source. A single-line
                    comment begins with <code>//</code>; a multi-line comment
                    is written between <code>/*</code> and
                    <code> */</code>.
                  </p>
                  <pre><code>{'// Calculate the total order cost with sales tax.\nconst totalCost = subtotal * 1.08;\n\n/*\n  This script handles initial user authentication\n  and verifies permissions before rendering pages.\n*/'}</code></pre>
                  <p>
                    A helpful comment explains context or intent that is not
                    obvious from the code. Avoid comments that only repeat
                    the next line; update or remove comments when the code
                    changes so they remain trustworthy.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Prefer const unless reassignment is needed</h3>
                  <p>
                    Start with <code>const</code> for a new variable. Change
                    it to <code>let</code> only when the program intentionally
                    assigns a different value later. This makes reassignment
                    visible and reduces accidental changes.
                  </p>
                  <pre><code>{'const taxRate = 0.08;\nlet subtotal = 25;\nsubtotal = subtotal + 5;\nconst total = subtotal * (1 + taxRate);'}</code></pre>
                  <p>
                    In this example, <code>taxRate</code> and the computed
                    <code> total</code> are not reassigned, so they use
                    <code> const</code>. The subtotal changes, so it uses
                    <code> let</code>. Note that <code>const</code> prevents
                    reassigning a variable binding; with arrays and objects,
                    it does not by itself make their contents immutable.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Quick style checklist</strong>
                  <ul>
                    <li>Use camelCase for ordinary variable and function names.</li>
                    <li>Use comments to explain useful context and intent.</li>
                    <li>Prefer <code>const</code>; use <code>let</code> when reassignment is necessary.</li>
                    <li>Choose names that describe the value’s role.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
    },
  },
  2: {
    title: 'Conditionals',
    lectures: {
      1: {
        title: 'Lecture 1: Decision Making and Boolean Logic',
        pages: [
          lessonPage(
            'Make decisions from program data',
            'Programs use conditionals to choose a path based on user input, server responses, or the current state of the application. Without a branch, instructions would simply run in sequence and could not react to changing circumstances.',
            [
              {
                title: 'Conditions create branches',
                content: (
                  <>
                    <p>
                      A condition is an expression evaluated in a Boolean
                      context. Its outcome determines whether JavaScript
                      executes one block, another block, or skips a block.
                      This lets code answer questions such as whether a user
                      is signed in, whether an email is valid, or whether a
                      cart qualifies for free shipping.
                    </p>
                    <p>
                      At the foundation are the two Boolean values
                      <code> true</code> and <code>false</code>. Comparisons
                      such as <code>age &gt;= 18</code> produce a Boolean
                      result, which can then control an <code>if</code>
                      statement.
                    </p>
                  </>
                ),
                code: 'const userAge = 20;\n\nif (userAge >= 18) {\n  console.log("Access granted.");\n}',
              },
              {
                title: 'JavaScript converts values to truthiness',
                content: (
                  <p>
                    An <code>if</code> does not require its condition to
                    literally be <code>true</code> or <code>false</code>.
                    JavaScript converts the expression to a Boolean-like
                    decision: truthy values take the branch, and falsy
                    values do not. Understanding that conversion is
                    essential to avoiding surprising conditionals.
                  </p>
                ),
              },
            ],
            'A conditional is a decision point: evaluate a condition, then choose the path that matches the value or state of the program.',
          ),
        ],
      },
      2: {
        title: 'Lecture 2: if, else, and Comparison Operators',
        pages: [
          lessonPage(
            'Build clear conditional branches',
            'The if statement handles the simplest branch. Add else for a fallback, or else if when there are several mutually exclusive cases. JavaScript checks an else-if ladder from top to bottom and runs only the first matching branch.',
            [
              {
                title: 'if, else, and else if',
                content: (
                  <>
                    <p>
                      Use <code>if</code> when code should run only if a
                      condition is truthy. Add <code>else</code> when the
                      other outcome needs its own behavior. For ranges, order
                      an else-if ladder from the most specific or highest
                      threshold downward.
                    </p>
                    <p>
                      Once a branch matches, JavaScript skips the remaining
                      branches. If no condition matches, the final
                      <code> else</code> acts as the default.
                    </p>
                  </>
                ),
                code: 'const score = 85;\n\nif (score >= 90) {\n  console.log("Grade: A");\n} else if (score >= 80) {\n  console.log("Grade: B");\n} else if (score >= 70) {\n  console.log("Grade: C");\n} else {\n  console.log("Keep practicing.");\n}',
              },
              {
                title: 'Compare values without accidental conversion',
                content: (
                  <>
                    <p>
                      Prefer strict equality, <code>===</code>, and strict
                      inequality, <code>!==</code>. They compare both value
                      and type without first converting one operand.
                      Abstract equality, <code>==</code>, attempts type
                      coercion, which can make comparisons hard to predict.
                    </p>
                    <p>
                      Relational operators <code>&gt;</code>, <code>&lt;</code>,
                      <code> &gt;=</code>, and <code>&lt;=</code> compare
                      numbers or strings. String comparisons are
                      lexicographical, not numeric: for example,
                      <code> "10" &lt; "2"</code> is true because the first
                      characters are compared as text.
                    </p>
                  </>
                ),
                code: '5 === "5"; // false: number and string\n5 == "5";  // true: coercion occurs\n"apple" < "banana"; // true\n"10" < "2"; // true: text comparison',
              },
            ],
            'Use if/else for decisions, order range branches carefully, and use strict equality unless there is a specific, well-understood reason not to.',
          ),
        ],
      },
      3: {
        title: 'Lecture 3: Logical Operators and Truthy/Falsy Values',
        pages: [
          lessonPage(
            'Combine conditions and understand truthiness',
            'Logical operators let a program combine or invert conditions. In JavaScript, they also short-circuit and can return one of their original operands, so their behavior is broader than simply producing true or false.',
            [
              {
                title: 'AND, OR, and NOT',
                content: (
                  <ul>
                    <li>
                      <code>&amp;&amp;</code> evaluates the right operand only
                      when the left operand is truthy.
                    </li>
                    <li>
                      <code>||</code> evaluates the right operand only when
                      the left operand is falsy.
                    </li>
                    <li>
                      <code>!</code> converts its operand to a Boolean and
                      negates it.
                    </li>
                  </ul>
                ),
                code: 'const hasLicense = true;\nconst isSober = true;\nif (hasLicense && isSober) console.log("May drive.");\n\nconst isWeekend = true;\nconst isHoliday = false;\nif (isWeekend || isHoliday) console.log("No work.");\n\nconst isBlocked = false;\nif (!isBlocked) console.log("May comment.");',
              },
              {
                title: 'The eight falsy values',
                content: (
                  <>
                    <p>
                      The falsy values are <code>false</code>, <code>0</code>,
                      <code> -0</code>, <code>0n</code>, the empty string,
                      <code> null</code>, <code>undefined</code>, and
                      <code> NaN</code>. Every other value is truthy, including
                      the strings <code>"0"</code> and <code>"false"</code>,
                      and empty arrays and objects.
                    </p>
                    <p>
                      An empty array is truthy, so <code>if (items)</code>
                      checks whether the array exists, not whether it contains
                      items. To check that it is non-empty, test
                      <code> items.length &gt; 0</code>. Use
                      <code> Boolean(value)</code> or <code>!!value</code>
                      when an explicit Boolean conversion is helpful.
                    </p>
                  </>
                ),
                code: 'const items = [];\nconsole.log(Boolean(items)); // true\nconsole.log(Boolean(items.length)); // false\nconsole.log(Boolean("0")); // true\nconsole.log(Boolean(0)); // false',
              },
              {
                title: 'Logical assignment',
                content: (
                  <p>
                    The operators <code>||=</code>, <code>&amp;&amp;=</code>,
                    and <code>??=</code> combine a condition with assignment.
                    They assign only when the left value is respectively
                    falsy, truthy, or nullish. Choose the operator according
                    to which values count as missing in the application.
                  </p>
                ),
                code: 'let title = "";\ntitle ||= "Untitled";\n\nlet user = { name: "Alice" };\nuser &&= user.name;\n\nlet count = 0;\ncount ??= 10; // remains 0',
              },
            ],
            'Be explicit about the question you are asking: whether a value exists, whether it is truthy, whether a collection is non-empty, or whether two values have the same type and value.',
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Ternary and switch',
        pages: [
          lessonPage(
            'Choose a compact expression or a multi-case branch',
            'The ternary operator and switch statement both express choices, but they are suited to different shapes of decision. Use them when they make the alternatives easier to scan, not merely to shorten the source.',
            [
              {
                title: 'The ternary operator',
                content: (
                  <>
                    <p>
                      The ternary operator has three parts:
                      <code> condition ? valueIfTrue : valueIfFalse</code>.
                      Because it is an expression, it produces a value that
                      can be assigned, returned, inserted into a template
                      literal, or used in JSX.
                    </p>
                    <p>
                      It is a compact choice for one simple condition.
                      Chaining or nesting ternaries quickly becomes difficult
                      to read; use if/else or switch when there are several
                      branches or more than a simple value choice.
                    </p>
                  </>
                ),
                code: 'const age = 20;\nconst status = age >= 18 ? "Adult" : "Minor";\nconsole.log(`Status: ${status}`);\n\n// JSX can use an expression directly:\n// {user ? <Welcome name={user.name} /> : <SignIn /> }',
              },
              {
                title: 'The switch statement',
                content: (
                  <>
                    <p>
                      <code>switch</code> compares one expression against
                      several <code>case</code> values using strict equality.
                      Use <code>break</code> to exit a matching case. Without
                      it, execution falls through into the next case, which
                      should only be intentional and clearly documented.
                    </p>
                    <p>
                      Stacking case labels lets several exact values share
                      behavior. A <code>switch (true)</code> can express
                      ordered relational tests, but an if/else ladder is
                      usually clearer for ranges.
                    </p>
                  </>
                ),
                code: 'const day = "Saturday";\nswitch (day) {\n  case "Monday":\n    console.log("Start of the week.");\n    break;\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend!");\n    break;\n  default:\n    console.log("Another weekday.");\n}',
              },
            ],
            'Use a ternary for a short value choice and switch for many fixed values. Use if/else for ranges, complex conditions, or branches that need several statements.',
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Short-Circuiting, Defaults, and Optional Chaining',
        pages: [
          lessonPage(
            'Use short-circuit operators and safe property access',
            'Short-circuit evaluation means JavaScript may decide the result of a logical expression before evaluating every operand. This enables concise defaults and guarded actions, but the choice between || and ?? matters when zero, false, or empty text are valid.',
            [
              {
                title: 'Short-circuit AND and OR',
                content: (
                  <>
                    <p>
                      <code>a || b</code> returns <code>a</code> when
                      <code> a</code> is truthy; otherwise it returns
                      <code> b</code>. <code>a &amp;&amp; b</code> returns
                      <code> a</code> when it is falsy; otherwise it returns
                      <code> b</code>. These operators return operand values,
                      not necessarily Boolean values.
                    </p>
                    <p>
                      This allows <code>isLogged &amp;&amp; showMessage()</code>
                      to run the second expression only when the first is
                      truthy. Keep side effects in such expressions simple;
                      longer actions are clearer in an explicit if statement.
                    </p>
                  </>
                ),
                code: 'const displayName = userName || "Guest";\nisLogged && console.log("User is active");',
              },
              {
                title: 'Use nullish coalescing for missing values',
                content: (
                  <>
                    <p>
                      <code>||</code> falls back for every falsy value. That
                      can accidentally replace a valid volume of zero or an
                      intentionally empty string. <code>??</code> falls back
                      only when the left side is <code>null</code> or
                      <code> undefined</code>.
                    </p>
                    <p>
                      Use <code>||</code> when all falsy values should trigger
                      a default. Use <code>??</code> when only absent values
                      should trigger it.
                    </p>
                  </>
                ),
                code: 'const userVolume = 0;\nconst volumeWithOr = userVolume || 50; // 50\nconst volumeWithNullish = userVolume ?? 50; // 0',
              },
              {
                title: 'Optional chaining',
                content: (
                  <>
                    <p>
                      Optional chaining, <code>?.</code>, stops property
                      access safely when the value to its left is
                      <code> null</code> or <code>undefined</code>. It returns
                      <code> undefined</code> rather than throwing for a
                      missing link in the chain.
                    </p>
                    <p>
                      Combine it with <code>??</code> when a fallback value is
                      useful. If the result can legitimately be an empty
                      string or zero, check its meaning explicitly rather
                      than using a truthiness test that would reject those
                      values.
                    </p>
                  </>
                ),
                code: 'const city = user?.profile?.address?.city ?? "Unknown";',
              },
            ],
            'Use short-circuiting deliberately: || defaults on falsy values, ?? defaults only on nullish values, and ?. protects a chain of optional property accesses.',
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Guard Clauses and Early Returns',
        pages: [
          lessonPage(
            'Flatten deeply nested decisions',
            'When a function wraps its main work inside several nested if statements, it can form a “pyramid of doom.” Guard clauses handle invalid or exceptional cases early, leaving the main path visible at the top level.',
            [
              {
                title: 'Recognize the nesting problem',
                content: (
                  <p>
                    Deep nesting forces readers to track several conditions
                    before they can see what the function normally does.
                    Each added condition moves the useful work farther to the
                    right and makes it harder to add or review another case.
                    This can also make it easy to accidentally attach an
                    <code> else</code> to the wrong condition.
                  </p>
                ),
                code: 'function processPayment(user, paymentMethod) {\n  if (user) {\n    if (user.isActive) {\n      if (paymentMethod && paymentMethod.hasFunds) {\n        console.log("Processing payment...");\n        return true;\n      }\n    }\n  }\n  return false;\n}',
              },
              {
                title: 'Return early for invalid cases',
                content: (
                  <>
                    <p>
                      A guard clause checks one precondition and returns
                      immediately when it fails. Once all guards pass, the
                      function can continue through its main “happy path”
                      without another level of indentation for each
                      prerequisite.
                    </p>
                    <ul>
                      <li>Failure cases are isolated near the start.</li>
                      <li>The successful path is easier to scan.</li>
                      <li>New business logic does not shift into deeper nesting.</li>
                    </ul>
                  </>
                ),
                code: 'function processPayment(user, paymentMethod) {\n  if (!user) return false;\n  if (!user.isActive) return false;\n  if (!paymentMethod) return false;\n  if (!paymentMethod.hasFunds) return false;\n\n  console.log("Processing payment...");\n  return true;\n}',
              },
              {
                title: 'Keep failure reasons useful',
                content: (
                  <p>
                    A guard clause should not hide why an operation failed
                    when the caller or user needs that information. Return a
                    meaningful result, show an appropriate message, or throw
                    a documented error depending on the function’s contract.
                    The goal is clearer flow, not fewer useful details.
                  </p>
                ),
              },
            ],
            'Check edge cases first, then write the normal path plainly. Return a result that preserves enough information for the caller to respond appropriately.',
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Lookup Tables, Maps, and Strategy Patterns',
        pages: [
          lessonPage(
            'Replace repetitive branches when data describes the choices',
            'A long chain of branches can sometimes be represented as data: keys map to messages, handlers, or calculation functions. This can be easier to extend when the alternatives are fixed and independent.',
            [
              {
                title: 'Object lookup tables for fixed keys',
                content: (
                  <>
                    <p>
                      For string keys and fixed values, an object lookup can
                      replace a switch statement. Use nullish coalescing for
                      a default message when a status has no entry.
                    </p>
                    <p>
                      If keys can come from untrusted input, use a
                      <code> Map</code> or a safely created dictionary rather
                      than assuming every key on a normal object is one of
                      your own entries. Test ownership or use a controlled
                      set of keys so inherited properties are not mistaken
                      for valid actions.
                    </p>
                  </>
                ),
                code: 'const statusMessages = {\n  pending: "Your order is pending.",\n  shipped: "Your order is on the way.",\n  delivered: "Your order has arrived.",\n};\n\nfunction getStatusMessage(status) {\n  return Object.hasOwn(statusMessages, status)\n    ? statusMessages[status]\n    : "Unknown status.";\n}',
              },
              {
                title: 'Map lookups and identity',
                content: (
                  <>
                    <p>
                      <code>Map</code> accepts keys of any type and provides
                      methods such as <code>get</code>, <code>set</code>, and
                      <code> has</code>. It is useful for dynamic mappings
                      and lookups where insertion order or key type matters.
                    </p>
                    <p>
                      Object keys are compared by identity. Creating a new
                      object with the same properties does not retrieve a
                      value stored under a different object key. If the
                      logical key is a role name, store the string
                      <code> "admin"</code> rather than a fresh object
                      <code> {'{ role: "admin" }'}</code>.
                    </p>
                  </>
                ),
                code: 'const accessByRole = new Map([\n  ["admin", "System settings"],\n  ["user", "Personal dashboard"],\n]);\n\nconst access = accessByRole.get("admin") ?? "Guest access";',
              },
              {
                title: 'Strategy functions and polymorphism',
                content: (
                  <>
                    <p>
                      When each branch performs a different multi-step
                      operation, store functions in a strategy table. Validate
                      that a strategy exists before calling it. For behavior
                      attached to different object types, polymorphism lets
                      each object implement the same method instead of
                      branching on a type string.
                    </p>
                    <p>
                      These patterns are not automatically faster or better
                      than if/else. Choose them when they make adding,
                      testing, or replacing alternatives clearer.
                    </p>
                  </>
                ),
                code: 'const shippingCalculators = {\n  standard: (weight) => weight * 1.5,\n  express: (weight) => weight * 3 + 10,\n};\n\nfunction calculateShipping(method, weight) {\n  const calculate = shippingCalculators[method];\n  if (!calculate) throw new Error("Unknown shipping method");\n  return calculate(weight);\n}',
              },
            ],
            'Represent choices as data when that clarifies the relationship. Use a plain branch when it is already simple, and validate keys before invoking lookup results.',
          ),
        ],
      },
      8: {
        title: 'Lecture 8: Common Pitfalls and Best Practices',
        pages: [
          lessonPage(
            'Avoid bugs caused by coercion, assignment, and precision',
            'A conditional can be syntactically valid and still test the wrong thing. Carefully choose comparison operators, recognize truthiness, and account for how JavaScript represents numbers.',
            [
              {
                title: 'Assignment is not comparison',
                content: (
                  <p>
                    A single equals sign assigns a value. Since the
                    assignment expression itself evaluates to that value,
                    <code> if (count = 5)</code> changes <code>count</code>
                    and then treats 5 as truthy. Use <code>===</code> for
                    comparison and enable a linter such as ESLint to flag
                    suspicious assignments in conditions.
                  </p>
                ),
                code: 'let count = 0;\n\n// Bug: assignment changes state and 5 is truthy.\nif (count = 5) {\n  console.log("This branch runs.");\n}\n\n// Intended comparison:\nif (count === 5) {\n  console.log("Count is five.");\n}',
              },
              {
                title: 'Avoid implicit coercion and compare decimals carefully',
                content: (
                  <>
                    <p>
                      An empty array is truthy, even though its length is
                      zero. Loose equality can then apply several conversions
                      that make expressions such as <code>[] == false</code>
                      evaluate to true. Prefer strict equality and explicit
                      checks like <code>items.length &gt; 0</code>.
                    </p>
                    <p>
                      JavaScript numbers use binary floating-point
                      representation, so many decimal fractions cannot be
                      represented exactly. Do not assume a direct equality
                      check on calculated decimal values is reliable.
                    </p>
                  </>
                ),
                code: 'console.log(Boolean([])); // true\nconsole.log([] == false); // true, through coercion\nconsole.log(0.1 + 0.2); // 0.30000000000000004\n\nconst sum = 0.1 + 0.2;\nconst nearlyEqual = Math.abs(sum - 0.3) < 1e-10;',
              },
              {
                title: 'Performance claims need measurement',
                content: (
                  <p>
                    It is tempting to claim that one conditional form is
                    always faster than another, but engine optimizations
                    depend on the code, JavaScript engine, and workload.
                    Choose if/else, switch, or a lookup table for clarity
                    first. If performance matters, benchmark realistic data
                    with a suitable tool and profile the actual application
                    before changing the design.
                  </p>
                ),
              },
              {
                title: 'Best-practice checklist',
                content: (
                  <ul>
                    <li>Prefer <code>===</code> and <code>!==</code> to loose equality.</li>
                    <li>Be explicit when checking whether arrays or strings are empty.</li>
                    <li>Remember that zero, empty text, false, null, undefined, and NaN are falsy.</li>
                    <li>Use <code>??</code> when zero or empty text are valid values.</li>
                    <li>Use <code>?.</code> to access optional nested values safely.</li>
                    <li>Flatten deep nesting with guard clauses where that improves clarity.</li>
                    <li>Keep ternaries simple; prefer if/else for multi-step or multi-branch logic.</li>
                    <li>Choose lookup patterns for maintainability, not assumed speed.</li>
                  </ul>
                ),
              },
            ],
            'Readable conditionals are easier to verify. Make type conversion and fallback behavior deliberate, preserve useful failure information, and measure before optimizing.',
          ),
        ],
      },
    },
  },
  3: {
    title: 'Functions',
    lectures: {
      1: {
        title: 'Lecture 1: Introduction to Functions',
        pages: [
          lessonPage(
            'Functions are reusable building blocks',
            'A function is a named or stored block of JavaScript that performs a task. Functions let you give a useful name to a sequence of steps, reuse those steps, and keep a larger program organized into smaller pieces.',
            [
              {
                title: 'Why functions matter',
                content: (
                  <p>
                    Imagine a store calculating a discounted price in several
                    places. Copying the same arithmetic into every screen makes
                    later changes error-prone. A function gives that rule one
                    home: callers provide the needed values, and the function
                    applies the same steps consistently. This is the DRY
                    principle—“Don’t Repeat Yourself”—used in service of
                    readability, not as a reason to force unrelated logic into
                    one oversized function.
                  </p>
                ),
                code: `function calculateDiscountedPrice(price, discountRate) {
  const discount = price * discountRate;
  return price - discount;
}

const jacketPrice = calculateDiscountedPrice(80, 0.25);
const bookPrice = calculateDiscountedPrice(20, 0.10);

console.log(jacketPrice); // 60
console.log(bookPrice);   // 18`,
              },
              {
                title: 'Functions are first-class values',
                content: (
                  <p>
                    JavaScript treats functions as values. You can store one in
                    a variable, place it in an array or object, pass it to
                    another function, and return it from a function. This
                    flexibility is why callbacks and higher-order functions
                    are common throughout JavaScript.
                  </p>
                ),
                code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

const actions = [greet];
console.log(actions[0]("Mina")); // Hello, Mina!

function runTwice(action) {
  action();
  action();
}

runTwice(() => console.log("Ready"));`,
              },
            ],
            'Think of a function as a small, reusable tool: give it a clear responsibility, provide its inputs, and return a useful result when appropriate.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: Function Declarations and Expressions',
        pages: [
          lessonPage(
            'Choose the function form that makes intent clear',
            'Function declarations and function expressions both create callable functions, but they differ in how they are written and when they can be used. Understanding that difference helps avoid confusing initialization errors.',
            [
              {
                title: 'Function declarations',
                content: (
                  <p>
                    A declaration uses the <code>function</code> keyword
                    followed by a name. Declarations are initialized as part
                    of JavaScript’s scope setup, so they can be called earlier
                    in the same scope than their textual definition. This
                    hoisting behavior can be useful, though keeping definitions
                    near their use can make code easier to follow.
                  </p>
                ),
                code: `const total = add(5, 3); // The declaration is already available

function add(first, second) {
  return first + second;
}

console.log(total); // 8`,
              },
              {
                title: 'Function expressions',
                content: (
                  <p>
                    An expression creates a function as part of an assignment
                    or another expression. The function value is available
                    when that expression runs. A <code>const</code> binding
                    itself cannot be accessed before initialization, so calling
                    it earlier causes a temporal-dead-zone error. Function
                    expressions can be anonymous or named; a name can make
                    recursive calls and debugging clearer.
                  </p>
                ),
                code: `const multiply = function multiplyNumbers(first, second) {
  return first * second;
};

console.log(multiply(4, 2)); // 8

// This would fail before the assignment above runs:
// console.log(multiply(4, 2));`,
              },
              {
                title: 'How to choose',
                content: (
                  <p>
                    Use declarations when a named operation should be easy to
                    find and call throughout its scope. Use expressions when
                    you are assigning behavior to a variable, passing a
                    function as a value, or defining a local callback. Prefer
                    one consistent style within a project and avoid relying on
                    hoisting when it makes execution order hard to understand.
                  </p>
                ),
              },
            ],
            'A declaration is initialized with its scope; an expression is available after its assignment executes. Neither form is inherently better in every situation.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: Arrow Functions',
        pages: [
          lessonPage(
            'Write concise functions without changing their meaning',
            'Arrow functions provide a compact syntax for function expressions. They are especially common for short callbacks, but they are not just shorter spelling: their handling of `this` and construction differs from ordinary functions.',
            [
              {
                title: 'Syntax and implicit return',
                content: (
                  <p>
                    With a block body, an arrow function needs braces and an
                    explicit <code>return</code> to produce a value. With a
                    concise expression body, JavaScript returns that
                    expression automatically. Parentheses around one parameter
                    may be omitted, but using them consistently can make later
                    changes easier.
                  </p>
                ),
                code: `const square = (number) => {
  return number * number;
};

const double = number => number * 2;

const formatLabel = (name) => (
  \`Student: \${name}\`
);

console.log(square(4));          // 16
console.log(double(4));          // 8
console.log(formatLabel("Ari")); // Student: Ari`,
              },
              {
                title: 'Lexical `this`',
                content: (
                  <p>
                    An arrow function does not create its own <code>this</code>;
                    it reads <code>this</code> from the surrounding context.
                    This is useful when a callback should retain the enclosing
                    object’s context. A regular method is often the clearer
                    choice when a method needs its own call-site-based
                    <code> this</code>.
                  </p>
                ),
                code: `const timer = {
  seconds: 0,
  start() {
    setTimeout(() => {
      this.seconds += 1;
      console.log(this.seconds);
    }, 100);
  },
};

timer.start(); // The arrow uses \`this\` from start()`,
              },
              {
                title: 'Other differences from regular functions',
                content: (
                  <ul>
                    <li>
                      Arrow functions have no own <code>arguments</code>{' '}
                      object; use a rest parameter such as <code>...args</code>.
                    </li>
                    <li>
                      They cannot be called with <code>new</code> and do not
                      define a <code>prototype</code> for constructor use.
                    </li>
                    <li>
                      Their <code>this</code> cannot be replaced with
                      <code> call</code>, <code>apply</code>, or
                      <code> bind</code>; those methods can still pass or bind
                      arguments, but not change the arrow’s lexical
                      <code> this</code>.
                    </li>
                  </ul>
                ),
                code: `const collect = (...items) => items;
console.log(collect("pen", "paper")); // ["pen", "paper"]`,
              },
            ],
            'Use arrows for concise expressions and callbacks that inherit their surrounding `this`. Use regular functions for constructors or when a call-site-defined `this` is needed.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Parameters, Arguments, and Defaults',
        pages: [
          lessonPage(
            'Design clear inputs for a function',
            'Parameters are the named inputs in a function definition; arguments are the actual values supplied when the function is called. Clear input conventions make a function easier to reuse and harder to misuse.',
            [
              {
                title: 'Parameters and arguments',
                content: (
                  <p>
                    In <code>greet(name)</code>, <code>name</code> is a
                    parameter. In <code>greet("Kai")</code>, <code>"Kai"</code>{' '}
                    is the argument. The function receives arguments in
                    parameter order. Give parameters descriptive names, and
                    consider an options object when a function has several
                    optional or easily confused settings.
                  </p>
                ),
                code: `function describeBook(title, author) {
  return \`"\${title}" was written by \${author}.\`;
}

console.log(describeBook("The Long Road", "Sam Lee"));`,
              },
              {
                title: 'Default parameter values',
                content: (
                  <p>
                    A default is used when an argument is omitted or explicitly
                    passed as <code>undefined</code>. It is not used for
                    <code> null</code>, <code>0</code>, <code>false</code>, or
                    an empty string. This is more precise than using
                    <code> ||</code> when those values may be meaningful.
                  </p>
                ),
                code: `function greet(name = "Guest", timeOfDay = "day") {
  return \`Good \${timeOfDay}, \${name}!\`;
}

console.log(greet());                    // Good day, Guest!
console.log(greet("Alice", "morning"));  // Good morning, Alice!
console.log(greet(null));                // Good day, null!`,
              },
              {
                title: 'Rest parameters for variable-length input',
                content: (
                  <p>
                    A rest parameter gathers remaining arguments into a real
                    array. It must be the final parameter. Use it when the
                    number of inputs is intentionally flexible, such as
                    summing a list of values.
                  </p>
                ),
                code: `function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum());           // 0`,
              },
            ],
            'Use defaults for missing or undefined values, and rest parameters when a function intentionally accepts any number of trailing arguments.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Return Values and Execution Flow',
        pages: [
          lessonPage(
            'Send results back to the caller',
            'A function can calculate a result and return it to the code that called it. Returning a value also ends that function’s current execution, which makes `return` useful for both results and early exits.',
            [
              {
                title: 'Return ends the current function',
                content: (
                  <p>
                    Once JavaScript reaches a <code>return</code> statement,
                    the function stops and gives that value to its caller.
                    Statements after that return in the same execution path
                    do not run. Guard conditions can use this to handle
                    invalid or exceptional cases before the main calculation.
                  </p>
                ),
                code: `function checkAge(age) {
  if (age < 18) {
    return "Access denied";
  }

  return "Access granted";
}

console.log(checkAge(16)); // Access denied
console.log(checkAge(21)); // Access granted`,
              },
              {
                title: 'Returning versus printing',
                content: (
                  <p>
                    <code>console.log()</code> displays a value for a person
                    inspecting the console; it does not automatically make
                    that value the function’s result. A returned result can
                    be saved, transformed, tested, or passed to another
                    function. Many functions intentionally perform an action
                    instead and return no useful value.
                  </p>
                ),
                code: `function getArea(width, height) {
  return width * height;
}

const area = getArea(5, 3);
console.log(area); // 15

function announce(message) {
  console.log(message);
}

const result = announce("Area calculated");
console.log(result); // undefined`,
              },
              {
                title: 'Implicit `undefined`',
                content: (
                  <p>
                    If a function finishes without reaching a return value,
                    JavaScript returns <code>undefined</code>. The same result
                    occurs with a bare <code>return;</code>. Being deliberate
                    about the return contract helps callers know whether to
                    expect a value or only an action.
                  </p>
                ),
              },
            ],
            'Return values are for program flow and reuse; logging is for observation. Make it clear whether a function computes a value, performs an action, or both.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Scope, Hoisting, and Closures',
        pages: [
          lessonPage(
            'Understand which variables a function can access',
            'Scope determines where a name can be used. Functions are created within a lexical environment, and they can retain access to that environment even after the outer function has returned.',
            [
              {
                title: 'Global, function, and block scope',
                content: (
                  <p>
                    Global bindings are declared outside functions and are
                    broadly accessible. Function-local bindings belong to a
                    function call. <code>let</code> and <code>const</code> are
                    also block-scoped, so names declared inside braces are not
                    available outside that block. Prefer the narrowest useful
                    scope to reduce accidental coupling.
                  </p>
                ),
                code: `const appName = "Study Buddy"; // Global/module scope

function showCourse() {
  const courseName = "JavaScript"; // Function scope

  if (courseName) {
    let message = \`Learning \${courseName}\`; // Block scope
    console.log(message);
  }

  // console.log(message); // ReferenceError: outside its block
}

showCourse();`,
              },
              {
                title: 'Closures preserve lexical access',
                content: (
                  <p>
                    A closure is a function together with the lexical bindings
                    it can still access. Returning an inner function does not
                    erase the outer variables it uses. This lets functions
                    preserve private state without exposing that state as a
                    global variable.
                  </p>
                ),
                code: `function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const increment = createCounter();
console.log(increment()); // 1
console.log(increment()); // 2

const anotherIncrement = createCounter();
console.log(anotherIncrement()); // 1; independent state`,
              },
              {
                title: 'Hoisting and practical guidance',
                content: (
                  <p>
                    Declarations are handled during scope setup, but
                    <code> let</code> and <code>const</code> bindings cannot
                    be accessed before their declaration is evaluated.
                    Function declarations can be called earlier in their
                    scope; function expressions follow the initialization
                    timing of the variable holding them. Rather than relying
                    on subtle ordering, arrange code so definitions and use
                    are easy to trace.
                  </p>
                ),
              },
            ],
            'A closure is useful when a function needs lasting, private state. Keep that state focused and limit how much shared mutable data functions can access.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Execution Context and `this`',
        pages: [
          lessonPage(
            'Follow function calls and understand `this`',
            'JavaScript tracks active work as functions call one another. Each invocation has its own execution context, and the call stack records which function is currently running. For regular functions, the call form also determines the value of `this`.',
            [
              {
                title: 'Execution contexts and the call stack',
                content: (
                  <p>
                    A global execution context is established for a script,
                    and each function call creates a new function execution
                    context with its local bindings and current execution
                    position. Calls are pushed onto the call stack; when one
                    returns, its frame is removed and execution resumes in
                    the caller. Deep or unbounded recursion can exhaust this
                    stack.
                  </p>
                ),
                code: `function first() {
  console.log("first starts");
  second();
  console.log("first resumes");
}

function second() {
  console.log("second runs");
}

first();
// first starts
// second runs
// first resumes`,
              },
              {
                title: 'Call-site behavior of `this`',
                content: (
                  <p>
                    In a regular function, <code>this</code> is not simply
                    determined by where the function was written. It depends
                    on how it is called. Calling a function as an object
                    method supplies that object as <code>this</code>; storing
                    the method in a standalone variable and calling it can
                    lose that receiver. Arrow functions instead inherit
                    <code> this</code> lexically, as described in the
                    previous lecture.
                  </p>
                ),
                code: `function introduce(greeting) {
  return \`\${greeting}, I am \${this.name}\`;
}

const user = { name: "Alice", introduce };
console.log(user.introduce("Hello")); // Hello, I am Alice`,
              },
              {
                title: 'Explicit binding with `call`, `apply`, and `bind`',
                content: (
                  <p>
                    <code>call</code> invokes a regular function with a
                    supplied <code>this</code> and individual arguments.
                    <code> apply</code> also invokes immediately, but takes
                    arguments in an array-like value. <code>bind</code>{' '}
                    creates a new function with a chosen receiver and
                    optionally pre-filled arguments; it does not invoke the
                    function immediately.
                  </p>
                ),
                code: `console.log(introduce.call(user, "Hi"));
// Hi, I am Alice

console.log(introduce.apply(user, ["Welcome"]));
// Welcome, I am Alice

const welcomeAlice = introduce.bind(user, "Welcome");
console.log(welcomeAlice()); // Welcome, I am Alice`,
              },
            ],
            'Use the call stack to reason about execution order. When a regular function depends on `this`, inspect its call form or bind the receiver explicitly.'
          ),
        ],
      },
      8: {
        title: 'Lecture 8: Callbacks, Promises, and Async Functions',
        pages: [
          lessonPage(
            'Use functions to coordinate asynchronous work',
            'JavaScript functions often describe what should happen after a timer, network request, or other operation completes. A callback, Promise handler, or `async` function provides a way to express that later work without blocking the rest of the program.',
            [
              {
                title: 'Callbacks',
                content: (
                  <p>
                    A callback is a function passed to another function to be
                    called later or when a particular event occurs. Callbacks
                    are useful for event listeners and APIs, but deeply
                    nested callbacks can make sequencing and error handling
                    difficult. Keep callbacks small and use a Promise-based
                    API where it fits the task.
                  </p>
                ),
                code: `function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data fetched successfully");
  }, 100);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});`,
              },
              {
                title: 'Promises and handlers',
                content: (
                  <p>
                    A Promise represents the eventual result of an asynchronous
                    operation. <code>.then()</code> handles fulfillment and
                    <code> .catch()</code> handles rejection. Returning a value
                    from a handler passes it to the next Promise in the chain;
                    throwing or returning a rejected Promise sends the failure
                    down the rejection path.
                  </p>
                ),
                code: `function getData() {
  return new Promise((resolve, reject) => {
    const succeeded = true;

    if (succeeded) {
      resolve("Data loaded");
    } else {
      reject(new Error("Unable to load data"));
    }
  });
}

getData()
  .then(data => data.toUpperCase())
  .then(result => console.log(result))
  .catch(error => console.error(error.message));`,
              },
              {
                title: '`async` and `await`',
                content: (
                  <p>
                    An <code>async</code> function always returns a Promise.
                    Inside it, <code>await</code> pauses that function until
                    the awaited Promise settles; it does not block the whole
                    JavaScript runtime. Use <code>try/catch</code> when the
                    function needs to handle a rejection, and preserve or
                    rethrow errors if callers must know that the operation
                    failed.
                  </p>
                ),
                code: `async function fetchUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error(\`Request failed: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not fetch user:", error);
    throw error; // Keep rejection visible to the caller
  }
}`,
              },
            ],
            'Use callbacks for APIs that are designed around them, and Promises or `async`/`await` for chains of asynchronous work. Handle failures explicitly rather than turning them into successful-looking results.'
          ),
        ],
      },
      9: {
        title: 'Lecture 9: Recursion, Memoization, Composition, and Currying',
        pages: [
          lessonPage(
            'Build advanced patterns from small functions',
            'Some problems and APIs are easier to express with functions that call themselves, remember previous results, or combine operations. These patterns are powerful when their contracts and limits are made explicit.',
            [
              {
                title: 'Recursion and base cases',
                content: (
                  <p>
                    Recursion occurs when a function calls itself. Every
                    recursive algorithm needs a base case that stops further
                    calls, and each recursive step should move toward that
                    case. JavaScript engines have finite call-stack capacity,
                    so iterative solutions may be safer for very deep input.
                  </p>
                ),
                code: `function factorial(number) {
  if (!Number.isInteger(number) || number < 0) {
    throw new RangeError("Expected a non-negative integer");
  }

  if (number <= 1) {
    return 1; // Base case
  }

  return number * factorial(number - 1);
}

console.log(factorial(5)); // 120`,
              },
              {
                title: 'Memoization and caching',
                content: (
                  <p>
                    Memoization stores results so repeated calls with the same
                    inputs can reuse prior work. A <code>Map</code> and
                    <code> has()</code> distinguish a cached result such as
                    <code> 0</code> or <code>undefined</code> from a cache
                    miss. This simple example uses argument identity as its
                    key; for object arguments, a deliberate key strategy is
                    needed because two separately created objects are not
                    equal by value.
                  </p>
                ),
                code: `function memoizeUnary(fn) {
  const cache = new Map();

  return function (value) {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = fn.call(this, value);
    cache.set(value, result);
    return result;
  };
}

const slowSquare = number => number * number;
const cachedSquare = memoizeUnary(slowSquare);
console.log(cachedSquare(6)); // 36`,
              },
              {
                title: 'Composition and currying',
                content: (
                  <p>
                    Composition combines functions so the output of one
                    becomes the input of another. Currying transforms a
                    multi-parameter function into a sequence of functions
                    that each take one parameter. Both can make reusable
                    transformations, but avoid them when the resulting code
                    is less clear than a direct function call.
                  </p>
                ),
                code: `const trim = text => text.trim();
const normalize = text => text.toLowerCase();

const normalizeName = text => normalize(trim(text));
console.log(normalizeName("  RIVER  ")); // "river"

const multiply = first => second => first * second;
const double = multiply(2);
console.log(double(5)); // 10`,
              },
            ],
            'Recursion needs a stopping condition, memoization needs a correct cache key, and composition or currying should make a transformation easier to understand.'
          ),
        ],
      },
      10: {
        title: 'Lecture 10: Higher-Order Functions and Best Practices',
        pages: [
          lessonPage(
            'Write focused, predictable functions',
            'Good function design is more than choosing syntax. Aim for functions whose names and inputs make their purpose clear, whose responsibilities are limited, and whose side effects are visible to callers.',
            [
              {
                title: 'Higher-order functions',
                content: (
                  <p>
                    A higher-order function accepts another function as an
                    argument, returns a function, or both. Array methods such
                    as <code>map</code>, <code>filter</code>, and
                    <code>reduce</code> are familiar examples: each receives a
                    callback that describes how to process the values.
                  </p>
                ),
                code: `const prices = [12, 25, 40];

const pricesWithTax = prices.map(price => price * 1.08);
const expensivePrices = prices.filter(price => price >= 20);
const total = prices.reduce((sum, price) => sum + price, 0);

console.log(pricesWithTax);    // [12.96, 27, 43.2]
console.log(expensivePrices);  // [25, 40]
console.log(total);            // 77`,
              },
              {
                title: 'Pure functions and side effects',
                content: (
                  <p>
                    A pure function returns the same result for the same
                    inputs and does not change externally observable state.
                    Pure calculations are easier to test and reuse. Real
                    programs also need side effects—such as writing to a
                    database or displaying a message—so keep those operations
                    clear and separate from calculations when practical.
                  </p>
                ),
                code: `function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

const cart = [{ price: 10 }, { price: 15 }];
const total = calculateTotal(cart); // 25

// This separate function makes the side effect explicit.
function displayTotal(value) {
  console.log(\`Total: $\${value.toFixed(2)}\`);
}

displayTotal(total);`,
              },
              {
                title: 'Single responsibility and shallow control flow',
                content: (
                  <p>
                    Give functions descriptive action names such as
                    <code> calculateTotal</code> or
                    <code> sendConfirmationEmail</code>. A function should
                    have a coherent responsibility; if it validates data,
                    calculates a result, and updates several unrelated
                    systems, consider splitting those steps. Guard clauses
                    and early returns can reduce deep nesting, while a
                    straightforward sequence of steps is preferable when
                    splitting would obscure the flow.
                  </p>
                ),
                code: `function getWelcomeMessage(user) {
  if (!user) {
    return "Welcome, guest!";
  }

  if (!user.name) {
    return "Welcome, member!";
  }

  return \`Welcome, \${user.name}!\`;
}

console.log(getWelcomeMessage({ name: "Nia" }));`,
              },
            ],
            'Prefer clear function names, focused responsibilities, predictable inputs and outputs, and explicit side effects. Choose abstraction only when it improves understanding.'
          ),
        ],
      },
    },
  },
  4: {
    title: 'Scope',
    lectures: {
      1: {
        title: 'Lecture 1: Introduction to Scope',
        pages: [
          lessonPage(
            'Scope controls where names can be used',
            'In JavaScript, scope is the region of a program where an identifier—such as a variable or function name—can be accessed. Scope also affects how long bindings remain reachable. When JavaScript encounters a name, it looks in the current lexical environment and, if necessary, continues outward through enclosing scopes.',
            [
              {
                title: 'Why scope matters',
                content: (
                  <p>
                    Clear scope prevents unrelated parts of an application
                    from accidentally sharing or overwriting names. It also
                    helps make dependencies visible: a function that receives
                    its inputs or defines its own local values is easier to
                    understand than one that silently depends on many globals.
                    Scope and reachability also influence garbage collection:
                    values that remain reachable through active references
                    cannot yet be reclaimed.
                  </p>
                ),
              },
              {
                title: 'Looking outward for a name',
                content: (
                  <p>
                    A function can normally use bindings from the lexical
                    scopes around where that function was defined. It cannot
                    reach into a child function’s private local scope. If a
                    name is not found anywhere along the lookup path, using
                    that unresolved identifier results in a
                    <code> ReferenceError</code>.
                  </p>
                ),
                code: `const applicationName = "Study Desk";

function showApplicationName() {
  const message = \`Welcome to \${applicationName}\`;
  return message;
}

console.log(showApplicationName());
// Welcome to Study Desk

// message belongs to showApplicationName().
// console.log(message); // ReferenceError`,
              },
            ],
            'When code uses a name, ask which scope owns that binding and whether the current code is inside that scope or one of its nested scopes.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: Global, Function, Block, and Module Scope',
        pages: [
          lessonPage(
            'Recognize the main scope boundaries',
            'JavaScript code can have global, function, block, and module-level bindings. The declaration keyword and the surrounding program structure determine where each name is visible.',
            [
              {
                title: 'Global and module scope',
                content: (
                  <p>
                    A binding declared outside functions and blocks in a
                    classic script is global to that script. In browsers,
                    top-level <code>var</code> in a classic script generally
                    becomes a property of <code>window</code>; top-level
                    <code> let</code> and <code>const</code> do not. ES modules
                    have their own top-level module scope: declarations stay
                    private to the module unless exported. Avoid relying on
                    global bindings to connect application components.
                  </p>
                ),
                code: `// In an ES module, this binding is module-scoped.
const applicationTitle = "My Dashboard";

export function getApplicationTitle() {
  return applicationTitle;
}

// A different module can access the exported function by importing it,
// but cannot directly access applicationTitle.`,
              },
              {
                title: 'Function scope',
                content: (
                  <p>
                    Names declared inside a function belong to that function
                    call. This applies to <code>var</code>, <code>let</code>,
                    and <code>const</code>. The function can use its locals,
                    but code outside the function cannot access them directly.
                  </p>
                ),
                code: `function calculateDiscount() {
  const discountRate = 0.15;
  return discountRate;
}

console.log(calculateDiscount()); // 0.15
// console.log(discountRate); // ReferenceError`,
              },
              {
                title: 'Block scope and `var`',
                content: (
                  <p>
                    A block is code enclosed in braces, such as the body of
                    an <code>if</code> statement or loop. <code>let</code> and
                    <code> const</code> are confined to that block.
                    <code> var</code> is function-scoped (or global in a
                    classic script), so declaring it inside a block does not
                    keep it inside that block. This can create surprising
                    leaks; modern JavaScript generally favors
                    <code> const</code> and <code>let</code>.
                  </p>
                ),
                code: `if (true) {
  var functionScoped = "Visible outside this block";
  let blockScoped = "Visible only inside this block";
  const alsoBlockScoped = "Also local to this block";
}

console.log(functionScoped); // Visible outside this block
// console.log(blockScoped); // ReferenceError
// console.log(alsoBlockScoped); // ReferenceError`,
              },
            ],
            'Use `const` by default and `let` when reassignment is needed. Avoid `var` in modern code so block boundaries behave as expected.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: The Scope Chain and Variable Lookup',
        pages: [
          lessonPage(
            'Trace how JavaScript resolves a variable',
            'When code references an identifier, JavaScript searches its current lexical environment first. If it is not there, lookup proceeds to the nearest enclosing environment, continuing outward until the name is found or no enclosing environment remains.',
            [
              {
                title: 'Lookup from inner to outer scope',
                content: (
                  <p>
                    The nearest binding wins. A local declaration can shadow
                    a binding with the same name in an outer scope. Shadowing
                    is sometimes useful, but choosing distinct names usually
                    makes nested logic easier to follow. If lookup reaches the
                    end of the chain without finding a binding, JavaScript
                    throws a <code>ReferenceError</code>.
                  </p>
                ),
                code: `const userRole = "Guest";

function outer() {
  const userRole = "Member";

  function inner() {
    // The closest matching binding is in outer().
    console.log(userRole); // Member
  }

  inner();
}

outer();`,
              },
              {
                title: 'Shadowing and distinct bindings',
                content: (
                  <p>
                    A nested declaration does not overwrite the outer
                    variable; it creates a different binding that takes
                    precedence only inside its own scope. Once execution
                    leaves the inner scope, the outer binding is available
                    again. Avoid reusing names when doing so could obscure
                    which value an expression refers to.
                  </p>
                ),
                code: `const theme = "light";

function renderPreview() {
  const theme = "dark"; // Shadows the outer theme here.
  console.log(theme); // dark
}

renderPreview();
console.log(theme); // light`,
              },
            ],
            'Resolve a name by starting at the current scope and walking outward. The nearest matching declaration is the one JavaScript uses.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Lexical Scope',
        pages: [
          lessonPage(
            'A function keeps the scope where it was written',
            'JavaScript uses lexical (static) scoping: the available outer bindings for a function are determined by where the function is defined in the source code, not by the caller that happens to invoke it.',
            [
              {
                title: 'Definition location determines the chain',
                content: (
                  <p>
                    A function’s lexical environment is formed from its
                    definition context. Calling that function from a different
                    function does not replace its outer scope with the
                    caller’s local variables. This makes code more predictable:
                    to understand a free variable inside a function, inspect
                    the function’s enclosing source-code scopes.
                  </p>
                ),
                code: `const message = "Global context";

function printMessage() {
  console.log(message);
}

function caller() {
  const message = "Caller context";
  printMessage();
}

caller(); // Global context`,
              },
              {
                title: 'Compare lexical scope with dynamic lookup',
                content: (
                  <p>
                    If scope were determined by the call stack, the call to
                    <code> printMessage()</code> might find the local
                    <code> message</code> inside <code>caller</code>. JavaScript
                    does not work that way: <code>printMessage</code> was
                    defined alongside the global binding, so that is the
                    enclosing binding it reads. A parameter can make the
                    dependency explicit when callers should choose the value.
                  </p>
                ),
                code: `function printMessage(text) {
  console.log(text);
}

function caller() {
  const localMessage = "Chosen by caller";
  printMessage(localMessage);
}

caller(); // Chosen by caller`,
              },
            ],
            'Lexical scope follows where a function is defined. Pass a value as an argument when it should be chosen by the caller.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Hoisting and the Temporal Dead Zone',
        pages: [
          lessonPage(
            'Understand declarations before their source line',
            'Before executing statements in a scope, JavaScript establishes bindings for declarations. “Hoisting” is a useful shorthand for how declarations are available, but JavaScript does not literally move source lines. Different declarations are initialized at different times.',
            [
              {
                title: '`var` is initialized to `undefined`',
                content: (
                  <p>
                    A <code>var</code> binding is established when its
                    containing function or script scope is prepared and is
                    initialized with <code>undefined</code>. The later
                    assignment still happens at its written position. This
                    is one reason reading a variable before its declaration
                    can produce confusing results.
                  </p>
                ),
                code: `console.log(user); // undefined
var user = "Alice";
console.log(user); // Alice

// Conceptually, the declaration is available early,
// but the assignment remains at its original position.`,
              },
              {
                title: '`let` and `const` are in the TDZ',
                content: (
                  <p>
                    <code>let</code> and <code>const</code> bindings exist
                    from the start of their block, but they are not initialized
                    until execution reaches the declaration. The interval
                    before initialization is called the Temporal Dead Zone
                    (TDZ). Reading or assigning the binding in that interval
                    throws a <code>ReferenceError</code>. Declaring variables
                    before their use avoids this problem.
                  </p>
                ),
                code: `{
  // console.log(age); // ReferenceError: still in the TDZ
  let age = 30;
  console.log(age); // 30
}`,
              },
              {
                title: 'Function declaration initialization',
                content: (
                  <p>
                    A function declaration is available throughout its
                    containing scope, so it can be called before its written
                    position. A function expression assigned to
                    <code> const</code> or <code>let</code> follows the
                    initialization rules of that binding instead. Prefer
                    straightforward top-to-bottom organization when it makes
                    control flow clearer.
                  </p>
                ),
                code: `sayHello(); // Hello!

function sayHello() {
  console.log("Hello!");
}

// A const-held function expression is only available after initialization:
const sayGoodbye = function () {
  console.log("Goodbye!");
};
sayGoodbye();`,
              },
            ],
            '“Hoisted” does not mean every declaration can be safely used early. `var`, lexical declarations, and function declarations have different initialization behavior.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Closures and Scope Preservation',
        pages: [
          lessonPage(
            'Use closures to preserve private state',
            'A closure is a function together with the lexical environment it can access. When an inner function continues to reference outer bindings after the outer function has returned, those bindings remain available for as long as the inner function can reach them.',
            [
              {
                title: 'A function remembers its outer bindings',
                content: (
                  <p>
                    Returning a function does not copy a one-time snapshot of
                    every outer value; the returned function retains access
                    to the relevant binding. This makes closures useful for
                    counters, event handlers, and functions configured with
                    private state.
                  </p>
                ),
                code: `function createSecretVault() {
  const secretCode = "42-ALPHA";

  return {
    getSecret() {
      return secretCode;
    },
  };
}

const vault = createSecretVault();
console.log(vault.getSecret()); // 42-ALPHA
console.log(vault.secretCode);  // undefined`,
              },
              {
                title: 'Encapsulation and state',
                content: (
                  <p>
                    The vault does not expose <code>secretCode</code> as an
                    object property, but its method can still read the
                    binding through its closure. This is useful encapsulation,
                    not encryption or a security boundary against code that
                    can inspect or control the surrounding runtime. Keep
                    closure state small and expose only the operations that
                    callers need.
                  </p>
                ),
                code: `function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    current() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.current());   // 1`,
              },
            ],
            'Closures preserve access to lexical bindings. They are a practical way to encapsulate state, but they do not encrypt values or replace proper security controls.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Global Scope and Best Practices',
        pages: [
          lessonPage(
            'Keep bindings local and dependencies explicit',
            'A crowded global scope makes unrelated code easier to couple accidentally. Restricting the visibility of names reduces collisions, makes dependencies easier to understand, and helps keep state under control.',
            [
              {
                title: 'Avoid global scope pollution',
                content: (
                  <p>
                    Global variables can be read or changed by many parts of
                    an application, making it difficult to know which code
                    is responsible for a value. They can also collide with
                    other scripts or libraries in classic browser contexts.
                    Use module exports and imports to share intentional
                    functionality instead of placing every binding in the
                    global environment.
                  </p>
                ),
              },
              {
                title: 'Prefer `const`, then `let`',
                content: (
                  <ul>
                    <li>
                      Use <code>const</code> when the binding will not be
                      reassigned; it communicates stable intent.
                    </li>
                    <li>
                      Use <code>let</code> when reassignment is part of the
                      logic, such as a loop counter.
                    </li>
                    <li>
                      Avoid <code>var</code> in modern code because its
                      function scope and hoisting behavior can produce
                      surprising results.
                    </li>
                    <li>
                      Remember that <code>const</code> prevents rebinding; it
                      does not make an object or array deeply immutable.
                    </li>
                  </ul>
                ),
                code: `const courseName = "JavaScript";
let currentLesson = 1;
currentLesson += 1;

const settings = { theme: "light" };
settings.theme = "dark"; // The object can still be changed.
// settings = {}; // TypeError: cannot reassign the const binding`,
              },
              {
                title: 'Encapsulate implementation details',
                content: (
                  <p>
                    Modules, functions, and blocks each provide ways to keep
                    names local. Expose only the functions or values that
                    other parts of the program need. This makes a component
                    easier to change because callers depend on a smaller,
                    clearer interface.
                  </p>
                ),
              },
            ],
            'Minimize visibility: keep values in the narrowest useful scope, share through explicit module interfaces, and reserve reassignment for bindings that truly need it.'
          ),
        ],
      },
    },
  },
  5: {
    title: 'Arrays',
    lectures: {
      1: {
        title: 'Lecture 1: Introduction to Arrays',
        pages: [
          lessonPage(
            'Store ordered collections of values',
            'An array is an ordered, zero-indexed collection. Its length can change, and its elements can contain values of different types, including objects, functions, or other arrays. Arrays are objects with special behavior and methods for working with ordered data.',
            [
              {
                title: 'Create arrays with literals',
                content: (
                  <p>
                    Bracket notation is the usual, clearest way to create an
                    array. The first element is at index <code>0</code>, the
                    second at index <code>1</code>, and so on. Mixed element
                    types are allowed, though keeping a collection’s values
                    consistent often makes it easier to use.
                  </p>
                ),
                code: `const fruits = ["Apple", "Banana", "Cherry"];
const empty = [];
const mixed = [42, "hello", true, { id: 1 }, [1, 2]];

console.log(fruits[0]); // Apple
console.log(fruits.length); // 3`,
              },
              {
                title: 'Array constructor, `Array.of()`, and `Array.from()`',
                content: (
                  <p>
                    The <code>Array</code> constructor has a single-number
                    surprise: <code>new Array(5)</code> creates five empty
                    slots, not an array containing the number <code>5</code>.
                    <code> Array.of(5)</code> avoids that ambiguity. Use
                    <code> Array.from()</code> to create an array from an
                    iterable or array-like value; its optional mapping
                    callback can transform values during creation.
                  </p>
                ),
                code: `const colors = new Array("Red", "Green", "Blue");
const five = new Array(5); // Five empty slots
const oneNumber = Array.of(5); // [5]

const unique = Array.from(new Set([1, 2, 2, 3]));
console.log(unique); // [1, 2, 3]

const evenIndexes = Array.from(
  { length: 4 },
  (_, index) => index * 2
);
console.log(evenIndexes); // [0, 2, 4, 6]`,
              },
            ],
            'Use array literals for ordinary collections. Choose `Array.of()` for unambiguous value lists and `Array.from()` when converting iterables or generating values.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: Accessing, Updating, and Sparse Arrays',
        pages: [
          lessonPage(
            'Read and change elements by position',
            'Array indexes begin at zero, and the `length` property is one greater than the highest present numeric index. Arrays are mutable: assigning an index or changing `length` modifies the same array object.',
            [
              {
                title: 'Indexes, length, and relative access',
                content: (
                  <p>
                    Bracket access is direct and works well when an index is
                    known. The <code>at()</code> method also accepts negative
                    indexes, where <code>-1</code> means the last element.
                    Setting <code>length</code> to a smaller number truncates
                    the array; increasing it creates empty slots rather than
                    initialized values.
                  </p>
                ),
                code: `const scores = [88, 92, 79];
console.log(scores[0]); // 88
console.log(scores.at(-1)); // 79

scores[1] = 95;
console.log(scores); // [88, 95, 79]

scores.length = 2; // Mutates to [88, 95]
console.log(scores);`,
              },
              {
                title: 'Avoid accidental holes',
                content: (
                  <p>
                    Assigning an element at an index beyond the current end
                    leaves missing positions called holes. A hole reads as
                    <code> undefined</code>, but it is not an explicitly
                    stored <code>undefined</code> value: many array methods
                    skip holes. This difference can make iteration and
                    debugging surprising. Prefer contiguous arrays unless a
                    sparse representation is intentionally required.
                  </p>
                ),
                code: `const sparse = [1, , 3];
console.log(sparse.length); // 3
console.log(sparse[1]); // undefined

const visited = [];
sparse.forEach(value => visited.push(value));
console.log(visited); // [1, 3]; the hole is skipped

const explicitUndefined = [1, undefined, 3];
console.log(1 in sparse); // false
console.log(1 in explicitUndefined); // true`,
              },
              {
                title: 'Arrays are objects',
                content: (
                  <p>
                    Since arrays are objects, <code>typeof []</code> returns
                    <code> "object"</code>. Use <code>Array.isArray(value)</code>{' '}
                    when checking whether a value is an array. Do not treat an
                    array as a fixed-size, typed memory block; JavaScript
                    arrays provide a flexible object interface.
                  </p>
                ),
                code: `console.log(typeof [1, 2]); // "object"
console.log(Array.isArray([1, 2])); // true
console.log(Array.isArray({ length: 2 })); // false`,
              },
            ],
            'Remember that arrays are mutable objects. Use `at(-1)` for convenient end-relative reads, and avoid creating holes unintentionally.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: Mutating and Non-Mutating Array Methods',
        pages: [
          lessonPage(
            'Know whether a method changes the original array',
            'Some methods edit an array in place; others return a new array and leave the source unchanged. This distinction matters whenever multiple parts of a program share the same array, especially in state-driven interfaces.',
            [
              {
                title: 'Common mutating methods',
                content: (
                  <p>
                    <code>push</code> and <code>unshift</code> add elements,
                    while <code>pop</code> and <code>shift</code> remove them.
                    <code> splice</code> can remove, replace, or insert
                    elements at an index. Each changes the original array;
                    <code>push</code> and <code>unshift</code> return the new
                    length, while <code>pop</code> and <code>shift</code>{' '}
                    return the removed element.
                  </p>
                ),
                code: `const queue = ["b", "c"];

queue.push("d"); // ["b", "c", "d"]
queue.unshift("a"); // ["a", "b", "c", "d"]
const last = queue.pop(); // "d"
const first = queue.shift(); // "a"

console.log(queue); // ["b", "c"]
console.log({ first, last });`,
              },
              {
                title: 'Copying, slicing, and splicing',
                content: (
                  <p>
                    <code>slice(start, end)</code> returns a shallow copy of
                    a selected range; the end index is excluded.
                    <code> concat</code> combines arrays into a new array.
                    <code>splice</code> mutates, while <code>toSpliced</code>{' '}
                    returns the equivalent edited copy in runtimes that
                    support this newer method. “Shallow” means nested objects
                    are still shared references.
                  </p>
                ),
                code: `const values = [10, 20, 30, 40, 50];
const selected = values.slice(1, 4); // [20, 30, 40]

const replacedCopy = values.toSpliced(2, 1, 99);
console.log(values); // Original unchanged
console.log(replacedCopy); // [10, 20, 99, 40, 50]

const combined = values.concat([60, 70]);`,
              },
              {
                title: 'Choose immutable updates intentionally',
                content: (
                  <p>
                    In React or other state-driven code, producing a new
                    array can make changes easier for the framework and
                    teammates to detect. Spread, <code>map</code>,
                    <code> filter</code>, <code>slice</code>, and newer
                    copying methods are useful tools. They do not deep-clone
                    nested data, however; update nested objects separately
                    when an immutable update is required.
                  </p>
                ),
                code: `const tasks = [
  { id: 1, done: false },
  { id: 2, done: false },
];

const updatedTasks = tasks.map(task =>
  task.id === 1 ? { ...task, done: true } : task
);

console.log(tasks[0].done); // false
console.log(updatedTasks[0].done); // true`,
              },
            ],
            'Before calling a method, check whether it mutates. Make copies for immutable updates, and remember that array copies are shallow.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Searching and Transforming Arrays',
        pages: [
          lessonPage(
            'Find, inspect, and reshape array data',
            'Array methods make common operations expressive: locate an item, test a condition, transform each value, or combine many values into one result. Choosing a method that describes the goal can make data processing easier to read.',
            [
              {
                title: 'Search and test',
                content: (
                  <p>
                    Use <code>includes</code> to test for a value,
                    <code> indexOf</code> to get a matching index,
                    <code>find</code> to get the first matching element, and
                    <code> findIndex</code> to get its index. For conditions,
                    <code>some</code> checks whether at least one item passes,
                    while <code>every</code> checks whether all do. These
                    methods stop when they have enough information.
                  </p>
                ),
                code: `const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true },
];

const user = users.find(item => item.id === 3);
const firstInactiveIndex = users.findIndex(item => !item.active);
const hasInactive = users.some(item => !item.active);
const allActive = users.every(item => item.active);

console.log(user); // { id: 3, active: true }
console.log(firstInactiveIndex); // 1
console.log(hasInactive, allActive); // true false`,
              },
              {
                title: '`map`, `filter`, and `forEach`',
                content: (
                  <p>
                    <code>map</code> creates a new array by transforming each
                    visited element. <code>filter</code> creates a shallow
                    array containing elements whose callback result is
                    truthy. <code>forEach</code> runs a callback for its side
                    effects and returns <code>undefined</code>; it is not a
                    replacement for <code>map</code> when a transformed array
                    is needed, and it cannot be stopped early with
                    <code> break</code>.
                  </p>
                ),
                code: `const numbers = [1, 2, 3];
const squares = numbers.map(number => number ** 2);
const even = numbers.filter(number => number % 2 === 0);

numbers.forEach((number, index) => {
  console.log(\`Item \${index}: \${number}\`);
});

console.log(squares); // [1, 4, 9]
console.log(even); // [2]`,
              },
              {
                title: '`reduce`, `join`, and flattening',
                content: (
                  <p>
                    <code>reduce</code> carries an accumulator through array
                    elements and can produce a number, object, string, or
                    another array. Supplying an initial value is usually
                    clearer and handles empty arrays safely. Use
                    <code> join</code> to create a delimited string,
                    <code> flat</code> to flatten nested arrays to a chosen
                    depth, and <code>flatMap</code> to map and flatten one
                    level.
                  </p>
                ),
                code: `const prices = [10, 20, 30];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 60

const nested = [1, [2, [3]]];
console.log(nested.flat(2)); // [1, 2, 3]

const phrases = ["hello world", "array methods"];
const words = phrases.flatMap(phrase => phrase.split(" "));
console.log(words); // ["hello", "world", "array", "methods"]

console.log(words.join(", "));`,
              },
            ],
            'Match the method to the goal: `find` returns an item, `some` answers whether any match, `map` transforms, `filter` selects, and `reduce` accumulates.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Sorting, Reversing, and Uniqueness',
        pages: [
          lessonPage(
            'Sort values deliberately',
            'Sorting can be deceptively surprising because the default comparison is string-based. Provide a comparator for numbers or custom ordering, and remember that `sort()` and `reverse()` mutate their array.',
            [
              {
                title: 'Default sort is lexicographic',
                content: (
                  <p>
                    Without a comparator, <code>sort()</code> converts values
                    to strings and orders them by string representation. That
                    means values such as <code>10</code> can appear before
                    <code> 2</code>. Sorting also changes the original array;
                    copy first or use <code>toSorted()</code> when a new
                    sorted array is desired and the runtime supports it.
                  </p>
                ),
                code: `const values = [10, 2, 5, 1];
console.log(values.toSorted()); // [1, 10, 2, 5]
console.log(values); // Still [10, 2, 5, 1]`,
              },
              {
                title: 'Numeric and custom comparators',
                content: (
                  <p>
                    A comparator receives two elements. Return a negative
                    value to put the first before the second, a positive value
                    to put it after, or zero when they are equivalent for this
                    ordering. For numbers, subtract in the desired order.
                  </p>
                ),
                code: `const numbers = [10, 2, 5, 1];
const ascending = numbers.toSorted((a, b) => a - b);
const descending = numbers.toSorted((a, b) => b - a);

const students = [
  { name: "Mia", score: 91 },
  { name: "Leo", score: 84 },
];
const byScore = students.toSorted((a, b) => b.score - a.score);

console.log(ascending); // [1, 2, 5, 10]
console.log(descending); // [10, 5, 2, 1]`,
              },
              {
                title: 'Reverse and find unique values',
                content: (
                  <p>
                    <code>reverse()</code> mutates; <code>toReversed()</code>{' '}
                    returns a reversed copy in supported runtimes. A
                    <code> Set</code> is a convenient way to remove duplicate
                    primitive values, preserving insertion order. For object
                    values, a set compares object identity, not matching
                    property contents.
                  </p>
                ),
                code: `const original = [1, 2, 3];
const reversed = original.toReversed();
console.log(original); // [1, 2, 3]
console.log(reversed); // [3, 2, 1]

const uniqueNumbers = [...new Set([1, 2, 2, 3])];
console.log(uniqueNumbers); // [1, 2, 3]

const first = { id: 1 };
const second = { id: 1 };
console.log(new Set([first, second]).size); // 2`,
              },
            ],
            'Supply a comparator when order matters, and use copying methods or an explicit copy when the original array must remain unchanged.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Destructuring and Spread Syntax',
        pages: [
          lessonPage(
            'Unpack and combine array values',
            'Array destructuring assigns elements to variables by position. Spread syntax expands an iterable into individual values, making it useful for combining arrays and creating shallow copies.',
            [
              {
                title: 'Destructure by position',
                content: (
                  <p>
                    Destructuring mirrors the array’s order. You can skip an
                    element with an empty position, provide a default for
                    missing values, and collect the remaining elements with
                    a rest pattern. Rest must appear last.
                  </p>
                ),
                code: `const coordinates = [12.5, 45.2, 100];
const [x, y] = coordinates;
const [first, , third] = coordinates;
const [head, ...tail] = coordinates;
const [label = "unknown"] = [];

console.log(x, y); // 12.5 45.2
console.log(first, third); // 12.5 100
console.log(head, tail); // 12.5 [45.2, 100]
console.log(label); // unknown`,
              },
              {
                title: 'Spread to copy and combine',
                content: (
                  <p>
                    Spread inserts each element from an iterable into a new
                    array literal. This makes concatenation and shallow
                    copying concise. It does not recursively clone nested
                    objects or arrays, so references inside the copied array
                    remain shared.
                  </p>
                ),
                code: `const firstBatch = [1, 2];
const secondBatch = [3, 4];

const combined = [...firstBatch, ...secondBatch];
const copy = [...firstBatch];

console.log(combined); // [1, 2, 3, 4]
console.log(copy); // [1, 2]

const original = [{ id: 1 }];
const shallowCopy = [...original];
console.log(shallowCopy[0] === original[0]); // true`,
              },
              {
                title: 'A useful immutable update pattern',
                content: (
                  <p>
                    To add an item without mutating an existing array, put
                    the old elements into a new array and add the new value.
                    To remove or transform elements, methods such as
                    <code> filter</code> and <code>map</code> communicate
                    intent more clearly than manually assembling indexes in
                    a simple case.
                  </p>
                ),
                code: `const original = ["read", "practice"];
const expanded = [...original, "review"];
const withoutRead = original.filter(item => item !== "read");

console.log(original); // ["read", "practice"]
console.log(expanded); // ["read", "practice", "review"]
console.log(withoutRead); // ["practice"]`,
              },
            ],
            'Destructuring reads values by position; spread expands values into a new array. Copies made with spread are shallow.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Typed Arrays, Performance, and Best Practices',
        pages: [
          lessonPage(
            'Choose array tools based on the actual task',
            'Ordinary JavaScript arrays are flexible and convenient. Specialized typed arrays are available for numeric binary data, but performance decisions should be based on the workload and measurements rather than assumptions about engine internals.',
            [
              {
                title: 'Typed arrays for binary data',
                content: (
                  <p>
                    <code>ArrayBuffer</code> represents a fixed-length region
                    of binary data. A typed-array view such as
                    <code> Int32Array</code> interprets that buffer as
                    fixed-width numeric elements. Typed arrays are useful for
                    binary protocols, audio, graphics, and WebAssembly
                    interoperation; for ordinary lists of application data,
                    standard arrays are usually simpler.
                  </p>
                ),
                code: `const buffer = new ArrayBuffer(16);
const integers = new Int32Array(buffer);

integers[0] = 42;
console.log(integers.length); // 4 values of 32 bits each
console.log(integers[0]); // 42`,
              },
              {
                title: 'Measure before optimizing',
                content: (
                  <p>
                    Sparse arrays and unusual element patterns may affect
                    engine optimizations, but exact storage strategies are
                    implementation details and can change. Avoid making
                    performance guarantees based on labels such as “packed”
                    or assuming preallocating an ordinary array will always
                    make code faster. In performance-sensitive code, profile
                    representative inputs in the target runtime.
                  </p>
                ),
              },
              {
                title: 'Practical guidelines',
                content: (
                  <ul>
                    <li>
                      Keep arrays dense and use a consistent element shape
                      when it naturally fits the data.
                    </li>
                    <li>
                      Prefer non-mutating updates where shared state or UI
                      change detection makes immutability useful.
                    </li>
                    <li>
                      Use <code>Set</code> for uniqueness or repeated
                      membership checks when its semantics fit; do not assume
                      a universal constant-time performance guarantee.
                    </li>
                    <li>
                      Choose <code>for...of</code>, array methods, or a
                      traditional loop based on readability first, then
                      measure if a hot path is genuinely slow.
                    </li>
                    <li>
                      Check runtime compatibility before using newer methods
                      such as <code>toSorted</code>, <code>toReversed</code>,
                      and <code>toSpliced</code>.
                    </li>
                  </ul>
                ),
                code: `const tags = ["news", "science", "news"];
const uniqueTags = [...new Set(tags)];

for (const tag of uniqueTags) {
  console.log(tag);
}`,
              },
            ],
            'Use standard arrays for general ordered data and typed arrays for fixed-width binary data. Optimize based on profiling, not unverified assumptions.'
          ),
        ],
      },
    },
  },
  6: {
    title: 'Loops',
    lectures: {
      1: {
        title: 'Lecture 1: Introduction to Loops',
        pages: [
          lessonPage(
            'Repeat work with control flow',
            'Loops let a program repeat a block of code. They are useful for counting, processing collections, retrying an operation, or continuing until a condition changes. JavaScript offers loops that manage an index, loops that continue while a condition holds, and statements that iterate over collections.',
            [
              {
                title: 'A classic `for` loop',
                content: (
                  <p>
                    A <code>for</code> loop has an initialization expression,
                    a condition checked before each iteration, and a final
                    expression that usually updates a counter. Initialization
                    runs once; after each body execution, the final expression
                    runs before the next condition check. If the condition is
                    false initially, the body never runs.
                  </p>
                ),
                code: `for (let index = 0; index < 5; index++) {
  console.log(\`Iteration: \${index}\`);
}

// The counter starts at 0.
// The loop stops when index is no longer less than 5.`,
              },
              {
                title: 'The `while` loop',
                content: (
                  <p>
                    Use <code>while</code> when the number of repetitions is
                    not known in advance. Its condition is checked before each
                    pass, so the body may run zero times. Make sure something
                    in the loop can eventually make the condition false.
                  </p>
                ),
                code: `let count = 0;

while (count < 3) {
  console.log(\`Count: \${count}\`);
  count += 1; // Progress toward the stopping condition
}`,
              },
              {
                title: 'The `do...while` loop',
                content: (
                  <p>
                    A <code>do...while</code> loop checks its condition after
                    executing the body. This guarantees at least one
                    iteration, which can be useful when an action must happen
                    before deciding whether to repeat.
                  </p>
                ),
                code: `let attempts = 0;

do {
  console.log(\`Attempt: \${attempts}\`);
  attempts += 1;
} while (attempts < 0);

// The body still ran once before the false condition was checked.`,
              },
            ],
            'Choose `for` for counter-controlled repetition, `while` for a condition-controlled loop that may run zero times, and `do...while` when the body must run at least once.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: Loop Counters and Scope',
        pages: [
          lessonPage(
            'Control each iteration predictably',
            'A loop is easiest to reason about when its initialization, stopping condition, and progress are clear. Block-scoped counters with `let` also behave predictably when callbacks created inside a loop run later.',
            [
              {
                title: 'Initialization, condition, and update',
                content: (
                  <p>
                    The three parts of a classic <code>for</code> loop work
                    together: initialize the counter, test whether to
                    continue, then update the counter. A missing or incorrect
                    update can cause a loop to run forever. You can also count
                    down or step by a different amount when the problem calls
                    for it.
                  </p>
                ),
                code: `for (let page = 1; page <= 3; page += 1) {
  console.log(\`Loading page \${page}\`);
}

for (let countdown = 3; countdown > 0; countdown -= 1) {
  console.log(countdown);
}`,
              },
              {
                title: '`let` and delayed callbacks',
                content: (
                  <p>
                    A <code>let</code> declaration in a <code>for</code> loop
                    creates a distinct binding for each iteration. A callback
                    scheduled to run later can therefore observe that
                    iteration’s value. With <code>var</code>, there is one
                    function-scoped binding shared by the loop, so delayed
                    callbacks may all see the final counter value.
                  </p>
                ),
                code: `for (let index = 0; index < 3; index += 1) {
  setTimeout(() => console.log(index), 0);
}
// Logs 0, 1, 2

for (var sharedIndex = 0; sharedIndex < 3; sharedIndex += 1) {
  setTimeout(() => console.log(sharedIndex), 0);
}
// Each callback sees the shared final value: 3`,
              },
              {
                title: 'Make progress explicit',
                content: (
                  <p>
                    For condition-based loops, write down what changes on
                    each pass. For a loop over input data, that might be an
                    index or a cursor; for retries, it might be a remaining
                    attempt count. If no state update can move execution
                    toward the stopping condition, revisit the loop design.
                  </p>
                ),
              },
            ],
            'Use `let` for counters that change, keep the loop’s exit condition visible, and make progress on every path that should continue.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: for...in, for...of, and for await...of',
        pages: [
          lessonPage(
            'Choose the iteration statement for the data',
            'JavaScript has separate syntax for enumerating object keys and consuming values from iterables. Choosing the right loop avoids confusing values with indexes or including properties that were not meant to be part of a collection.',
            [
              {
                title: '`for...in` enumerates object keys',
                content: (
                  <p>
                    <code>for...in</code> visits enumerable string property
                    keys, including inherited enumerable properties. It can
                    be useful for object records, but it is generally not
                    suitable for array traversal: arrays may have extra
                    properties, inherited properties can appear, and
                    <code> for...in</code> is not the right tool for iterating
                    values in sequence. Use an own-property check when you
                    need only the object’s own enumerable keys.
                  </p>
                ),
                code: `const user = { name: "Alice", age: 30, role: "Admin" };

for (const key in user) {
  if (Object.hasOwn(user, key)) {
    console.log(\`\${key}: \${user[key]}\`);
  }
}`,
              },
              {
                title: '`for...of` consumes iterable values',
                content: (
                  <p>
                    <code>for...of</code> reads values from an iterable such
                    as an array, string, map, set, generator, or many DOM
                    collections. It is usually the clearest loop for array
                    values and supports <code>break</code> and
                    <code> continue</code>. Use an indexed <code>for</code>{' '}
                    loop instead when you need to manage indexes or update
                    elements directly by index.
                  </p>
                ),
                code: `const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
  console.log(color);
}

for (const character of "JavaScript") {
  console.log(character);
}`,
              },
              {
                title: '`for await...of` for asynchronous values',
                content: (
                  <p>
                    Inside an <code>async</code> function,{' '}
                    <code>for await...of</code> consumes an async iterable and
                    awaits each yielded value. It can also consume a
                    synchronous iterable of Promises, awaiting the values
                    one at a time. For independent requests that can run
                    concurrently, <code>Promise.all</code> may be more
                    appropriate.
                  </p>
                ),
                code: `async function printResults(promises) {
  for await (const result of promises) {
    console.log(result);
  }
}

printResults([
  Promise.resolve("first"),
  Promise.resolve("second"),
]);`,
              },
            ],
            'Use `for...in` to enumerate object keys, `for...of` to consume iterable values, and `for await...of` when each asynchronous value should be awaited in sequence.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: break, continue, and Labeled Loops',
        pages: [
          lessonPage(
            'Change loop flow when a condition is met',
            'Loop bodies do not always need to finish every iteration or continue until the normal condition fails. `break` exits a loop, `continue` skips to its next iteration, and labels can target an enclosing loop in nested control flow.',
            [
              {
                title: 'Exit early with `break`',
                content: (
                  <p>
                    A <code>break</code> statement immediately exits the
                    innermost loop or <code>switch</code> that contains it.
                    This is useful when a search has already found its answer
                    or a stopping condition is reached.
                  </p>
                ),
                code: `for (let number = 0; number < 10; number += 1) {
  if (number === 5) {
    break;
  }

  console.log(number); // 0, 1, 2, 3, 4
}

console.log("Loop finished");`,
              },
              {
                title: 'Skip an iteration with `continue`',
                content: (
                  <p>
                    <code>continue</code> skips the rest of the current loop
                    body. A classic <code>for</code> loop then evaluates its
                    final expression before checking the condition again.
                    With <code>while</code>, control returns to the condition.
                    Be careful not to skip an update that is necessary for
                    the loop to terminate.
                  </p>
                ),
                code: `for (let number = 0; number < 5; number += 1) {
  if (number === 2) {
    continue;
  }

  console.log(number); // 0, 1, 3, 4
}`,
              },
              {
                title: 'Labels for nested loops',
                content: (
                  <p>
                    A label names a statement and lets <code>break</code> or
                    <code> continue</code> target a specific enclosing loop.
                    Labels can simplify a nested search that must stop
                    entirely, but use them sparingly: a helper function or
                    clearer data operation may be easier to understand.
                  </p>
                ),
                code: `search: for (let row = 0; row < 3; row += 1) {
  for (let column = 0; column < 3; column += 1) {
    if (row === 1 && column === 1) {
      break search;
    }

    console.log(\`row=\${row}, column=\${column}\`);
  }
}`,
              },
            ],
            'Use `break` to exit, `continue` to skip only the current pass, and labeled control flow only when it makes nested-loop behavior clearer.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Loops and Array Methods',
        pages: [
          lessonPage(
            'Select imperative or declarative iteration',
            'A traditional loop makes each step of control flow explicit. Array methods describe transformations and tests in terms of callbacks. Both styles are useful; choose the one that makes the operation easiest to understand.',
            [
              {
                title: 'Array methods describe common operations',
                content: (
                  <p>
                    Use <code>forEach</code> for an action on each visited
                    element, <code>map</code> to transform elements into a new
                    array, <code>filter</code> to select elements, and
                    <code> reduce</code> to combine values. A chained
                    transformation can express a pipeline without manually
                    maintaining intermediate counters or output arrays.
                  </p>
                ),
                code: `const numbers = [1, 2, 3, 4, 5];

const doubledEvens = numbers
  .filter(number => number % 2 === 0)
  .map(number => number * 2);

console.log(doubledEvens); // [4, 8]`,
              },
              {
                title: 'Side effects and early exits',
                content: (
                  <p>
                    Array callbacks are most readable when each has a clear
                    role. <code>forEach</code> is for side effects and cannot
                    be stopped with <code>break</code>. If you need to stop
                    early, use a loop or a short-circuiting method such as
                    <code> find</code>, <code>some</code>, or
                    <code> every</code>, depending on the goal. Avoid using
                    <code>map</code> only for side effects because its
                    returned array would be discarded.
                  </p>
                ),
                code: `const firstLarge = numbers.find(number => number > 3);
const hasNegative = numbers.some(number => number < 0);

for (const number of numbers) {
  if (number > 3) {
    console.log("Found one:", number);
    break;
  }
}`,
              },
              {
                title: 'Readability and performance',
                content: (
                  <p>
                    Prefer <code>for...of</code> and array methods when they
                    clearly communicate intent. A traditional indexed loop
                    can be appropriate for specialized control flow or a
                    measured hot path. Do not assume one style is always
                    faster across JavaScript engines and workloads; profile
                    representative code before optimizing.
                  </p>
                ),
              },
            ],
            'Use array methods to express transformations and predicates; use loops when explicit control flow, early exit, or index management is important.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Iterables and Generators',
        pages: [
          lessonPage(
            'Understand the protocol behind iteration',
            'An iterable is an object that can produce an iterator. The iterator supplies values one at a time, which is why constructs such as `for...of`, spread syntax, and array creation can consume many different kinds of objects.',
            [
              {
                title: 'The iterable and iterator protocols',
                content: (
                  <p>
                    An iterable provides a <code>[Symbol.iterator]</code>{' '}
                    method. Calling it returns an iterator whose
                    <code> next()</code> method returns result objects shaped
                    like <code>{'{ value, done }'}</code>. Each call reports
                    the next value; once finished, <code>done</code> becomes
                    true. Arrays and strings already implement this protocol.
                  </p>
                ),
                code: `const colors = ["red", "blue"];
const iterator = colors[Symbol.iterator]();

console.log(iterator.next()); // { value: "red", done: false }
console.log(iterator.next()); // { value: "blue", done: false }
console.log(iterator.next()); // { value: undefined, done: true }`,
              },
              {
                title: 'Create a custom iterable',
                content: (
                  <p>
                    A custom iterable can define how a <code>for...of</code>{' '}
                    loop obtains its values. The iterator may keep its own
                    progress state. This is useful when a domain concept,
                    such as a range, should be consumable by standard
                    iteration syntax.
                  </p>
                ),
                code: `const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

console.log([...range]); // [1, 2, 3]`,
              },
              {
                title: 'Generators simplify custom iterators',
                content: (
                  <p>
                    A generator function is declared with <code>function*</code>{' '}
                    and uses <code>yield</code> to pause and provide a value.
                    Calling it returns a generator object, which is both an
                    iterator and an iterable. Each request resumes execution
                    from the previous yield point.
                  </p>
                ),
                code: `function* numberGenerator() {
  yield 10;
  yield 20;
  yield 30;
}

for (const value of numberGenerator()) {
  console.log(value);
}`,
              },
            ],
            'Iteration protocols let many different objects work with the same syntax. Use generators when a sequence is clearer as values yielded over time.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Safe and Efficient Looping',
        pages: [
          lessonPage(
            'Write loops that terminate and remain understandable',
            'A reliable loop has a clear stopping condition and makes progress toward it. Performance tuning should preserve correctness and should be based on measurements rather than assumptions about how a particular JavaScript engine handles a loop.',
            [
              {
                title: 'Prevent accidental infinite loops',
                content: (
                  <p>
                    A loop whose condition never becomes false can monopolize
                    the JavaScript thread and make a browser interface
                    unresponsive. Verify that the body or update expression
                    changes the relevant state, and test boundary cases such
                    as zero items or a condition that is false immediately.
                  </p>
                ),
                code: `let remaining = 3;

while (remaining > 0) {
  console.log(\`Attempts left: \${remaining}\`);
  remaining -= 1; // Ensures progress toward termination
}`,
              },
              {
                title: 'Do not optimize by folklore',
                content: (
                  <p>
                    Caching an array’s <code>length</code> or avoiding every
                    callback allocation is not automatically faster in
                    current engines; actual results depend on the engine,
                    data, and workload. Start with clear code. If profiling
                    identifies a real bottleneck, benchmark representative
                    inputs and verify that a proposed change improves the
                    measured outcome.
                  </p>
                ),
                code: `function sumValues(values) {
  let total = 0;

  for (const value of values) {
    total += value;
  }

  return total;
}

console.log(sumValues([2, 3, 5])); // 10`,
              },
              {
                title: 'Choose the loop to match the task',
                content: (
                  <ul>
                    <li>
                      Use <code>for...of</code> for values from arrays and
                      other iterables.
                    </li>
                    <li>
                      Use <code>for...in</code> for enumerable object keys,
                      not array values.
                    </li>
                    <li>
                      Use <code>map</code>, <code>filter</code>, or
                      <code> reduce</code> for transformations and
                      accumulations when they improve clarity.
                    </li>
                    <li>
                      Use classic loops when indexes, early exits, or
                      multi-step control flow are central to the task.
                    </li>
                    <li>
                      Use <code>const</code> for per-iteration values when
                      they are not reassigned; use <code>let</code> for
                      counters that change.
                    </li>
                  </ul>
                ),
              },
            ],
            'Make termination obvious, select the construct that best expresses the operation, and optimize only after measuring a real performance problem.'
          ),
        ],
      },
    },
  },
  7: {
    title: 'Iterators',
    lectures: {
      1: {
        title: 'Lecture 1: Understanding the Iteration Protocols',
        pages: [
          lessonPage(
            'Two protocols make iteration consistent',
            'JavaScript’s iteration protocols separate the ability to produce a sequence from the mechanism that produces each value. This shared design lets loops and other language features consume built-in collections and custom data structures in a consistent way.',
            [
              {
                title: 'Iterable and iterator are different roles',
                content: (
                  <p>
                    The iterable protocol describes an object that can provide
                    an iterator. The iterator protocol describes an object
                    that produces the sequence one step at a time. An array is
                    iterable; calling its <code>[Symbol.iterator]()</code>{' '}
                    method creates an iterator that tracks progress through
                    its values.
                  </p>
                ),
              },
              {
                title: 'Language features use iterables',
                content: (
                  <p>
                    Once an object is iterable, it can work with
                    <code> for...of</code>, spread syntax, array destructuring,
                    and <code>Array.from()</code>. These features rely on the
                    same protocol instead of requiring a separate collection
                    API for each kind of data.
                  </p>
                ),
                code: `const letters = ["a", "b", "c"];

for (const letter of letters) {
  console.log(letter);
}

const copy = [...letters];
const [first, second] = letters;
const alsoACopy = Array.from(letters);

console.log(copy, first, second, alsoACopy);`,
              },
            ],
            'An iterable provides a way to obtain an iterator; the iterator is responsible for advancing through a sequence.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: The Iterator Protocol',
        pages: [
          lessonPage(
            'Produce values one step at a time',
            'An iterator is an object with a `next()` method. Each call returns an iteration result containing a `value` and a `done` flag. This lets callers request only the next value instead of requiring the entire sequence to be created up front.',
            [
              {
                title: 'The `next()` result',
                content: (
                  <p>
                    When <code>done</code> is false, <code>value</code> is the
                    next item in the sequence. When <code>done</code> is true,
                    the sequence has ended; the value may be
                    <code> undefined</code> or a final return value. Consumers
                    such as <code>for...of</code> stop when they see
                    <code> done: true</code>.
                  </p>
                ),
                code: `function createSimpleIterator(items) {
  let index = 0;

  return {
    next() {
      if (index < items.length) {
        return { value: items[index++], done: false };
      }

      return { value: undefined, done: true };
    },
  };
}

const iterator = createSimpleIterator(["a", "b"]);
console.log(iterator.next()); // { value: "a", done: false }
console.log(iterator.next()); // { value: "b", done: false }
console.log(iterator.next()); // { value: undefined, done: true }`,
              },
              {
                title: 'An iterator is stateful',
                content: (
                  <p>
                    The iterator’s index is stored in a closure, so each call
                    advances its state. If you call <code>next()</code> again
                    after completion, a well-behaved iterator continues to
                    report that it is done. An iterator can be used directly
                    by manual calls to <code>next()</code>; to use it with
                    <code> for...of</code>, it must also be iterable, commonly
                    by returning itself from <code>[Symbol.iterator]()</code>.
                  </p>
                ),
                code: `function createIterableIterator(items) {
  let index = 0;

  return {
    next() {
      if (index < items.length) {
        return { value: items[index++], done: false };
      }

      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

for (const item of createIterableIterator(["a", "b"])) {
  console.log(item);
}`,
              },
            ],
            'Each `next()` call advances iterator state and returns an object with `value` and `done`. Iterators are consumed as they are read.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: The Iterable Protocol and Built-in Iterables',
        pages: [
          lessonPage(
            'Recognize and consume iterable values',
            'An iterable implements a method keyed by `Symbol.iterator`. Calling that method should return an iterator. Arrays, strings, maps, sets, typed arrays, and many DOM collections are iterable.',
            [
              {
                title: 'Inspect a built-in iterator',
                content: (
                  <p>
                    Calling an array’s <code>[Symbol.iterator]()</code>{' '}
                    method creates an iterator over its values. The iterator
                    advances when <code>next()</code> is called, so repeated
                    calls consume it. A second iterator from the same array
                    starts a separate traversal.
                  </p>
                ),
                code: `const numbers = [10, 20];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

console.log([...new Set([1, 2, 2, 3])]); // [1, 2, 3]
console.log([..."Hi"]); // ["H", "i"]`,
              },
              {
                title: 'Iterable is not the same as array-like',
                content: (
                  <p>
                    An iterable must implement <code>Symbol.iterator</code>.
                    An array-like object merely has numeric keys and a
                    <code> length</code> property; some values can be both,
                    but those concepts are separate. <code>Array.from()</code>{' '}
                    can convert iterables and many array-like objects, which
                    is useful when an API expects an actual array.
                  </p>
                ),
                code: `const arrayLike = {
  0: "first",
  1: "second",
  length: 2,
};

const values = Array.from(arrayLike);
console.log(values); // ["first", "second"]`,
              },
            ],
            'Use a built-in iterable directly with standard iteration syntax. For custom values, provide `Symbol.iterator` rather than relying only on numeric keys or `length`.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Custom Iterables and Symbols',
        pages: [
          lessonPage(
            'Make custom data work with `for...of`',
            'A custom object can define `[Symbol.iterator]()` to describe how its values should be visited. A good iterable returns a fresh iterator each time, so separate traversals have independent progress.',
            [
              {
                title: 'Build a reusable range iterable',
                content: (
                  <p>
                    The range object stores its bounds, while each invocation
                    of <code>[Symbol.iterator]()</code> creates a new local
                    counter. Because the counter belongs to the returned
                    iterator, consuming one iterator does not affect a later
                    traversal of the same range.
                  </p>
                ),
                code: `const range = {
  start: 1,
  end: 3,

  [Symbol.iterator]() {
    let current = this.start;
    const last = this.end;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }

        return { value: undefined, done: true };
      },
    };
  },
};

console.log([...range]); // [1, 2, 3]
console.log([...range]); // [1, 2, 3] again`,
              },
              {
                title: 'Reuse the iterable with language features',
                content: (
                  <p>
                    The consumer does not need to know how the range
                    calculates its values. It can use <code>for...of</code>{' '}
                    for streaming or spread and <code>Array.from()</code> to
                    materialize all values. Materializing an unbounded
                    iterable is unsafe because it never finishes.
                  </p>
                ),
                code: `for (const value of range) {
  console.log(value);
}

const rangeValues = Array.from(range);
console.log(rangeValues); // [1, 2, 3]`,
              },
            ],
            'Keep iteration state inside the iterator factory. Returning a fresh iterator makes an iterable reusable and independent across traversals.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Lazy and Infinite Iterators',
        pages: [
          lessonPage(
            'Generate values only when they are requested',
            'Iterators are lazy: they produce the next value only when a consumer asks for it. This can represent a very large or even infinite sequence without storing every value in memory, as long as the consumer also knows when to stop.',
            [
              {
                title: 'An infinite Fibonacci iterator',
                content: (
                  <p>
                    This iterator updates two running values and returns the
                    next Fibonacci number each time <code>next()</code> is
                    called. It never reports completion, so direct calls are
                    useful for demonstrations, but an unbounded
                    <code> for...of</code> or spread operation would never
                    finish.
                  </p>
                ),
                code: `function createFibonacciIterator() {
  let previous = 0;
  let current = 1;

  return {
    next() {
      const value = previous;
      [previous, current] = [current, previous + current];
      return { value, done: false };
    },
  };
}

const fibonacci = createFibonacciIterator();
console.log(fibonacci.next().value); // 0
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 2`,
              },
              {
                title: 'Bound consumption of an infinite sequence',
                content: (
                  <p>
                    A lazy source does not automatically make every consumer
                    safe. Pull a known number of values, or add a terminating
                    condition before iterating. The following loop requests
                    only five values and then stops.
                  </p>
                ),
                code: `const nextFibonacci = createFibonacciIterator();
const firstFive = [];

for (let count = 0; count < 5; count += 1) {
  firstFive.push(nextFibonacci.next().value);
}

console.log(firstFive); // [0, 1, 1, 2, 3]`,
              },
            ],
            'Lazy iteration can save memory for large sequences, but infinite iterators must be consumed with an explicit limit or stopping condition.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Asynchronous Iterators',
        pages: [
          lessonPage(
            'Iterate over values that arrive asynchronously',
            'When sequence items require waiting—such as network chunks, event streams, or paginated data—JavaScript provides the asynchronous iterable protocol. Its iterator method is keyed by `Symbol.asyncIterator`, and its `next()` result is awaited.',
            [
              {
                title: 'How async iteration works',
                content: (
                  <p>
                    An async iterator’s <code>next()</code> returns a Promise
                    that fulfills with an iteration result. The
                    <code> for await...of</code> loop awaits each result before
                    entering the body. This processes values sequentially;
                    it is not the same as starting all asynchronous work at
                    once.
                  </p>
                ),
                code: `const asyncStream = {
  [Symbol.asyncIterator]() {
    let step = 0;

    return {
      async next() {
        if (step >= 3) {
          return { value: undefined, done: true };
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        step += 1;
        return { value: step * 10, done: false };
      },
    };
  },
};`,
              },
              {
                title: 'Consume values with `for await...of`',
                content: (
                  <p>
                    Place the loop inside an <code>async</code> function.
                    Each chunk is processed after its asynchronous
                    <code> next()</code> call resolves. If retrieving or
                    processing a value can fail, handle the rejection with
                    <code> try/catch</code> at the appropriate boundary.
                  </p>
                ),
                code: `async function readStream(stream) {
  try {
    for await (const chunk of stream) {
      console.log(chunk); // 10, 20, 30
    }
  } catch (error) {
    console.error("Stream failed:", error);
  }
}

readStream(asyncStream);`,
              },
            ],
            'Use `Symbol.asyncIterator` and `for await...of` when values arrive asynchronously. The loop awaits items in sequence and should have deliberate error handling.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Iterator Best Practices and Generators',
        pages: [
          lessonPage(
            'Use the protocol cleanly and safely',
            'Custom iteration is useful when a sequence has domain-specific behavior, but raw iterator objects require careful state management. Generator functions can implement the same protocol with less boilerplate.',
            [
              {
                title: 'Protocol responsibilities',
                content: (
                  <ul>
                    <li>
                      An iterable exposes a <code>[Symbol.iterator]()</code>{' '}
                      method that produces an iterator.
                    </li>
                    <li>
                      An iterator exposes <code>next()</code>, returning an
                      object with <code>value</code> and <code>done</code>.
                    </li>
                    <li>
                      Keep iteration state in the iterator so independent
                      traversals do not unexpectedly interfere.
                    </li>
                    <li>
                      Use standard consumers such as <code>for...of</code>{' '}
                      instead of manually calling <code>next()</code> unless
                      manual control is needed.
                    </li>
                  </ul>
                ),
              },
              {
                title: 'Generators implement iterators for you',
                content: (
                  <p>
                    A generator function pauses at each <code>yield</code>{' '}
                    and resumes when the consumer requests another value.
                    Calling it returns an iterator that is also iterable.
                    This is often clearer than writing the iterator object and
                    its <code>next()</code> method by hand.
                  </p>
                ),
                code: `function* countTo(limit) {
  for (let number = 1; number <= limit; number += 1) {
    yield number;
  }
}

for (const number of countTo(3)) {
  console.log(number); // 1, 2, 3
}

const values = [...countTo(3)];
console.log(values); // [1, 2, 3]`,
              },
              {
                title: 'Do not materialize an unbounded source',
                content: (
                  <p>
                    Spread syntax and <code>Array.from()</code> consume an
                    iterable until it is done. They are appropriate for
                    finite sequences, but will not finish on an infinite
                    iterator. For potentially unbounded sources, consume
                    incrementally and define a stopping condition, or use an
                    asynchronous streaming interface.
                  </p>
                ),
              },
            ],
            'Use generators for concise custom sequences, return fresh iterators from reusable iterables, and ensure consumers of infinite sources have a stopping rule.'
          ),
        ],
      },
    },
  },
  8: {
    title: 'Objects',
    lectures: {
      1: {
        title: 'Lecture 1: Introduction to Objects',
        pages: [
          lessonPage(
            'Represent related data with properties',
            'Objects are a central JavaScript data structure: they group properties under one value. A property has a key and a value, and that value can itself be a primitive, array, function, or another object. Objects are mutable by default and are compared by reference.',
            [
              {
                title: 'Object properties',
                content: (
                  <p>
                    Most object keys are strings; Symbols are also valid keys.
                    Functions stored as properties are commonly called
                    methods. Unlike arrays, ordinary objects do not represent
                    an ordered sequence, so use an array when position and
                    sequence are the main concepts.
                  </p>
                ),
                code: `const user = {
  name: "Alice",
  age: 30,
  isLoggedIn: true,
  greet() {
    return \`Hello, I am \${this.name}\`;
  },
};

console.log(user.greet()); // Hello, I am Alice`,
              },
              {
                title: 'Objects and primitive values',
                content: (
                  <p>
                    JavaScript has primitive values—such as numbers, strings,
                    Booleans, <code>null</code>, <code>undefined</code>,
                    Symbols, and BigInts—and objects. Arrays and functions
                    are objects. Primitives are not objects, even though
                    JavaScript provides convenient operations on some
                    primitives through temporary wrapper behavior.
                  </p>
                ),
              },
            ],
            'Use objects to group named properties and arrays to represent ordered sequences. Remember that an object property can hold any kind of value.'
          ),
        ],
      },
      2: {
        title: 'Lecture 2: Creating Objects',
        pages: [
          lessonPage(
            'Create objects for one-off values and reusable shapes',
            'Object literals are the simplest way to define a single object. When many objects share a structure and behavior, JavaScript also provides classes, constructor functions, and prototype-based creation.',
            [
              {
                title: 'Object literals',
                content: (
                  <p>
                    An object literal uses curly braces with key-value
                    properties. Shorthand method syntax is a concise way to
                    define behavior on the object. Object literals are
                    generally the clearest choice for configuration,
                    records, and small related groups of data.
                  </p>
                ),
                code: `const book = {
  title: "The Long Road",
  pages: 240,
  describe() {
    return \`\${this.title} has \${this.pages} pages.\`;
  },
};

console.log(book.describe());`,
              },
              {
                title: 'Classes and constructor functions',
                content: (
                  <p>
                    A class provides syntax for creating multiple instances
                    with shared methods. JavaScript classes use the language’s
                    prototype-based object model. Constructor functions are
                    an older pattern that still appears in existing code;
                    their methods can be placed on the constructor’s
                    <code> prototype</code> so instances share them.
                  </p>
                ),
                code: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    return \`Hi, my name is \${this.name}\`;
  }
}

const bob = new Person("Bob", 25);
console.log(bob.sayHi());`,
              },
              {
                title: 'Create an object with a chosen prototype',
                content: (
                  <p>
                    <code>Object.create(proto)</code> creates an object whose
                    prototype is the supplied object. Property lookup can
                    then find shared behavior through that prototype chain.
                    This is a lower-level tool than a class and is useful
                    when the relationship between objects is intentionally
                    prototype-based.
                  </p>
                ),
                code: `const animal = {
  makeSound() {
    return "Generic sound";
  },
};

const dog = Object.create(animal);
dog.breed = "Golden Retriever";

console.log(dog.makeSound()); // Generic sound
console.log(Object.getPrototypeOf(dog) === animal); // true`,
              },
            ],
            'Start with object literals for ordinary records. Use classes for repeated instance behavior, and `Object.create()` when a direct prototype relationship is intentional.'
          ),
        ],
      },
      3: {
        title: 'Lecture 3: Accessing and Updating Properties',
        pages: [
          lessonPage(
            'Read, add, change, and remove properties',
            'Dot notation is convenient when a property name is known. Bracket notation works with dynamic keys and keys that are not valid identifier names. Objects are mutable, so assignments can add properties or replace existing values.',
            [
              {
                title: 'Dot notation and bracket notation',
                content: (
                  <p>
                    Use dot notation for a fixed identifier such as
                    <code> user.name</code>. Use brackets when the key is in a
                    variable, contains spaces, or is computed at runtime.
                    Computed property names in object literals use brackets
                    too.
                  </p>
                ),
                code: `const config = {
  "server port": 8080,
  status: "active",
};

console.log(config.status);
console.log(config["server port"]);

const key = "status";
console.log(config[key]); // active

const prefix = "user";
const account = { [\`\${prefix}_id\`]: 4021 };
console.log(account.user_id); // 4021`,
              },
              {
                title: 'Add, update, and delete properties',
                content: (
                  <p>
                    Assignment adds a property when the key is absent and
                    replaces the value when it is present. The
                    <code> delete</code> operator removes an own property.
                    Deleting a property that is not present does not create a
                    new one; inspect the object or use a property check when
                    presence itself matters.
                  </p>
                ),
                code: `const item = { id: 10, price: 99 };

item.price = 120; // Update
item.inStock = true; // Add
delete item.price; // Remove

console.log(item); // { id: 10, inStock: true }`,
              },
              {
                title: 'Check whether a property exists',
                content: (
                  <p>
                    The <code>in</code> operator checks the object and its
                    prototype chain. <code>Object.hasOwn()</code> checks only
                    whether the object itself owns the property. This
                    distinction is important when inherited values should
                    not count as part of an object’s own data.
                  </p>
                ),
                code: `const parent = { inheritedProp: "Yes" };
const child = Object.create(parent);
child.ownProp = "Direct";

console.log("inheritedProp" in child); // true
console.log(Object.hasOwn(child, "ownProp")); // true
console.log(Object.hasOwn(child, "inheritedProp")); // false`,
              },
            ],
            'Use brackets for dynamic keys and `Object.hasOwn()` when you need to distinguish an object’s own properties from inherited ones.'
          ),
        ],
      },
      4: {
        title: 'Lecture 4: Object Mutability and Protection',
        pages: [
          lessonPage(
            'Control which object changes are allowed',
            'Objects can normally gain, lose, or change properties. JavaScript offers progressively stronger shallow protections with `preventExtensions`, `seal`, and `freeze`. These operations affect the object itself, not every nested object it references.',
            [
              {
                title: 'Prevent extensions, seal, and freeze',
                content: (
                  <ul>
                    <li>
                      <code>Object.preventExtensions(obj)</code> prevents
                      adding new own properties; existing properties may
                      still be changed or deleted if their descriptors allow.
                    </li>
                    <li>
                      <code>Object.seal(obj)</code> also prevents deleting
                      existing own properties or changing their
                      configurability; writable values can still change.
                    </li>
                    <li>
                      <code>Object.freeze(obj)</code> also makes own data
                      properties non-writable. In strict mode, forbidden
                      writes generally throw a <code>TypeError</code>; outside
                      strict mode, they may fail silently.
                    </li>
                  </ul>
                ),
                code: `const settings = { theme: "dark" };
Object.freeze(settings);

// In an ES module (strict mode), this assignment throws TypeError:
// settings.theme = "light";
console.log(settings.theme); // dark
console.log(Object.isFrozen(settings)); // true`,
              },
              {
                title: 'Freezing is shallow',
                content: (
                  <p>
                    Freezing an object does not recursively freeze the objects
                    stored in its properties. A nested profile can still be
                    modified unless it is protected separately. If nested
                    immutable data is needed, use an explicit recursive
                    strategy suitable for the data or create updated copies
                    instead.
                  </p>
                ),
                code: `const user = Object.freeze({
  profile: { name: "John" },
});

user.profile.name = "Mike"; // Nested object is still mutable
console.log(user.profile.name); // Mike`,
              },
            ],
            'Object protections are shallow. Choose the least restrictive mechanism that expresses the contract, and do not mistake `Object.freeze()` for deep immutability.'
          ),
        ],
      },
      5: {
        title: 'Lecture 5: Property Descriptors, Getters, and Setters',
        pages: [
          lessonPage(
            'Define how individual properties behave',
            'A property descriptor controls a property’s value and whether it can be changed, enumerated, or deleted. Accessor properties use getter and setter functions to compute or validate values when they are read or written.',
            [
              {
                title: 'Data property descriptors',
                content: (
                  <p>
                    A data descriptor can include <code>value</code> and
                    <code> writable</code>, which controls assignment.
                    <code> enumerable</code> controls whether it appears in
                    common enumeration methods, while
                    <code> configurable</code> controls whether it can be
                    deleted or reconfigured. Properties created by assignment
                    are usually writable, enumerable, and configurable.
                  </p>
                ),
                code: `const person = {};

Object.defineProperty(person, "id", {
  value: 101,
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(person.id); // 101
console.log(Object.keys(person)); // []`,
              },
              {
                title: 'Getters and setters',
                content: (
                  <p>
                    A getter runs when a property is read; a setter runs when
                    a value is assigned. They can provide a derived value or
                    validate an update. Keep accessor behavior predictable,
                    because property syntax can hide the fact that code is
                    executing.
                  </p>
                ),
                code: `const wallet = {
  _balance: 100,

  get balance() {
    return \`$\${this._balance}\`;
  },

  set balance(amount) {
    if (amount < 0) {
      throw new RangeError("Balance cannot be negative");
    }

    this._balance = amount;
  },
};

console.log(wallet.balance); // $100
wallet.balance = 200;`,
              },
              {
                title: 'Inspect descriptors',
                content: (
                  <p>
                    <code>Object.getOwnPropertyDescriptor()</code> returns
                    the descriptor for an own property. This is helpful when
                    working with APIs that define properties with special
                    enumerability or writability behavior.
                  </p>
                ),
                code: `const descriptor =
  Object.getOwnPropertyDescriptor(person, "id");

console.log(descriptor.writable); // false
console.log(descriptor.enumerable); // false`,
              },
            ],
            'Use descriptors when property behavior needs explicit control. Use getters and setters sparingly and keep their work unsurprising.'
          ),
        ],
      },
      6: {
        title: 'Lecture 6: Traversing and Enumerating Objects',
        pages: [
          lessonPage(
            'Choose which object properties to inspect',
            'JavaScript offers different ways to enumerate keys depending on whether you need own properties, enumerable properties, inherited keys, or Symbols. Make that choice explicit when objects have prototypes or special descriptors.',
            [
              {
                title: 'Keys, values, and entries',
                content: (
                  <p>
                    <code>Object.keys()</code>, <code>Object.values()</code>,
                    and <code>Object.entries()</code> return arrays of an
                    object’s own enumerable string-keyed properties. Entries
                    are two-element arrays containing a key and its value.
                    You can iterate those entries with destructuring.
                  </p>
                ),
                code: `const product = { name: "Phone", price: 600 };

console.log(Object.keys(product)); // ["name", "price"]
console.log(Object.values(product)); // ["Phone", 600]
console.log(Object.entries(product));
// [["name", "Phone"], ["price", 600]]

for (const [key, value] of Object.entries(product)) {
  console.log(\`\${key}: \${value}\`);
}`,
              },
              {
                title: 'Symbols and non-enumerable properties',
                content: (
                  <p>
                    <code>Object.keys()</code> does not include Symbol keys
                    or non-enumerable properties. Use
                    <code> Object.getOwnPropertyNames()</code> for all own
                    string keys, <code>Object.getOwnPropertySymbols()</code>{' '}
                    for own Symbol keys, or <code>Reflect.ownKeys()</code>{' '}
                    for both kinds, enumerable or not.
                  </p>
                ),
                code: `const secret = Symbol("secret");
const record = { visible: true, [secret]: "hidden key" };

Object.defineProperty(record, "internal", {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(record)); // ["visible"]
console.log(Reflect.ownKeys(record)); // Includes all own keys`,
              },
              {
                title: 'Do not confuse own and inherited keys',
                content: (
                  <p>
                    <code>for...in</code> can include enumerable properties
                    inherited from an object’s prototype. If you use it, guard
                    with <code>Object.hasOwn()</code> when only direct
                    properties are wanted. For many data transformations,
                    <code> Object.entries()</code> makes the scope of the
                    traversal more explicit.
                  </p>
                ),
              },
            ],
            'Use `Object.keys`, `values`, or `entries` for own enumerable string keys, and `Reflect.ownKeys` when Symbols or non-enumerable keys must be included.'
          ),
        ],
      },
      7: {
        title: 'Lecture 7: Cloning and Merging Objects',
        pages: [
          lessonPage(
            'Copy objects with the right depth',
            'Object spread and `Object.assign()` create shallow copies: top-level properties are copied, but nested objects remain shared references. `structuredClone()` can deep-copy many supported data types, but it is not suitable for every value or object behavior.',
            [
              {
                title: 'Shallow copies',
                content: (
                  <p>
                    A shallow copy creates a different outer object while
                    preserving references to nested values. This is often
                    exactly what an immutable update needs, as long as changed
                    nested objects are also copied. <code>Object.assign()</code>{' '}
                    copies enumerable own properties into a target; object
                    spread creates a new object from enumerable own
                    properties.
                  </p>
                ),
                code: `const original = { a: 1, profile: { name: "Ari" } };
const spreadCopy = { ...original };
const assignCopy = Object.assign({}, original);

console.log(spreadCopy !== original); // true
console.log(spreadCopy.profile === original.profile); // true

spreadCopy.profile.name = "Kai";
console.log(original.profile.name); // Kai`,
              },
              {
                title: 'Deep cloning with `structuredClone()`',
                content: (
                  <p>
                    In supported environments, <code>structuredClone()</code>{' '}
                    deeply copies many structured-cloneable values, including
                    nested objects, arrays, Maps, Sets, Dates, and
                    ArrayBuffers. It does not clone every JavaScript value:
                    functions and some host objects are not cloneable, and
                    prototypes, accessors, and property descriptors are not
                    generally preserved as a custom class instance contract.
                    Check compatibility and data requirements before using
                    it as a universal clone.
                  </p>
                ),
                code: `const original = { a: 1, nested: { count: 2 } };
const deepCopy = structuredClone(original);

deepCopy.nested.count = 99;
console.log(original.nested.count); // 2`,
              },
              {
                title: 'Merge with intent',
                content: (
                  <p>
                    Spread can combine enumerable own properties from several
                    objects. Later properties override earlier ones with the
                    same key. This is a shallow merge; nested objects are
                    replaced, not recursively merged.
                  </p>
                ),
                code: `const defaults = { theme: "light", layout: { compact: false } };
const preferences = { theme: "dark" };

const settings = { ...defaults, ...preferences };
console.log(settings.theme); // dark
console.log(settings.layout === defaults.layout); // true`,
              },
            ],
            'Decide whether you need a shallow copy, deep clone, or merge. These are different operations, and no single clone method preserves every JavaScript object behavior.'
          ),
        ],
      },
      8: {
        title: 'Lecture 8: Prototypes and Inheritance',
        pages: [
          lessonPage(
            'Understand inherited property lookup',
            'Objects can inherit properties through an internal prototype link. When a property is requested, JavaScript checks the object itself first and then follows the prototype chain until it finds a match or reaches `null`.',
            [
              {
                title: 'The prototype chain',
                content: (
                  <p>
                    A prototype can provide shared behavior to many objects.
                    An inherited property is available through ordinary
                    lookup even though it is not an own property of the
                    receiving object. This is how class methods defined on a
                    class’s prototype are shared among its instances.
                  </p>
                ),
                code: `const grandParent = { familyName: "Smith" };
const parent = Object.create(grandParent);
const child = Object.create(parent);

console.log(child.familyName); // Smith
console.log(Object.hasOwn(child, "familyName")); // false
console.log(Object.getPrototypeOf(parent) === grandParent); // true`,
              },
              {
                title: 'Inspect prototypes carefully',
                content: (
                  <p>
                    Use <code>Object.getPrototypeOf()</code> to inspect an
                    object’s prototype. <code>Object.setPrototypeOf()</code>{' '}
                    can change the link, but changing prototypes dynamically
                    may inhibit engine optimizations and make behavior harder
                    to reason about. Prefer establishing the intended
                    prototype when creating the object.
                  </p>
                ),
                code: `const base = { describe() { return "base"; } };
const item = Object.create(base);

console.log(Object.getPrototypeOf(item) === base); // true
console.log(item.describe()); // base`,
              },
            ],
            'Property lookup follows the prototype chain after checking own properties. Prefer stable, intentional prototype relationships over changing prototypes later.'
          ),
        ],
      },
      9: {
        title: 'Lecture 9: Destructuring and Symbols',
        pages: [
          lessonPage(
            'Extract object values and create unique keys',
            'Object destructuring can make property access concise and supports renaming and defaults. Symbols provide unique property keys that do not collide with ordinary string keys, though they are not a security mechanism.',
            [
              {
                title: 'Destructuring with defaults and renaming',
                content: (
                  <p>
                    Destructuring takes properties by name rather than by
                    position. A colon renames the local variable, and a
                    default is used when the property value is
                    <code> undefined</code>. A default does not replace
                    <code> null</code> or other explicitly provided values.
                  </p>
                ),
                code: `const user = {
  id: 42,
  username: "dev_guru",
  role: "admin",
};

const {
  username: handle,
  role,
  location = "Unknown",
} = user;

console.log(handle); // dev_guru
console.log(role); // admin
console.log(location); // Unknown`,
              },
              {
                title: 'Symbols as property keys',
                content: (
                  <p>
                    Each call to <code>Symbol()</code> creates a unique
                    Symbol value, which can be used as an object key.
                    Symbol-keyed properties are omitted from
                    <code> Object.keys()</code> and ordinary
                    <code> for...in</code> enumeration, but they can still be
                    discovered with methods such as
                    <code> Object.getOwnPropertySymbols()</code> or
                    <code> Reflect.ownKeys()</code>. They should not be used
                    to store secrets.
                  </p>
                ),
                code: `const internalKey = Symbol("internal");
const record = {
  [internalKey]: "not a secret",
  publicData: "visible",
};

console.log(Object.keys(record)); // ["publicData"]
console.log(record[internalKey]); // not a secret
console.log(Reflect.ownKeys(record)); // Includes the Symbol`,
              },
            ],
            'Use destructuring for concise named property access, and use Symbols for unique keys—not for security or guaranteed secrecy.'
          ),
        ],
      },
      10: {
        title: 'Lecture 10: Object Best Practices and Maps',
        pages: [
          lessonPage(
            'Choose object tools that fit the data',
            'Objects work well for records with known property names. For frequently changing key-value dictionaries or keys that are not strings or Symbols, a `Map` is often a better fit. Keep object behavior and performance claims grounded in clear requirements and measurement.',
            [
              {
                title: 'Check own properties safely',
                content: (
                  <p>
                    Prefer <code>Object.hasOwn(obj, key)</code> to calling
                    <code> obj.hasOwnProperty(key)</code>. An object might
                    have no prototype or could shadow that method name;
                    <code> Object.hasOwn()</code> handles these cases
                    reliably.
                  </p>
                ),
                code: `const dictionary = Object.create(null);
dictionary.status = "ready";

console.log(Object.hasOwn(dictionary, "status")); // true
console.log(Object.hasOwn(dictionary, "toString")); // false`,
              },
              {
                title: 'Objects versus `Map`',
                content: (
                  <p>
                    Use an object for a record with a known set of named
                    properties. A <code>Map</code> is designed for dynamic
                    key-value collections: it can use values of any type as
                    keys and provides explicit methods such as
                    <code> set</code>, <code>get</code>, <code>has</code>, and
                    <code>delete</code>. Choose based on the API and
                    semantics you need rather than assuming one is always
                    faster.
                  </p>
                ),
                code: `const scores = new Map();
scores.set("team-a", 12);
scores.set("team-b", 18);

console.log(scores.get("team-b")); // 18
console.log(scores.has("team-a")); // true

for (const [team, score] of scores) {
  console.log(team, score);
}`,
              },
              {
                title: 'Avoid premature engine-specific tuning',
                content: (
                  <p>
                    JavaScript engines optimize common object shapes, but
                    internal strategies vary and can change. Prefer
                    consistent, understandable object structures because
                    they help maintainability; do not contort code solely
                    around claims about hidden classes or inline caches
                    unless profiling demonstrates a real bottleneck.
                    Likewise, use <code>structuredClone()</code> only when
                    its supported data model matches the values being copied.
                  </p>
                ),
              },
            ],
            'Use objects for structured records, Maps for dynamic dictionaries, `Object.hasOwn()` for safe own-property checks, and profiling before engine-specific optimization.'
          ),
        ],
      },
    },
  },
};

export default javascriptLessons;

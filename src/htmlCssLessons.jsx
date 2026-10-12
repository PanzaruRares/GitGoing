import React from 'react';

const htmlCssLessons = {
  1: {
    title: 'HTML Fundamentals & Document Structure',
    lectures: {
      1: {
        title: 'Introduction to the Web and HTML',
        pages: [
          {
            title: 'The role of HTML in web architecture',
            content: (
              <>
                <p className="lesson-lead">
                  HyperText Markup Language (HTML) is the standard markup language
                  used to construct web pages. It defines content structure and
                  gives semantic meaning to information on the web.
                </p>
                <section className="lesson-topic">
                  <h3>The three core web technologies</h3>
                  <p>
                    Every website in a browser is built upon three complementary
                    layers working together:
                  </p>
                  <ul>
                    <li>
                      <strong>HTML:</strong> Provides structural markup, text,
                      links, images, and document semantics.
                    </li>
                    <li>
                      <strong>CSS (Cascading Style Sheets):</strong> Dictates visual
                      presentation, color schemes, typography, and page layout.
                    </li>
                    <li>
                      <strong>JavaScript:</strong> Adds interactive behavior, event
                      handling, asynchronous data loading, and dynamic state.
                    </li>
                  </ul>
                  <p>
                    Without HTML, there is no content for CSS to style or for
                    JavaScript to manipulate. HTML serves as the foundational skeleton
                    of every web document.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Anatomy of an HTML element',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Elements, tags, and attributes</h3>
                  <p>
                    An HTML document is composed of a nested tree of elements. A
                    standard element consists of four primary components:
                  </p>
                  <ul>
                    <li><strong>Opening tag:</strong> Denoted by <code>&lt;tagname&gt;</code>, marking the start of an element.</li>
                    <li><strong>Attributes:</strong> Key-value pairs placed inside the opening tag providing configuration or metadata (e.g., <code>class="intro"</code> or <code>id="banner"</code>).</li>
                    <li><strong>Content:</strong> The text or child elements encapsulated between tags.</li>
                    <li><strong>Closing tag:</strong> Denoted by <code>&lt;/tagname&gt;</code>, closing the boundary of the element.</li>
                  </ul>
                  <pre><code>{'<p class="intro-text">Welcome to the course!</p>'}</code></pre>
                  <p>
                    Here, <code>&lt;p&gt;</code> is the tag, <code>class="intro-text"</code> is
                    an attribute specifying a CSS hook, and the enclosed text is the content.
                  </p>
                </section>
                <section className="lesson-topic">
                  <h3>Void (self-closing) elements</h3>
                  <p>
                    Some HTML elements cannot contain text or nested elements. These are
                    known as <strong>void elements</strong> and do not use a closing tag:
                  </p>
                  <pre><code>{'<img src="logo.png" alt="GitGoing Logo" />\n<input type="text" name="username" />\n<br />\n<hr />'}</code></pre>
                  <p>
                    Void elements include <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>,
                    <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;meta&gt;</code>, and <code>&lt;link&gt;</code>.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Element nesting and hierarchy',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>The Document Object Model (DOM) tree</h3>
                  <p>
                    HTML elements can be nested inside one another, creating parent,
                    child, and sibling relationships that browsers parse into the DOM tree.
                  </p>
                  <pre><code>{'<div>\n  <h2>Course Overview</h2>\n  <p>Learn <strong>HTML</strong> step-by-step.</p>\n</div>'}</code></pre>
                  <p>
                    Tags must close in the reverse order of how they were opened. Overlapping
                    tags (such as opening <code>&lt;p&gt;&lt;strong&gt;</code> and closing
                    <code>&lt;/p&gt;&lt;/strong&gt;</code>) is invalid markup that causes
                    unpredictable browser parsing errors.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>HTML defines content structure; CSS styles it; JavaScript adds interactivity.</li>
                    <li>Standard elements have opening tags, attributes, content, and closing tags.</li>
                    <li>Void elements (e.g., <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>) never take closing tags.</li>
                    <li>Always nest tags strictly inside one another without overlapping boundaries.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'HTML Boilerplate and Document Anatomy',
        pages: [
          {
            title: 'The standard HTML5 boilerplate',
            content: (
              <>
                <p className="lesson-lead">
                  Every production web page begins with a standardized skeleton that
                  informs browsers how to parse the file and configures core document metadata.
                </p>
                <pre><code>{'<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Web Page</title>\n</head>\n<body>\n    <h1>Welcome to GitGoing</h1>\n    <p>Document content goes here.</p>\n</body>\n</html>'}</code></pre>
                <section className="lesson-topic">
                  <h3>The document root and language</h3>
                  <p>
                    <code>&lt;!DOCTYPE html&gt;</code> is a required declaration that puts the browser
                    into standard rendering mode rather than legacy quirks mode.
                  </p>
                  <p>
                    The <code>&lt;html lang="en"&gt;</code> element is the root node of the
                    document. The <code>lang</code> attribute assists screen readers and search engines
                    by identifying the primary language of the document content.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Document metadata in the head',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>The role of the head element</h3>
                  <p>
                    The <code>&lt;head&gt;</code> contains metadata about the page that is not
                    rendered directly in the main browser window, but controls critical behavior:
                  </p>
                  <ul>
                    <li>
                      <code>{'<meta charset="UTF-8">'}</code>: Configures Unicode character encoding,
                      ensuring emojis, international characters, and symbols render correctly.
                    </li>
                    <li>
                      <code>{'<meta name="viewport" content="width=device-width, initial-scale=1.0">'}</code>:
                      Controls responsive mobile viewport scaling. Without this, mobile devices
                      render desktop-width pages in a shrunken zoom.
                    </li>
                    <li>
                      <code>{'<title>'}</code>: Specifies the browser tab title, bookmark label,
                      and search engine result headline.
                    </li>
                    <li>
                      <code>{'<link rel="stylesheet" href="styles.css">'}</code>: Connects external stylesheets.
                    </li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'The document body and rendered content',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>The body container</h3>
                  <p>
                    The <code>&lt;body&gt;</code> element encapsulates all visible content rendered
                    on the screen: headings, paragraphs, lists, images, tables, audio, video,
                    and form controls.
                  </p>
                  <p>
                    Browsers only render content inside the <code>&lt;body&gt;</code> tag. Placing
                    visible text or markup inside <code>&lt;head&gt;</code> is invalid HTML and
                    triggers recovery behavior across different browser rendering engines.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li><code>&lt;!DOCTYPE html&gt;</code> must always be the first line to guarantee standards mode.</li>
                    <li>Always specify <code>lang</code> on <code>&lt;html&gt;</code> for accessibility and SEO.</li>
                    <li>The viewport meta tag is essential for responsive mobile layout scaling.</li>
                    <li>The <code>&lt;head&gt;</code> stores metadata; the <code>&lt;body&gt;</code> contains all rendered content.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Semantic HTML5 and Accessibility',
        pages: [
          {
            title: 'Semantic layout elements',
            content: (
              <>
                <p className="lesson-lead">
                  Semantic HTML uses descriptive tags that clearly convey their meaning and purpose
                  to both the browser, search engines, and assistive technologies.
                </p>
                <section className="lesson-topic">
                  <h3>HTML5 semantic landmarks</h3>
                  <ul>
                    <li><code>&lt;header&gt;</code>: Introductory content, page branding, or primary site titles.</li>
                    <li><code>&lt;nav&gt;</code>: Primary navigation link blocks.</li>
                    <li><code>&lt;main&gt;</code>: The central, unique content of the document (use only one per page).</li>
                    <li><code>&lt;section&gt;</code>: A thematic grouping of content, typically introduced by a heading.</li>
                    <li><code>&lt;article&gt;</code>: Self-contained composition that makes sense independently (e.g., blog post, comment, card).</li>
                    <li><code>&lt;aside&gt;</code>: Tangentially related content, sidebars, or callouts.</li>
                    <li><code>&lt;footer&gt;</code>: Authorship, copyright notices, legal links, or supplementary navigation.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Why semantic HTML matters',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Three critical benefits</h3>
                  <ol>
                    <li>
                      <strong>Accessibility (a11y):</strong> Screen reader software parses semantic
                      landmarks so users with visual impairments can jump directly to navigation,
                      articles, or main content without listening to every link.
                    </li>
                    <li>
                      <strong>SEO optimization:</strong> Search engine crawlers (Google, Bing) use
                      semantic tags to determine which content represents the primary topic of the page.
                    </li>
                    <li>
                      <strong>Code maintainability:</strong> Replaces meaningless nested <code>&lt;div&gt;</code>
                      tag soups with clear, self-documenting structural blocks that team members can navigate quickly.
                    </li>
                  </ol>
                </section>
              </>
            ),
          },
          {
            title: 'Divs versus semantic landmarks',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>When to use div and span</h3>
                  <p>
                    <code>&lt;div&gt;</code> (block level) and <code>&lt;span&gt;</code> (inline level)
                    are non-semantic generic containers. They carry no innate meaning.
                  </p>
                  <p>
                    Reserve <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code> strictly for
                    CSS styling hooks, layout wrappers, or JavaScript hooks when no semantic tag fits.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Use <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code> for document layout landmarks.</li>
                    <li>There should only be one <code>&lt;main&gt;</code> element per document.</li>
                    <li>Semantic tags boost accessibility for screen readers and improve SEO crawling.</li>
                    <li>Use generic <code>&lt;div&gt;</code> only when no semantic element applies to the content.</li>
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
    title: 'Essential HTML Elements & Forms',
    lectures: {
      1: {
        title: 'Text Content, Lists and Formatting',
        pages: [
          {
            title: 'Headings and paragraph structure',
            content: (
              <>
                <p className="lesson-lead">
                  Text content elements give structure and visual hierarchy to articles,
                  documentation, and applications.
                </p>
                <section className="lesson-topic">
                  <h3>Heading hierarchy (h1 through h6)</h3>
                  <p>
                    Headings denote structural levels, from <code>&lt;h1&gt;</code> (most important)
                    down to <code>&lt;h6&gt;</code> (sub-sections):
                  </p>
                  <ul>
                    <li>Never skip heading levels (e.g., do not jump directly from <code>&lt;h2&gt;</code> to <code>&lt;h4&gt;</code>).</li>
                    <li>Best practice is to maintain exactly <strong>one</strong> <code>&lt;h1&gt;</code> per document to anchor SEO rankings.</li>
                    <li>Never use headings simply to make text bigger; use CSS font sizing instead.</li>
                  </ul>
                  <p>
                    Paragraphs are encapsulated in <code>&lt;p&gt;</code> tags and automatically render
                    with vertical margins in default browser styles.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Inline formatting and semantic emphasis',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Formatting elements</h3>
                  <ul>
                    <li><code>&lt;strong&gt;</code>: Indicates serious importance or urgency; rendered in bold text by default.</li>
                    <li><code>&lt;em&gt;</code>: Indicates stress emphasis that changes the spoken inflection of a sentence; rendered in italics.</li>
                    <li><code>&lt;code&gt;</code>: Formats inline computer code or command strings using a monospace typeface.</li>
                    <li><code>&lt;pre&gt;</code>: Preformatted text preserving literal line breaks and spaces.</li>
                  </ul>
                  <p>
                    Prefer semantic <code>&lt;strong&gt;</code> and <code>&lt;em&gt;</code> over legacy
                    purely visual tags like <code>&lt;b&gt;</code> and <code>&lt;i&gt;</code>.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Unordered and ordered lists',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Structuring items with lists</h3>
                  <p>
                    Lists organize related items into readable groups:
                  </p>
                  <ul>
                    <li><strong>Unordered List (<code>&lt;ul&gt;</code>):</strong> Bulleted collection where order is not sequential.</li>
                    <li><strong>Ordered List (<code>&lt;ol&gt;</code>):</strong> Numbered sequence where order matters (such as recipes or steps).</li>
                    <li>Both list containers must only contain <code>&lt;li&gt;</code> (list item) elements as direct children.</li>
                  </ul>
                  <pre><code>{'<ul>\n  <li>HTML structure</li>\n  <li>CSS styling</li>\n</ul>'}</code></pre>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Keep a single <code>&lt;h1&gt;</code> per page and follow a logical heading hierarchy.</li>
                    <li>Use <code>&lt;strong&gt;</code> for importance and <code>&lt;em&gt;</code> for emphasis.</li>
                    <li>Lists must place items inside <code>&lt;li&gt;</code> tags directly under <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code>.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'Hyperlinks and Media Elements',
        pages: [
          {
            title: 'Anchor tags and navigation links',
            content: (
              <>
                <p className="lesson-lead">
                  Hyperlinks are the core mechanism that connects documents across the World Wide Web.
                </p>
                <section className="lesson-topic">
                  <h3>The anchor element</h3>
                  <p>
                    Links are created using the <code>&lt;a&gt;</code> tag with the <code>href</code> attribute:
                  </p>
                  <pre><code>{'<a href="https://example.com" target="_blank" rel="noopener">\n  Visit Documentation\n</a>'}</code></pre>
                  <ul>
                    <li><code>href</code>: Destination URL (absolute web URL, relative path, or <code>#id</code> anchor).</li>
                    <li><code>target="_blank"</code>: Opens destination in a new browser tab.</li>
                    <li><code>rel="noopener"</code>: Security measure preventing the new page from accessing the opening window object.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Images and accessibility with alt text',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>The image element</h3>
                  <p>
                    Images are embedded via the void element <code>&lt;img&gt;</code>:
                  </p>
                  <pre><code>{'<img src="architecture.png" alt="Diagram showing the 4 layers of the CSS box model" width="600" />'}</code></pre>
                  <ul>
                    <li><code>src</code>: File path or web address of the image.</li>
                    <li><code>alt</code>: Text description read aloud by screen readers when images fail to load or for visually impaired users. Always provide meaningful alt text.</li>
                    <li><code>width</code> and <code>height</code>: Setting explicit dimensions reserves layout space and prevents layout shift (CLS).</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Page anchors and asset paths',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Internal linking</h3>
                  <p>
                    Anchor tags can navigate to specific sections within the current document
                    by targeting element <code>id</code> attributes:
                  </p>
                  <pre><code>{'<a href="#contact-section">Jump to Contact</a>\n...\n<section id="contact-section">Contact Form</section>'}</code></pre>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Always add <code>rel="noopener"</code> when opening external links with <code>target="_blank"</code>.</li>
                    <li>The <code>alt</code> attribute on <code>&lt;img&gt;</code> is mandatory for web accessibility.</li>
                    <li>Explicit image dimensions prevent cumulative layout shift while images download.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Forms and User Input Handling',
        pages: [
          {
            title: 'Form containers, actions, and methods',
            content: (
              <>
                <p className="lesson-lead">
                  HTML forms capture and submit user input to servers, handling logins,
                  search queries, registration flows, and data collection.
                </p>
                <section className="lesson-topic">
                  <h3>The form element</h3>
                  <pre><code>{'<form action="/api/submit" method="POST">\n    <label for="username">Username:</label>\n    <input type="text" id="username" name="username" required>\n    <button type="submit">Submit</button>\n</form>'}</code></pre>
                  <ul>
                    <li><code>action</code>: Endpoint URL that processes submitted form data.</li>
                    <li><code>method</code>: HTTP method. <code>GET</code> appends query parameters to the URL; <code>POST</code> sends data in the request body.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Form inputs, labels, and validation',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Labels and text inputs</h3>
                  <p>
                    Every form control should have an associated <code>&lt;label&gt;</code>. Binding
                    the label's <code>for</code> attribute to the input's <code>id</code> ensures
                    clicking the label focuses the input:
                  </p>
                  <pre><code>{'<label for="user-email">Email Address:</label>\n<input type="email" id="user-email" name="email" required placeholder="you@domain.com">'}</code></pre>
                  <ul>
                    <li><code>type="text"</code>: Single-line arbitrary text.</li>
                    <li><code>type="email"</code>: Built-in email syntax validation.</li>
                    <li><code>type="password"</code>: Masks typed characters for security.</li>
                    <li><code>required</code>: Browser blocks submission until completed.</li>
                    <li><code>minlength</code> / <code>maxlength</code>: Enforces length bounds.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Selection controls and submit buttons',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Dropdowns, checkboxes, and radios</h3>
                  <ul>
                    <li><code>&lt;select&gt;</code> with <code>&lt;option&gt;</code>: Dropdown select menu.</li>
                    <li><code>type="checkbox"</code>: Independent toggle for one or more choices.</li>
                    <li><code>type="radio"</code>: Mutually exclusive selection among inputs sharing the same <code>name</code>.</li>
                    <li><code>&lt;button type="submit"&gt;</code>: Triggers validation and sends the form payload.</li>
                  </ul>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Bind every input to a <code>&lt;label&gt;</code> using matching <code>for</code> and <code>id</code>.</li>
                    <li>Use <code>POST</code> for sensitive or state-changing form submissions.</li>
                    <li>Leverage native validation attributes (<code>required</code>, <code>minlength</code>, <code>type="email"</code>).</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
    },
  },
  3: {
    title: 'CSS Fundamentals & Selectors',
    lectures: {
      1: {
        title: 'Introduction to CSS and Inclusion Methods',
        pages: [
          {
            title: 'What CSS does and how it cascades',
            content: (
              <>
                <p className="lesson-lead">
                  Cascading Style Sheets (CSS) controls the visual presentation,
                  layout, and typography of HTML elements.
                </p>
                <section className="lesson-topic">
                  <h3>The cascading principle</h3>
                  <p>
                    Multiple style rules can apply to the same HTML element. The browser resolves
                    conflicts through the <strong>cascade</strong>, which prioritizes styles based on
                    importance, specificity, and source order.
                  </p>
                  <p>
                    CSS separates visual styling from document content, allowing you to update
                    the design of an entire application by modifying a single stylesheet file.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Three methods to include CSS',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Inclusion techniques</h3>
                  <ol>
                    <li>
                      <strong>Inline styles:</strong> Applied directly via the <code>style</code> attribute.
                      <pre><code>{'<h1 style="color: blue;">Header</h1>'}</code></pre>
                      <em>Avoid in production: mixes structure with presentation and defeats caching.</em>
                    </li>
                    <li>
                      <strong>Internal stylesheet:</strong> Placed inside a <code>&lt;style&gt;</code> block within <code>&lt;head&gt;</code>.
                      <pre><code>{'<style>\n  h1 { color: #0066cc; }\n</style>'}</code></pre>
                      <em>Useful for single-page isolated prototypes or HTML email templates.</em>
                    </li>
                    <li>
                      <strong>External stylesheet:</strong> Linked via external <code>.css</code> files.
                      <pre><code>{'<link rel="stylesheet" href="styles.css">'}</code></pre>
                      <em>Industry standard: provides global maintainability, reusability, and browser caching.</em>
                    </li>
                  </ol>
                </section>
              </>
            ),
          },
          {
            title: 'Stylesheet best practices',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Clean architecture</h3>
                  <p>
                    Always default to external stylesheets. Keep selectors concise, avoid inline style
                    attributes, and organize rules logically from base element resets down to specialized
                    component classes.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>External stylesheets (<code>&lt;link rel="stylesheet"&gt;</code>) are the industry standard.</li>
                    <li>Inline styles should be avoided because they override external rules and hurt maintainability.</li>
                    <li>The cascade resolves style conflicts based on importance, specificity, and order.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'CSS Rules and Declaration Syntax',
        pages: [
          {
            title: 'Anatomy of a CSS rule',
            content: (
              <>
                <p className="lesson-lead">
                  A CSS rule consists of a selector and a declaration block containing
                  one or more property-value pairs.
                </p>
                <pre><code>{'/* Selector */\np {\n    /* Property: Value; */\n    color: #333333;\n    font-size: 16px;\n    line-height: 1.6;\n}'}</code></pre>
                <section className="lesson-topic">
                  <h3>Declarations, properties, and values</h3>
                  <ul>
                    <li><strong>Selector:</strong> Points to the HTML elements to style.</li>
                    <li><strong>Declaration block:</strong> Wrapped in curly braces <code>{'{ ... }'}</code>.</li>
                    <li><strong>Property:</strong> The visual characteristic to adjust (e.g., <code>color</code>, <code>font-size</code>).</li>
                    <li><strong>Value:</strong> The setting assigned to that property, ending with a semicolon <code>;</code>.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Color formats and typography',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Color representation in CSS</h3>
                  <ul>
                    <li><strong>Hexadecimal:</strong> <code>#007acc</code> or short form <code>#fff</code>.</li>
                    <li><strong>RGB / RGBA:</strong> <code>rgb(0, 122, 204)</code> or with alpha opacity <code>rgba(0, 122, 204, 0.8)</code>.</li>
                    <li><strong>Modern color functions:</strong> <code>hsl()</code>, <code>color-mix()</code>, and CSS system colors.</li>
                  </ul>
                  <p>
                    Typography properties include <code>font-family</code> (with fallback stacks),
                    <code>font-weight</code>, <code>line-height</code>, and <code>text-align</code>.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Formatting and syntax hygiene',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Avoid syntax traps</h3>
                  <p>
                    Every declaration must terminate with a semicolon. A missing semicolon invalidates
                    subsequent declarations in that block. Comments in CSS are written as <code>/* comment */</code>.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>A CSS rule pairs a selector with a declaration block enclosed in curly braces.</li>
                    <li>Every property-value declaration must terminate with a semicolon.</li>
                    <li>Use hex, RGB, or HSL to express precise color palettes.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Selectors and Specificity Hierarchy',
        pages: [
          {
            title: 'Common selector types',
            content: (
              <>
                <p className="lesson-lead">
                  Selectors target specific elements in the DOM. Choosing the right selector
                  keeps styling predictable and scalable.
                </p>
                <section className="lesson-topic">
                  <h3>Essential selectors</h3>
                  <ul>
                    <li><strong>Element selector:</strong> <code>h1 {'{ ... }'}</code> targets all <code>&lt;h1&gt;</code> elements.</li>
                    <li><strong>Class selector:</strong> <code>.btn {'{ ... }'}</code> targets elements with <code>class="btn"</code>.</li>
                    <li><strong>ID selector:</strong> <code>#main-header {'{ ... }'}</code> targets the unique element with <code>id="main-header"</code>.</li>
                    <li><strong>Attribute selector:</strong> <code>{'input[type="text"] { ... }'}</code> targets matching attributes.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Pseudo-classes and interactive states',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Stateful styling</h3>
                  <p>
                    Pseudo-classes style elements based on state or DOM position:
                  </p>
                  <ul>
                    <li><code>a:hover</code>: Styles links when the user hovers with a pointer.</li>
                    <li><code>button:active</code>: Styles button while pressed down.</li>
                    <li><code>input:focus</code>: Styles input when it has keyboard focus.</li>
                    <li><code>li:nth-child(even)</code>: Selects alternating rows in lists or tables.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'The specificity hierarchy',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Ranked from highest to lowest priority</h3>
                  <ol>
                    <li><code>!important</code> rule (overrides everything; use only as a last resort).</li>
                    <li>Inline styles (<code>{'style="..."'}</code> in HTML).</li>
                    <li>ID selectors (<code>#header</code>).</li>
                    <li>Class selectors, attribute selectors, and pseudo-classes (<code>.btn</code>, <code>[type="text"]</code>, <code>:hover</code>).</li>
                    <li>Element selectors and pseudo-elements (<code>h1</code>, <code>::before</code>).</li>
                  </ol>
                  <p>
                    When two competing rules have equal specificity, the rule written last in the
                    stylesheet wins.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Prefer class selectors (<code>.card</code>) for reusable component styling.</li>
                    <li>Use pseudo-classes (<code>:hover</code>, <code>:focus</code>) for interactive feedback.</li>
                    <li>Specificity ranks: Inline &gt; ID &gt; Class &gt; Element.</li>
                    <li>Avoid <code>!important</code> because it breaks the natural CSS cascade.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
    },
  },
  4: {
    title: 'The Box Model & Positioning',
    lectures: {
      1: {
        title: 'The CSS Box Model and Sizing',
        pages: [
          {
            title: 'The four layers of the box model',
            content: (
              <>
                <p className="lesson-lead">
                  Every HTML element rendered in a browser is treated as a rectangular box.
                  The CSS Box Model dictates how spacing and dimensions are calculated.
                </p>
                <section className="lesson-topic">
                  <h3>From inside to outside</h3>
                  <ol>
                    <li><strong>Content:</strong> The text, image, or child elements inside.</li>
                    <li><strong>Padding:</strong> Clear area surrounding content inside the element's border.</li>
                    <li><strong>Border:</strong> A visible or invisible line enclosing padding and content.</li>
                    <li><strong>Margin:</strong> Clear buffer space outside the border separating the element from neighbors.</li>
                  </ol>
                  <pre><code>{'.card {\n    width: 300px;\n    padding: 20px;\n    border: 2px solid #007acc;\n    margin: 15px auto; /* Centers element horizontally */\n}'}</code></pre>
                </section>
              </>
            ),
          },
          {
            title: 'The critical box-sizing rule',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>content-box versus border-box</h3>
                  <p>
                    By default, CSS uses <code>box-sizing: content-box</code>. In this mode,
                    declared <code>width</code> only covers the content. Adding 20px padding and
                    2px border increases the element's total rendered width to 344px, causing unexpected
                    overflow and layout breakage.
                  </p>
                  <p>
                    Setting <code>box-sizing: border-box</code> includes padding and border within
                    the declared width:
                  </p>
                  <pre><code>{'/* Universal Box Sizing Reset */\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}'}</code></pre>
                </section>
              </>
            ),
          },
          {
            title: 'Margin collapsing and auto centering',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Margin behavior</h3>
                  <p>
                    Adjacent vertical margins collapse into a single margin equal to the larger
                    of the two. Setting <code>margin: 0 auto;</code> on a block element with a fixed
                    width automatically centers it horizontally within its parent container.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>The box model consists of: Content &rarr; Padding &rarr; Border &rarr; Margin.</li>
                    <li>Always use the universal <code>box-sizing: border-box</code> reset in modern CSS.</li>
                    <li><code>margin: 0 auto;</code> centers fixed-width block elements horizontally.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'Display Types and Document Flow',
        pages: [
          {
            title: 'Normal flow and block elements',
            content: (
              <>
                <p className="lesson-lead">
                  The <code>display</code> property determines how an element participates
                  in the browser's document layout flow.
                </p>
                <section className="lesson-topic">
                  <h3>Block elements (display: block)</h3>
                  <p>
                    Elements like <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, and <code>&lt;h1&gt;</code>:
                  </p>
                  <ul>
                    <li>Always start on a new line.</li>
                    <li>Expand horizontally to fill 100% of the parent container width by default.</li>
                    <li>Fully respect custom <code>width</code>, <code>height</code>, <code>padding</code>, and <code>margin</code> on all four sides.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Inline and inline-block display',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Inline elements (display: inline)</h3>
                  <p>
                    Elements like <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, and <code>&lt;strong&gt;</code>:
                  </p>
                  <ul>
                    <li>Flow along the text line without forcing a line break.</li>
                    <li>Take up only the width necessary for their content.</li>
                    <li>Ignore custom <code>width</code>, <code>height</code>, and vertical margins.</li>
                  </ul>
                  <h3>Inline-block (display: inline-block)</h3>
                  <p>
                    Combines both behaviors: flows horizontally like inline text, but respects explicit
                    width, height, vertical margins, and padding.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Hiding elements with display none',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>display: none versus visibility: hidden</h3>
                  <p>
                    <code>display: none;</code> completely removes the element from the document flow
                    as though it does not exist. In contrast, <code>visibility: hidden;</code> hides the
                    element visually while preserving its empty rectangular footprint in the layout.
                  </p>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li><code>display: block</code> takes 100% width and starts on a new line.</li>
                    <li><code>display: inline</code> flows inside text and ignores width/height.</li>
                    <li><code>display: inline-block</code> flows inline while allowing custom dimensions.</li>
                    <li><code>display: none</code> removes an element entirely from layout calculations.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Positioning Modes and Offsets',
        pages: [
          {
            title: 'Static and relative positioning',
            content: (
              <>
                <p className="lesson-lead">
                  The <code>position</code> property shifts elements outside normal document flow
                  using directional offsets (<code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>).
                </p>
                <section className="lesson-topic">
                  <h3>Static (default)</h3>
                  <p>
                    <code>position: static;</code> follows the normal natural layout flow. Directional
                    offsets and <code>z-index</code> have no effect.
                  </p>
                  <h3>Relative positioning</h3>
                  <p>
                    <code>position: relative;</code> shifts the element relative to where it normally sits.
                    Its original space in the document flow is preserved, and it serves as a coordinate
                    anchor for absolutely positioned children.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Absolute positioning and coordinates',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>position: absolute</h3>
                  <p>
                    Removes the element completely from document flow. It positions itself relative
                    to the nearest ancestor that has a position other than <code>static</code> (commonly
                    a parent with <code>position: relative;</code>).
                  </p>
                  <pre><code>{'.parent {\n    position: relative;\n}\n.badge {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}'}</code></pre>
                  <p>
                    If no positioned ancestor exists, it positions itself relative to the initial viewport.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Fixed and sticky positioning',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Fixed vs sticky</h3>
                  <ul>
                    <li>
                      <strong>Fixed (<code>position: fixed;</code>):</strong> Anchored relative to the
                      browser viewport. Stays in the exact same spot on the screen even when the user scrolls.
                    </li>
                    <li>
                      <strong>Sticky (<code>position: sticky;</code>):</strong> Toggles between relative
                      and fixed based on the user's scroll position, sticking to a threshold (e.g., <code>top: 0;</code>).
                    </li>
                  </ul>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li><code>position: relative</code> keeps space in flow and anchors absolute children.</li>
                    <li><code>position: absolute</code> removes the element from flow and aligns to the nearest positioned ancestor.</li>
                    <li><code>position: fixed</code> stays locked to the screen viewport during page scrolling.</li>
                    <li><code>position: sticky</code> sticks to an offset once scrolled past its boundary.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
    },
  },
  5: {
    title: 'Modern Layout & Responsive Design',
    lectures: {
      1: {
        title: 'Flexbox Layout Engine',
        pages: [
          {
            title: 'One-dimensional layouts and flex containers',
            content: (
              <>
                <p className="lesson-lead">
                  Flexible Box Layout (Flexbox) is a 1-dimensional layout model designed to distribute
                  space and align items along a single axis (row or column).
                </p>
                <pre><code>{'.flex-container {\n    display: flex;\n    flex-direction: row; /* row | column */\n    justify-content: space-between; /* Main axis */\n    align-items: center; /* Cross axis */\n    gap: 16px;\n}'}</code></pre>
                <section className="lesson-topic">
                  <h3>Main axis versus cross axis</h3>
                  <p>
                    The direction of the main axis is set by <code>flex-direction</code> (defaults to <code>row</code>).
                    <code>justify-content</code> controls alignment along the main axis; <code>align-items</code> controls
                    alignment along the perpendicular cross axis.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Flex container properties',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Key container controls</h3>
                  <ul>
                    <li><code>justify-content:</code> <code>flex-start</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>.</li>
                    <li><code>align-items:</code> <code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code>.</li>
                    <li><code>flex-wrap: wrap;</code>: Allows items to wrap onto multiple lines if screen space runs out.</li>
                    <li><code>gap: 16px;</code>: Sets uniform gutter spacing between flex children without margin hacks.</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Flex item properties and sizing',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Sizing child elements</h3>
                  <pre><code>{'.flex-item {\n    flex-grow: 1; /* Grows to absorb extra space */\n    flex-shrink: 0; /* Prevents shrinking below basis */\n    flex-basis: 200px; /* Starting size before distributing space */\n    /* Shorthand: flex: 1 0 200px; */\n}'}</code></pre>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Flexbox is optimized for 1D layouts (single rows or single columns).</li>
                    <li><code>justify-content</code> aligns along the main axis; <code>align-items</code> aligns across it.</li>
                    <li>Use <code>gap</code> to specify spacing between flex children.</li>
                    <li>The <code>flex: 1;</code> shorthand makes items grow evenly to fill available width.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      2: {
        title: 'CSS Grid Layout Engine',
        pages: [
          {
            title: 'Two-dimensional grid containers',
            content: (
              <>
                <p className="lesson-lead">
                  CSS Grid Layout is a 2-dimensional system designed to handle rows and
                  columns simultaneously, ideal for whole-page layouts and complex card grids.
                </p>
                <pre><code>{'.grid-container {\n    display: grid;\n    grid-template-columns: 200px 1fr 2fr;\n    grid-template-rows: auto 1fr auto;\n    gap: 20px;\n}'}</code></pre>
                <section className="lesson-topic">
                  <h3>Fractional units (fr)</h3>
                  <p>
                    The <code>fr</code> unit represents a fraction of free available space. In
                    <code>1fr 2fr</code>, the second column receives twice the remaining width of the first.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Responsive grid tracks with repeat and minmax',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Auto-responsive grids without media queries</h3>
                  <pre><code>{'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));'}</code></pre>
                  <p>
                    This modern pattern automatically wraps columns when space drops below 250px
                    while expanding cards to fill available screen space.
                  </p>
                </section>
              </>
            ),
          },
          {
            title: 'Grid item line placement',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Spanning rows and columns</h3>
                  <pre><code>{'.sidebar {\n    grid-column: 1 / 2; /* Starts at line 1, ends at line 2 */\n}\n.main-content {\n    grid-column: 2 / 4; /* Spans across columns 2 and 3 */\n}'}</code></pre>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>CSS Grid handles 2D layouts (rows and columns simultaneously).</li>
                    <li>The <code>fr</code> unit distributes available space proportionally.</li>
                    <li><code>repeat(auto-fit, minmax(...))</code> builds responsive layouts without media queries.</li>
                    <li><code>grid-column: start / end</code> controls item placement across grid lines.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
      3: {
        title: 'Responsive Design, Media Queries and CSS Variables',
        pages: [
          {
            title: 'Relative units for scalable typography',
            content: (
              <>
                <p className="lesson-lead">
                  Responsive Web Design ensures web applications adapt fluidly across mobile
                  phones, tablets, laptops, and ultra-wide desktop monitors.
                </p>
                <section className="lesson-topic">
                  <h3>Modern CSS units</h3>
                  <ul>
                    <li><code>rem</code>: Relative to root (<code>&lt;html&gt;</code>) font size (1rem = 16px default). Best for typography and spacing.</li>
                    <li><code>em</code>: Relative to the parent element's font size.</li>
                    <li><code>%</code>: Relative to parent container dimensions.</li>
                    <li><code>vw</code> / <code>vh</code>: 1% of viewport width / height (100vw = full viewport width).</li>
                  </ul>
                </section>
              </>
            ),
          },
          {
            title: 'Mobile-first design with media queries',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Media query breakpoints</h3>
                  <p>
                    Mobile-first design writes base styles for small screens, then layers
                    on <code>min-width</code> queries as the viewport expands:
                  </p>
                  <pre><code>{'/* Base Mobile Styles */\n.container {\n    display: flex;\n    flex-direction: column;\n}\n\n/* Tablet (768px and up) */\n@media (min-width: 768px) {\n    .container {\n        flex-direction: row;\n    }\n}\n\n/* Desktop (1024px and up) */\n@media (min-width: 1024px) {\n    .container {\n        max-width: 1200px;\n        margin: 0 auto;\n    }\n}'}</code></pre>
                </section>
              </>
            ),
          },
          {
            title: 'CSS custom properties (variables)',
            content: (
              <>
                <section className="lesson-topic">
                  <h3>Declaring and using variables</h3>
                  <pre><code>{':root {\n    --primary-color: #0066cc;\n    --text-dark: #222222;\n    --spacing-md: 1rem;\n}\n\nbutton {\n    background-color: var(--primary-color);\n    color: white;\n    padding: var(--spacing-md);\n}'}</code></pre>
                </section>
                <aside className="lesson-callout">
                  <strong>Important to remember</strong>
                  <ul>
                    <li>Prefer <code>rem</code> for accessible typography that respects browser user font preferences.</li>
                    <li>Always adopt mobile-first CSS using <code>min-width</code> media queries.</li>
                    <li>CSS variables (<code>--variable-name</code>) provide global design tokens across themes and layouts.</li>
                  </ul>
                </aside>
              </>
            ),
          },
        ],
      },
    },
  },
};

const pageExtensions = {
  'The role of HTML in web architecture': (
    <section className="lesson-topic">
      <h3>Compare the layers with a recipe</h3>
      <p>
        Think of a web page like a meal: HTML names the ingredients and arranges
        them into courses, CSS controls how the meal is presented, and JavaScript
        responds when someone asks for a change. A heading remains a heading even
        if you remove its colors, just as a recipe remains identifiable without
        its plating. For example, an article title belongs in an <code>&lt;h1&gt;</code>,
        not in a generic container that only looks large. This separation helps
        browsers, assistive technology, and developers understand what the content
        means before presentation is applied.
      </p>
      <p>
        Try opening a plain HTML file without its stylesheet. It may look basic,
        but its links and headings still work. That is a useful check that the
        structure carries meaning instead of relying entirely on visual styling.
      </p>
    </section>
  ),
  'Anatomy of an HTML element': (
    <section className="lesson-topic">
      <h3>Read an element like a labeled container</h3>
      <p>
        Consider <code>&lt;a href="/courses" className="nav-link"&gt;Courses&lt;/a&gt;</code>.
        The element communicates that “Courses” is a link, while <code>href</code>
        gives its destination and <code>class</code> lets CSS select it. Changing
        the class changes how the link can be styled; changing the destination
        changes where it goes. Those are separate jobs. Attributes belong in the
        opening tag, and their values should be quoted so spaces and special
        characters are interpreted predictably.
      </p>
      <p>
        Compare this with an <code>&lt;img&gt;</code>: it has attributes such as
        <code> src</code> and <code>alt</code>, but no inner text or closing tag.
        When debugging, check the tag name, attribute spelling, and nesting
        before assuming a browser rendering problem.
      </p>
    </section>
  ),
  'Element nesting and hierarchy': (
    <section className="lesson-topic">
      <h3>Think of nesting as an outline</h3>
      <p>
        A parent element groups related children, much like a chapter contains
        sections and each section contains paragraphs. For instance, an
        <code> &lt;article&gt;</code> can contain a heading and several paragraphs;
        those paragraphs are siblings, while the article is their parent. This
        relationship gives the DOM a predictable structure that CSS selectors
        and scripts can traverse. Indentation does not change browser behavior,
        but it makes the relationships visible to people reading the source.
      </p>
      <p>
        A common mistake is to close elements in a different order from how they
        opened. Close the innermost child first, like closing nested boxes from
        the inside out. If a browser repairs malformed markup automatically,
        the resulting DOM may not match the layout you intended.
      </p>
    </section>
  ),
  'The standard HTML5 boilerplate': (
    <section className="lesson-topic">
      <h3>Why the small setup lines matter</h3>
      <p>
        The boilerplate is the page's setup contract with the browser. The
        doctype requests modern standards rendering, while the character
        encoding prevents names such as “café” from turning into unreadable
        symbols. The viewport setting tells a phone to use its device-width
        layout instead of shrinking a desktop-sized canvas. Without it, a page
        can technically load on mobile but appear tiny and require constant
        zooming.
      </p>
      <p>
        The <code>&lt;title&gt;</code> is also different from the visible
        <code> &lt;h1&gt;</code>: the title appears in browser tabs and bookmarks,
        while the heading belongs in the page body. Give both concise, useful
        text so users can identify the page in either place.
      </p>
    </section>
  ),
  'Document metadata in the head': (
    <section className="lesson-topic">
      <h3>Metadata works behind the scenes</h3>
      <p>
        Treat <code>&lt;head&gt;</code> as the instruction panel for the document,
        not as a hidden place to put visible page content. A stylesheet link,
        character encoding, page title, and description each communicate
        something different to the browser or other tools. For example, the
        description can become a search result summary, but it does not replace
        the actual article text. A stylesheet link loads presentation rules;
        putting a paragraph in the head will not make it part of the readable
        page body.
      </p>
      <p>
        When something looks wrong, check that metadata is in the head and
        visible content is in the body. Also keep the encoding near the start
        of the head so the browser knows how to interpret the document early.
      </p>
    </section>
  ),
  'The document body and rendered content': (
    <section className="lesson-topic">
      <h3>Separate what users see from page instructions</h3>
      <p>
        The body is the document's visible content area: a page heading, a
        navigation menu, an image, and the text of an article belong there.
        Browser instructions such as the title and stylesheet reference belong
        in the head instead. Imagine a book: the body is the printed chapter,
        while the head resembles catalog information and references that help
        software handle the book. Keeping those roles clear improves
        accessibility and makes the source easier to scan.
      </p>
      <p>
        A practical starter body might include a <code>&lt;header&gt;</code>,
        one <code>&lt;main&gt;</code>, and a <code>&lt;footer&gt;</code>. The
        browser does not require that exact layout, but recognizable structure
        gives readers and assistive tools useful landmarks.
      </p>
    </section>
  ),
  'Semantic layout elements': (
    <section className="lesson-topic">
      <h3>Choose landmarks by their purpose</h3>
      <p>
        Semantic elements describe the role of a region, not the shape it has
        on screen. A <code>&lt;nav&gt;</code> groups major navigation links; an
        <code> &lt;aside&gt;</code> holds related material; and
        <code> &lt;main&gt;</code> identifies the page's central content. These
        elements can all be styled to look like cards, columns, or plain text,
        so do not choose one based only on default browser appearance.
      </p>
      <p>
        For a course page, a site-wide header can contain the logo and primary
        navigation, while the main region contains the lesson and a separate
        aside contains related resources. This is clearer than giving every
        wrapper a generic <code>&lt;div&gt;</code> and relying on class names
        alone to explain its purpose.
      </p>
    </section>
  ),
  'Why semantic HTML matters': (
    <section className="lesson-topic">
      <h3>One structure, many ways to use it</h3>
      <p>
        Semantic markup helps more than search engines. A screen-reader user
        can navigate by headings or landmarks, a keyboard user can find
        interactive controls, and a teammate can understand the source without
        guessing what each wrapper means. Compare a button built as
        <code> &lt;button&gt;Save&lt;/button&gt;</code> with a clickable
        <code> &lt;div&gt;</code>: the real button already supports keyboard
        activation and exposes its role to assistive technology. Recreating
        those behaviors manually takes extra code and is easy to get wrong.
      </p>
      <p>
        Semantic HTML is not an automatic accessibility guarantee, but it gives
        the browser the right starting information. Labels, useful link text,
        and a logical heading order still matter.
      </p>
    </section>
  ),
  'Divs versus semantic landmarks': (
    <section className="lesson-topic">
      <h3>A quick decision test</h3>
      <p>
        Before adding a generic container, ask whether the content has a known
        role. Is it navigation, the primary page content, an independent
        article, or a footer? If so, choose the matching semantic element.
        If the wrapper exists only to apply a grid or a styling hook and has no
        meaningful role, a <code>&lt;div&gt;</code> is appropriate. For inline
        styling around a few words, <code>&lt;span&gt;</code> is the equivalent
        neutral choice.
      </p>
      <p>
        Avoid the opposite extreme of using a semantic tag just because its
        name sounds descriptive. A <code>&lt;nav&gt;</code> should contain
        navigation, not any random group of links; an <code>&lt;article&gt;</code>
        should make sense as a standalone piece. Meaningful choices are more
        valuable than replacing every div indiscriminately.
      </p>
    </section>
  ),
  'Headings and paragraph structure': (
    <section className="lesson-topic">
      <h3>Build a scannable outline</h3>
      <p>
        A well-structured article might begin with one page heading, then use
        section headings for major ideas and smaller headings for subsections.
        This is similar to a report outline: a subsection belongs under its
        parent topic, so choose heading levels based on hierarchy rather than
        the size you want the text to appear. CSS can make an
        <code> &lt;h2&gt;</code> look smaller or larger without changing its
        meaning.
      </p>
      <p>
        Use a paragraph for a coherent block of prose and start a new paragraph
        when the thought changes. This is easier to read than inserting
        repeated line breaks into one long block. A logical outline also helps
        screen-reader users jump directly to a section and helps authors spot
        missing or duplicated topics.
      </p>
    </section>
  ),
  'Inline formatting and semantic emphasis': (
    <section className="lesson-topic">
      <h3>Meaning is more useful than appearance</h3>
      <p>
        Use <code>&lt;strong&gt;</code> when the text is important, such as a
        warning that deleting a file is permanent. Use <code>&lt;em&gt;</code>
        when emphasis changes how a sentence should be read, as in “choose the
        <em> relative</em> path.” Both often appear bold or italic by default,
        but their meaning remains even if a stylesheet changes that appearance.
        By contrast, a class with <code>font-weight: bold</code> only describes
        visual styling.
      </p>
      <p>
        For code samples, use <code>&lt;code&gt;</code> for a short command and
        combine it with <code>&lt;pre&gt;</code> when spacing and line breaks
        must be preserved. Choose the element that describes the content, then
        let CSS decide how it should look.
      </p>
    </section>
  ),
  'Unordered and ordered lists': (
    <section className="lesson-topic">
      <h3>Let the list type explain the relationship</h3>
      <p>
        A shopping list is unordered because buying bread before apples does
        not change the result. A setup procedure is ordered because the steps
        must happen in sequence. Choosing the right list makes that
        relationship clear to people who see bullets and numbers, as well as
        assistive software that announces list structure. Each direct child
        should be an <code>&lt;li&gt;</code>; put nested lists inside a list
        item when one item needs its own sub-items.
      </p>
      <p>
        For example, a course overview could use an ordered list for lessons
        that build on one another, but an unordered list for independent
        learning goals. Do not type bullet characters or numbers into plain
        paragraphs when an actual list element can provide the structure.
      </p>
    </section>
  ),
  'Anchor tags and navigation links': (
    <section className="lesson-topic">
      <h3>Write links that explain their destination</h3>
      <p>
        Link text should make sense even when read out of context. “Read the
        CSS selectors lesson” is more informative than “click here,” especially
        when a screen-reader user browses a list of links. Use an absolute URL
        when linking to another site and a relative URL for a page within your
        own project. A fragment such as <code>#contact</code> can jump to an
        element whose <code>id</code> is <code>contact</code>.
      </p>
      <p>
        Opening a new tab is not automatically better: it can surprise users,
        so use <code>target="_blank"</code> only when there is a clear reason.
        If you do, include <code>rel="noopener"</code> for a safer separation
        from the opening page and make the behavior understandable in the link
        context.
      </p>
    </section>
  ),
  'Images and accessibility with alt text': (
    <section className="lesson-topic">
      <h3>Describe the image's job</h3>
      <p>
        Write alternative text based on why the image is present, not every
        detail a person could see. If a diagram explains how HTML, CSS, and
        JavaScript fit together, summarize that relationship. If an image is
        purely decorative and adds no information, use an empty
        <code> alt=""</code> so screen readers can skip it. Missing alt text
        can cause a screen reader to announce an unhelpful filename instead.
      </p>
      <p>
        Think of alt text as a text equivalent, not a caption. A caption is
        visible to everyone and can give context; alternative text provides
        the essential image information when the image cannot be perceived.
        Keep it concise, avoid starting with “image of,” and do not repeat
        nearby text that already communicates the same fact.
      </p>
    </section>
  ),
  'Page anchors and asset paths': (
    <section className="lesson-topic">
      <h3>Paths are relative to the document</h3>
      <p>
        A relative asset path is resolved from the location of the HTML file,
        not from the image itself. If <code>index.html</code> and a
        <code> images</code> folder sit beside one another,
        <code> images/logo.svg</code> points to the logo. A path beginning
        with <code>../</code> moves up one directory. A fragment link works
        differently: <code>href="#pricing"</code> stays on the current page
        and targets the matching ID.
      </p>
      <p>
        When a link works from one folder but fails from a nested page, compare
        the page's location with the asset's location and adjust the relative
        path. Keep filenames and letter case consistent, since production
        servers may treat <code>Logo.png</code> and <code>logo.png</code> as
        different files.
      </p>
    </section>
  ),
  'Form containers, actions, and methods': (
    <section className="lesson-topic">
      <h3>Forms need a destination and a plan</h3>
      <p>
        A form is a package of named values that the browser can submit. The
        <code> action</code> tells it where to send that package, and the
        <code> method</code> describes how. A search form might use GET so its
        query can appear in a shareable URL; a profile update usually uses
        POST because it changes server-side data. Neither method validates
        that the server will accept the data, so server-side checks remain
        necessary even when the browser provides convenient validation.
      </p>
      <p>
        Give each control a meaningful <code>name</code>, because unnamed
        controls are generally omitted from the submitted data. Try submitting
        a small form and inspect the URL or network request to see how field
        names and values travel together.
      </p>
    </section>
  ),
  'Form inputs, labels, and validation': (
    <section className="lesson-topic">
      <h3>Make every field understandable</h3>
      <p>
        A placeholder is a hint, not a label: it disappears when a user types
        and may have low contrast. A real label stays available and gives
        assistive technology the input's name. Connect them with matching
        <code> for</code> and <code>id</code> values, such as
        <code> &lt;label for="email"&gt;Email&lt;/label&gt;</code> and
        <code> &lt;input id="email" name="email" type="email"&gt;</code>.
        Choosing <code>type="email"</code> can provide a suitable keyboard on
        mobile and trigger basic browser validation.
      </p>
      <p>
        Attributes like <code>required</code> and <code>minlength</code> help
        users catch mistakes early, but they do not replace server validation.
        Treat browser checks as helpful guidance, not a security boundary.
      </p>
    </section>
  ),
  'Selection controls and submit buttons': (
    <section className="lesson-topic">
      <h3>Choose controls based on the answer</h3>
      <p>
        Use radio buttons when a person must choose exactly one option from a
        small set, checkboxes when choices can be combined, and a
        <code> &lt;select&gt;</code> when a longer list should take less space.
        For example, a single delivery speed is a radio choice; selecting
        several email topics is a checkbox task. Group related radio options
        with <code>&lt;fieldset&gt;</code> and describe the group with
        <code> &lt;legend&gt;</code> so its context is clear.
      </p>
      <p>
        Make the submit button's purpose explicit, such as “Create account”
        rather than a vague label when the form has a specific outcome.
        Distinguish submit buttons from buttons that merely open a menu or
        toggle a preview, because the default behavior of a button inside a
        form is to submit unless its type is set appropriately.
      </p>
    </section>
  ),
  'What CSS does and how it cascades': (
    <section className="lesson-topic">
      <h3>Predict which rule wins</h3>
      <p>
        Suppose a paragraph matches both a broad <code>p</code> rule and a
        more specific <code>.warning</code> rule. The browser compares the
        competing declarations using the cascade rather than picking whichever
        rule looks more convenient. If their priority and specificity tie, the
        rule that appears later wins. This is why adding overrides at the end
        of a stylesheet can work, but repeatedly adding overrides can make
        the source difficult to reason about.
      </p>
      <p>
        A useful comparison is a set of instructions: importance establishes
        priority, selector specificity breaks many ties, and source order
        resolves remaining ties. Browser developer tools show the winning
        declaration and the rules that were overridden, which is often faster
        than guessing.
      </p>
    </section>
  ),
  'Three methods to include CSS': (
    <section className="lesson-topic">
      <h3>Pick the method for the scope</h3>
      <p>
        An inline style is like a one-off note attached to a single element:
        quick to test, but difficult to reuse and override. An internal
        stylesheet keeps rules with one document and can suit a tiny
        demonstration. An external stylesheet is more like a shared design
        guide: several pages can use the same rules, and the browser may cache
        the file between visits. This makes external CSS the clearest default
        for a multi-page site.
      </p>
      <p>
        For a prototype, try changing the same heading's color with each
        method and observe which rule wins. Then move the final rule to an
        external file and link it from two pages. Reusing the stylesheet
        avoids copy-pasting the same design decision and letting pages drift
        apart.
      </p>
    </section>
  ),
  'Stylesheet best practices': (
    <section className="lesson-topic">
      <h3>Organize for future changes</h3>
      <p>
        A stylesheet is easier to maintain when related rules live together
        and selectors describe reusable roles. For example, a
        <code> .button-primary</code> class communicates intent better than
        styling every element in a particular position with a long chain of
        selectors. If a design changes, a reusable class can be updated once
        instead of editing many unrelated rules.
      </p>
      <p>
        Use consistent spacing, descriptive class names, and a small set of
        shared colors and sizes. Avoid escalating every conflict with
        <code> !important</code>; like putting every instruction at the top
        of a priority list, it makes later maintenance harder. Keep a rule
        close to the component or purpose it styles, and remove obsolete
        declarations when a design changes.
      </p>
    </section>
  ),
  'Anatomy of a CSS rule': (
    <section className="lesson-topic">
      <h3>Translate a design into declarations</h3>
      <p>
        If a design calls for dark text with comfortable line spacing, the
        selector identifies the text and declarations express those choices:
        <code> .article { '{' } color: #333; line-height: 1.6; { '}' }</code>.
        The selector does not set a value by itself; each property needs a
        valid value accepted by the browser. A misspelled property may be
        ignored while the rest of the rule still applies.
      </p>
      <p>
        Add one declaration at a time when learning a new property, then
        inspect the result in the browser. If a declaration has no visible
        effect, check that the selector matches an element, the property name
        is valid, and the value has the correct unit or format. This turns CSS
        debugging into a set of checks instead of trial and error.
      </p>
    </section>
  ),
  'Color formats and typography': (
    <section className="lesson-topic">
      <h3>Choose readable combinations</h3>
      <p>
        Hex, RGB, and HSL can all describe a color, but each makes different
        adjustments convenient. Hex is compact for fixed palettes; RGB is
        familiar when thinking about red, green, and blue light; HSL can make
        it easier to adjust hue, saturation, or lightness independently.
        Whichever format you use, compare foreground and background contrast
        rather than choosing colors in isolation.
      </p>
      <p>
        Typography also depends on combinations. A readable font family can
        still feel cramped if line-height is too small or the text column is
        too wide. Try a system font stack with a comfortable line-height, then
        resize the viewport: readable type should not depend on one exact
        screen size. Use font fallbacks so text remains legible if a preferred
        font is unavailable.
      </p>
    </section>
  ),
  'Formatting and syntax hygiene': (
    <section className="lesson-topic">
      <h3>Debug from the first broken declaration</h3>
      <p>
        CSS parsing is forgiving, so one typo may be ignored while the browser
        continues applying later rules. For example, a missing colon in
        <code> color blue;</code> makes that declaration invalid, but it does
        not necessarily erase the entire stylesheet. Consistent indentation
        and one declaration per line make it easier to spot the exact point
        where a rule stops matching your intention.
      </p>
      <p>
        When a style does not appear, inspect the element in developer tools,
        confirm that the stylesheet loaded, and look for crossed-out
        declarations. Then check braces, colons, semicolons, and spelling.
        Comments use <code>/* ... */</code>; unlike HTML comments, they can
        appear inside a CSS file without changing page content.
      </p>
    </section>
  ),
  'Common selector types': (
    <section className="lesson-topic">
      <h3>Target the smallest useful group</h3>
      <p>
        A type selector such as <code>p</code> affects every paragraph, while
        a class selector such as <code>.notice</code> can be reused for
        selected elements. An ID selector such as <code>#site-header</code>
        targets one uniquely identified element. For most component styling,
        classes are flexible: one element can have several classes, and a
        class can be shared across many pages.
      </p>
      <p>
        A descendant selector like <code>.card p</code> is useful when the
        relationship matters, but deeply nested selectors become fragile if
        the markup changes. Start with a simple class on the element you want
        to style, then add a relationship only when it makes the rule clearer.
        This reduces accidental matches elsewhere in the document.
      </p>
    </section>
  ),
  'Pseudo-classes and interactive states': (
    <section className="lesson-topic">
      <h3>Design for more than a mouse</h3>
      <p>
        A pseudo-class selects an element based on its state without adding a
        new class in the HTML. For example, <code>:hover</code> can show a
        pointer interaction, while <code>:focus-visible</code> can make the
        keyboard's current control easier to find. A hover-only cue is not
        enough because touch devices may not hover and keyboard users move
        focus without a pointer.
      </p>
      <p>
        Try tabbing through links and buttons after styling their interactive
        states. Keep a visible focus indicator and check that text remains
        readable in hover, focus, and disabled states. Pseudo-classes such as
        <code>:first-child</code> can also target structural positions, but
        use them only when the position itself is meaningful and stable.
      </p>
    </section>
  ),
  'The specificity hierarchy': (
    <section className="lesson-topic">
      <h3>Specificity is not source order alone</h3>
      <p>
        If a type selector and a class selector set the same property on one
        element, the class selector normally wins because it is more specific.
        A later type rule does not automatically beat an earlier class rule.
        When two selectors have equal specificity and importance, source order
        decides the winner. This explains why adding a rule at the bottom
        sometimes appears ineffective: an existing selector may have higher
        specificity.
      </p>
      <p>
        Prefer fixing the original selector or using a clear component class
        instead of stacking IDs and long descendant chains. High specificity
        creates a ladder of overrides that is hard to climb back down.
        Developer tools display the competing selectors, so use them to
        identify the actual conflict before adding another rule.
      </p>
    </section>
  ),
  'The four layers of the box model': (
    <section className="lesson-topic">
      <h3>Estimate the full footprint</h3>
      <p>
        Imagine a card with a content width of 240 pixels, 20 pixels of
        padding on each side, and a 2-pixel border. Under the default
        content-box model, its visible width is 284 pixels before margins:
        240 + 40 + 4. The content is the text area, padding adds breathing
        room inside the border, the border outlines the card, and margin
        separates it from neighbors.
      </p>
      <p>
        This is why two boxes given the same CSS width can appear different
        when their padding or borders differ. Use browser developer tools to
        inspect each layer, and consider setting <code>box-sizing:
        border-box</code> so the declared width includes padding and border.
        Margins remain outside that declared size.
      </p>
    </section>
  ),
  'The critical box-sizing rule': (
    <section className="lesson-topic">
      <h3>Compare content-box with border-box</h3>
      <p>
        With <code>content-box</code>, <code>width: 300px</code> describes only
        the content. Add padding and border and the rendered box becomes
        wider than 300 pixels. With <code>border-box</code>, the same width
        includes the padding and border, leaving a smaller content area
        instead. That makes two columns with equal declared widths much easier
        to fit inside a parent.
      </p>
      <p>
        Many projects apply <code>* { '{' } box-sizing: border-box; { '}' }</code>
        globally so sizing calculations are consistent. Margins are not
        included in either width calculation, so two border-box elements can
        still overflow a row if their widths plus margins exceed the available
        space. Check the full footprint, not only the width property.
      </p>
    </section>
  ),
  'Margin collapsing and auto centering': (
    <section className="lesson-topic">
      <h3>Margins create outside space</h3>
      <p>
        Vertical margins between normal block elements can collapse, which
        means the gap may be the larger margin rather than the sum of both.
        For example, a 24-pixel bottom margin followed by a 16-pixel top
        margin often creates a 24-pixel gap, not 40 pixels. This behavior is
        different from horizontal margins and can make spacing feel
        surprising when boxes are stacked.
      </p>
      <p>
        For a centered content column, give the block a maximum width and
        automatic left and right margins, such as
        <code> max-width: 60rem; margin-inline: auto;</code>. The automatic
        margins share available horizontal space, but they do not center an
        element whose width already fills the parent. Use padding on the
        parent when you also need space at narrow screen sizes.
      </p>
    </section>
  ),
  'Normal flow and block elements': (
    <section className="lesson-topic">
      <h3>Let the browser stack content naturally</h3>
      <p>
        Normal flow is the default arrangement before special layout or
        positioning rules are applied. A block heading followed by a
        paragraph typically appears on separate lines, filling the available
        width while keeping its content height. This makes ordinary article
        markup work without manually placing every element at screen
        coordinates.
      </p>
      <p>
        Compare normal flow to a vertical list: when text above grows, the
        content below moves down automatically. That flexibility is usually
        better than fixed positions for long-form content, whose height can
        change with language, font size, or device width. Use Flexbox or Grid
        when you need structured rows or columns, and reserve absolute
        positioning for deliberate overlays rather than basic page layout.
      </p>
    </section>
  ),
  'Inline and inline-block display': (
    <section className="lesson-topic">
      <h3>Choose between text flow and a small box</h3>
      <p>
        A link inside a sentence is naturally inline: it flows with the words
        and does not start a new line. An inline element is not designed to
        behave like a full card with a reliable width and height. If you need
        a compact badge to sit beside text while controlling its dimensions,
        <code>inline-block</code> combines horizontal flow with box sizing.
      </p>
      <p>
        For example, several inline-block category labels can sit on one line
        and wrap when space runs out. A block element would instead begin on
        its own line. Modern layouts often use Flexbox or Grid for groups of
        controls, but understanding these display modes helps explain why
        margins, dimensions, and line breaks behave differently on links,
        spans, paragraphs, and divs.
      </p>
    </section>
  ),
  'Hiding elements with display none': (
    <section className="lesson-topic">
      <h3>Choose whether the space should remain</h3>
      <p>
        Use <code>display: none</code> when the element should take up no
        layout space, such as a closed panel that should not affect nearby
        content. Use <code>visibility: hidden</code> when the element should
        become invisible but keep its place, which can prevent neighboring
        items from shifting. These choices are not interchangeable: imagine
        removing a chair from a row versus covering it while leaving the gap.
      </p>
      <p>
        Hiding visually is also different from disabling an interaction.
        Neither property communicates why content is hidden, and inaccessible
        controls can confuse users if they remain reachable in unexpected
        ways. For interactive interfaces, pair visual state changes with
        appropriate HTML state and behavior, and test the result with a
        keyboard as well as a pointer.
      </p>
    </section>
  ),
  'Static and relative positioning': (
    <section className="lesson-topic">
      <h3>Relative positioning is a small adjustment</h3>
      <p>
        A statically positioned element follows normal flow and ignores
        directional offsets. A relatively positioned element still keeps its
        original space, even if an offset makes it appear shifted. That
        retained space is important: the following paragraph does not move
        into the gap as it might if the element were removed from flow.
      </p>
      <p>
        Relative positioning is often useful for a small visual adjustment
        or for creating a reference point for an absolutely positioned badge.
        For example, a card can be <code>position: relative</code> and its
        “New” label can sit in the card's upper corner. The card remains in
        the normal page layout, while the badge is positioned against that
        local reference instead of the whole viewport.
      </p>
    </section>
  ),
  'Absolute positioning and coordinates': (
    <section className="lesson-topic">
      <h3>Anchor overlays to the intended component</h3>
      <p>
        An absolutely positioned element leaves normal flow, so surrounding
        content behaves as if it were not taking up space. If its parent is
        the nearest positioned ancestor, offsets such as <code>top</code> and
        <code> right</code> are measured from that parent. Without a positioned
        ancestor, the element may be placed relative to a much larger
        containing block than intended, often making the overlay appear in a
        surprising location.
      </p>
      <p>
        This is useful for a notification badge over an avatar or an icon
        inside an input wrapper. It is usually a poor way to build the main
        page columns because absolute elements do not reserve space and can
        overlap content as text or viewport dimensions change. Keep the
        positioned item visually tied to its component.
      </p>
    </section>
  ),
  'Fixed and sticky positioning': (
    <section className="lesson-topic">
      <h3>Compare viewport attachment with scroll context</h3>
      <p>
        A fixed help button stays at the same viewport corner as the document
        scrolls, like an overlay attached to the screen. A sticky section
        heading behaves normally until it reaches a threshold, then stays
        visible while its containing area continues. Sticky positioning
        therefore depends on scroll context and can stop at the boundary of
        its container; fixed positioning does not behave like part of that
        scrolling section.
      </p>
      <p>
        Provide enough offset so sticky content does not hide under a fixed
        header, and check whether a parent with overflow settings changes the
        expected scroll container. On a short phone screen, a large fixed
        panel can cover important content, so verify overlays at different
        viewport sizes and ensure users can still reach what is underneath.
      </p>
    </section>
  ),
  'One-dimensional layouts and flex containers': (
    <section className="lesson-topic">
      <h3>Use Flexbox when one axis is the main concern</h3>
      <p>
        Flexbox is a natural fit for a navigation row, a toolbar, or a group
        of buttons because those items primarily need to line up and share
        space along one direction. The main axis follows
        <code> flex-direction</code>; the cross axis runs perpendicular to
        it. Changing from <code>row</code> to <code>column</code> changes
        which direction is the main axis, so alignment properties should be
        understood in relation to the direction rather than memorized as
        “horizontal” or “vertical.”
      </p>
      <p>
        A row of navigation items can use <code>justify-content</code> to
        distribute space and <code>align-items</code> to align their centers.
        If the design needs simultaneous control of both rows and columns,
        CSS Grid may express the structure more directly.
      </p>
    </section>
  ),
  'Flex container properties': (
    <section className="lesson-topic">
      <h3>Distribute space without hard-coded gaps</h3>
      <p>
        A flex container can align items, distribute free space, and wrap
        items when the available width is limited. For example,
        <code> display: flex; gap: 1rem; align-items: center;</code> creates
        consistent separation and vertical alignment in a toolbar.
        <code>justify-content: space-between</code> pushes the first and last
        items toward opposite edges, while <code>center</code> groups items
        in the middle. These values distribute available space; they do not
        change the semantic order of the HTML.
      </p>
      <p>
        Try shrinking the browser window with and without
        <code> flex-wrap: wrap</code>. Wrapping lets items continue on another
        line instead of overflowing, but it can change where visual gaps
        appear. Choose alignment that still looks intentional with short,
        long, and translated labels.
      </p>
    </section>
  ),
  'Flex item properties and sizing': (
    <section className="lesson-topic">
      <h3>Let items grow or shrink intentionally</h3>
      <p>
        Flex items can share extra room or surrender space when the container
        becomes narrow. A flexible search field can grow between a logo and
        account controls, while those neighboring items keep their natural
        size. The shorthand <code>flex</code> controls grow, shrink, and basis;
        changing only one value may not have the effect expected if the
        initial basis or minimum content size still constrains the item.
      </p>
      <p>
        When a long word forces a row wider than the screen, inspect the
        item's minimum size as well as its flex settings. Real content often
        behaves differently from short placeholder labels. Test with longer
        names and narrow screens so the layout adapts rather than clipping or
        pushing neighboring controls off-screen.
      </p>
    </section>
  ),
  'Two-dimensional grid containers': (
    <section className="lesson-topic">
      <h3>Use Grid when rows and columns both matter</h3>
      <p>
        A dashboard often has meaningful rows and columns at the same time:
        cards should align across a row, and each new row should begin beneath
        the previous one. Grid describes that two-dimensional structure
        directly. For example, a three-column card layout can declare its
        columns once and let items flow into the next row, rather than
        calculating widths and wrapping with margins by hand.
      </p>
      <p>
        Flexbox is usually simpler when items form one primary line and merely
        wrap as needed. Grid is often clearer when the column tracks themselves
        define the design. These tools can also work together: Grid can place
        page regions while Flexbox aligns the contents of each card.
      </p>
    </section>
  ),
  'Responsive grid tracks with repeat and minmax': (
    <section className="lesson-topic">
      <h3>Let the available space choose the column count</h3>
      <p>
        Fixed-width columns can fit on a desktop and overflow on a phone.
        Grid's <code>repeat()</code> avoids writing the same track definition
        repeatedly, while <code>minmax()</code> gives each track a lower and
        upper sizing boundary. A pattern such as
        <code> repeat(auto-fit, minmax(15rem, 1fr))</code> lets as many cards
        fit as the available width allows, with each card receiving a share
        of remaining space.
      </p>
      <p>
        Compare that with manually switching between three, two, and one
        columns at several breakpoints. Automatic tracks can reduce special
        cases, though a breakpoint may still be useful when the design needs
        a deliberate change in spacing or typography. Test just above and
        below the minimum track width to see when the next column wraps.
      </p>
    </section>
  ),
  'Grid item line placement': (
    <section className="lesson-topic">
      <h3>Place items by tracks, not pixel coordinates</h3>
      <p>
        Grid lines mark the boundaries between tracks. An item can span
        multiple columns or rows by naming its starting and ending lines, which
        is more adaptable than giving it an absolute pixel position. For
        example, a feature card can span two columns on a wide dashboard while
        the surrounding cards stay in the regular grid. The grid still
        participates in page layout, so later content can flow around its
        tracks rather than being hidden underneath.
      </p>
      <p>
        Use named areas when the layout has recognizable regions such as
        header, sidebar, and main content; line numbers work well for smaller
        placements. Be careful with explicit placement that leaves unexpected
        empty cells, and test what happens when there are more items than the
        original design anticipated.
      </p>
    </section>
  ),
  'Relative units for scalable typography': (
    <section className="lesson-topic">
      <h3>Let type respond to its context</h3>
      <p>
        Pixels give a fixed CSS length, while <code>rem</code> scales relative
        to the root font size and <code>em</code> scales relative to the
        element's font context. That makes <code>rem</code> useful for a
        consistent spacing and type scale, and <code>em</code> useful when a
        component's padding should grow with its own text. Viewport units can
        adapt to screen dimensions, but using them alone may make text too
        small on a phone or too large on a wide monitor.
      </p>
      <p>
        Try increasing the browser's default text size: a robust layout should
        continue to fit and remain readable. Relative units are not
        automatically accessible, but they make it easier for the design to
        respect user preferences instead of locking every size to one
        assumption.
      </p>
    </section>
  ),
  'Mobile-first design with media queries': (
    <section className="lesson-topic">
      <h3>Add complexity only when the layout needs it</h3>
      <p>
        A mobile-first stylesheet begins with a simple narrow-screen layout,
        then adds columns or spacing when the content has enough room. For
        example, a single-column course list can become two columns at a
        wider breakpoint. This approach works well because the small-screen
        version is a useful baseline, not a desktop layout squeezed into a
        narrow viewport.
      </p>
      <p>
        Choose breakpoints where the content begins to feel cramped rather
        than matching a particular phone model. Resize the browser gradually
        and look for awkward line lengths, overflowing buttons, or cards that
        are too narrow. A media query changes styles under a condition; it
        does not create a separate page, so keep content and semantics
        consistent across sizes.
      </p>
    </section>
  ),
  'CSS custom properties (variables)': (
    <section className="lesson-topic">
      <h3>Use tokens for decisions you repeat</h3>
      <p>
        A custom property can store a design choice such as a brand color,
        spacing step, or border radius. If several buttons and links use the
        same accent, changing one variable updates all of them consistently.
        This is similar to using a named constant in a program instead of
        repeating a literal value, because the name communicates the role of
        the value and gives you one place to adjust it.
      </p>
      <p>
        Define shared tokens on <code>:root</code> for broad availability,
        then reference them with <code>var(--name)</code>. A component can
        override a variable locally when it needs a different theme. Use
        descriptive names such as <code>--color-primary</code> rather than
        names tied only to one component, and choose a fallback when the
        property may be unset.
      </p>
    </section>
  ),
};

Object.values(htmlCssLessons).forEach(({ lectures }) => {
  Object.values(lectures).forEach(({ pages }) => {
    pages?.forEach((page) => {
      const extension = pageExtensions[page.title];
      if (extension) {
        page.content = <>{page.content}{extension}</>;
      }
    });
  });
});

export default htmlCssLessons;

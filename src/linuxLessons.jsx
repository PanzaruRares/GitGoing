import React from 'react';
import chapterOneText from './linuxChapterOne.md?raw';

const linuxLessons = {
  1: {
    title: 'The terminal and shell',
    lectures: {},
  },
  2: {
    title: 'Navigating the filesystem',
    pages: [
      {
        title: 'A single directory tree',
        content: (
          <>
            <p className="lesson-lead">
              Linux places files in one tree rooted at <code>/</code>. Instead
              of drive letters, disks and other storage are mounted somewhere
              within that tree.
            </p>
            <section className="lesson-topic">
              <h3>Directories worth recognizing</h3>
              <ul>
                <li><code>/home</code> — users’ personal files.</li>
                <li><code>/etc</code> — system configuration.</li>
                <li><code>/var</code> — changing data, including logs.</li>
                <li><code>/tmp</code> — temporary files.</li>
                <li><code>/usr</code> — installed programs and libraries.</li>
                <li><code>/bin</code> and <code>/sbin</code> — essential commands.</li>
              </ul>
            </section>
            <section className="lesson-topic">
              <h3>The navigation trio</h3>
              <pre><code>pwd{"\n"}ls{"\n"}cd /etc</code></pre>
              <p>
                <code>pwd</code> prints the working directory,
                <code> ls</code> lists its contents, and <code>cd</code> changes
                the working directory. Try <code>ls -l</code> for details,
                <code> ls -a</code> to include hidden names, or
                <code> ls -lh</code> for human-readable file sizes.
              </p>
            </section>
          </>
        ),
      },
      {
        title: 'Paths and efficient navigation',
        content: (
          <>
            <section className="lesson-topic">
              <h3>Absolute vs. relative paths</h3>
              <p>
                An <strong>absolute path</strong> starts at root and works
                regardless of your current directory, for example
                <code> /home/alex/Documents</code>. A <strong>relative path</strong>
                starts from the current directory, such as
                <code> Documents/notes</code>.
              </p>
              <ul>
                <li><code>.</code> — current directory.</li>
                <li><code>..</code> — parent directory.</li>
                <li><code>~</code> — your home directory.</li>
                <li><code>cd -</code> — return to the previous directory.</li>
              </ul>
              <p>
                From <code>/home/alex/Documents</code>,
                <code> cd ..</code> moves to <code>/home/alex</code>.
                <code> cd ~/Music</code> reaches the Music folder from anywhere.
                Running <code>cd</code> with no argument returns home.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Names with spaces and tree views</h3>
              <p>
                Quote a path with spaces, as in <code>cd "My Files"</code>, or
                escape the space with a backslash:
                <code> cd My\ Files</code>. For your own files, underscores and
                hyphens are often easier to work with.
              </p>
              <p>
                If installed, <code>tree</code> displays nested directories as
                an indented tree. Tab completion can finish a path: type
                <code> cd Doc</code> and press Tab to complete
                <code> Documents/</code>.
              </p>
            </section>
            <p className="lesson-takeaway">
              <strong>Practice on Linux:</strong> from home, reach
              <code> /var/log</code>, list its contents with details, return
              home using <code>cd</code>, then reach <code>/etc</code> using
              relative paths and <code>..</code>. The GitGoing simulator
              navigates courses rather than real directories.
            </p>
          </>
        ),
      },
    ],
  },
  3: {
    title: 'Working with files',
    pages: [
      {
        title: 'Create, inspect, and copy',
        content: (
          <>
            <p className="lesson-lead">
              Once you can navigate, the next step is working with files:
              create them, inspect their contents, and make deliberate copies.
            </p>
            <section className="lesson-topic">
              <h3>Create directories and files</h3>
              <ul>
                <li>
                  <code>mkdir projects</code> creates one directory.
                </li>
                <li>
                  <code>mkdir -p projects/2026/notes</code> creates nested
                  directories, including missing parents.
                </li>
                <li>
                  <code>touch notes.txt</code> creates an empty file, or updates
                  the timestamp if it already exists.
                </li>
              </ul>
            </section>
            <section className="lesson-topic">
              <h3>Choose a viewer for the file</h3>
              <ul>
                <li><code>cat file.txt</code> prints the whole file.</li>
                <li><code>less file.txt</code> pages through long content; press <code>q</code> to quit.</li>
                <li><code>head -n 5 file.txt</code> prints the first five lines.</li>
                <li><code>tail -n 5 file.txt</code> prints the last five lines.</li>
                <li><code>tail -f logfile</code> follows new log entries as they appear.</li>
              </ul>
            </section>
            <section className="lesson-topic">
              <h3>Copy without changing the source</h3>
              <p>
                <code>cp source.txt backup.txt</code> duplicates a file. To copy
                a directory and its contents, use the recursive option:
                <code> cp -r projects projects_backup</code>.
              </p>
            </section>
          </>
        ),
      },
      {
        title: 'Move, search, and edit safely',
        content: (
          <>
            <section className="lesson-topic">
              <h3>Move and rename</h3>
              <p>
                <code>mv old.txt new.txt</code> renames a file;
                <code> mv new.txt ~/Documents/</code> moves it to another
                directory. Check the destination carefully: moving a file onto
                an existing name can replace that file.
              </p>
            </section>
            <aside className="lesson-callout">
              <strong>Deletion has no recycle bin</strong>
              <p>
                <code>rm file.txt</code> removes a file; <code>rm -r folder</code>
                removes a directory and its contents. Use <code>rm -i</code>
                while learning and <code>rmdir</code> when you only need to
                remove an empty directory. Never run <code>rm -rf</code>
                without verifying the exact path and effect.
              </p>
            </aside>
            <section className="lesson-topic">
              <h3>Find names; search contents</h3>
              <p>
                <code>find ~/Documents -name "*.pdf"</code> searches for matching
                names. <code>grep "error" logfile.txt</code> searches inside a
                file; <code>grep -r "TODO" ~/projects</code> searches
                recursively. Add <code>-i</code> to ignore letter case.
              </p>
              <p>
                Wildcards match groups of names: <code>*</code> matches any
                number of characters, and <code>?</code> matches one character.
                For example, <code>ls *.txt</code> lists text files.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Quick edits and practice</h3>
              <p>
                <code>nano</code> is a straightforward terminal editor; its
                shortcuts appear on screen. <code>Ctrl+O</code> saves and
                <code> Ctrl+X</code> exits. Vim offers more power and a steeper
                learning curve.
              </p>
              <p className="lesson-takeaway">
                <strong>Practice on Linux:</strong> create a
                <code> sandbox</code> directory, make three text files, copy
                one, rename another, search their contents with
                <code> grep</code>, then remove the directory only after
                checking its path. The GitGoing simulator does not manipulate
                real files.
              </p>
            </section>
          </>
        ),
      },
    ],
  },
  4: {
    title: 'Users, permissions, and processes',
    pages: [
      {
        title: 'Read and change permissions',
        content: (
          <>
            <p className="lesson-lead">
              Linux is multi-user: files have owners, groups, and permissions
              that define who can read, change, or execute them.
            </p>
            <section className="lesson-topic">
              <h3>Decode an <code>ls -l</code> entry</h3>
              <pre><code>-rwxr-xr-- 1 alex staff 2048 Jan 5 10:12 script.sh</code></pre>
              <p>
                The first character identifies the type (<code>-</code> for a
                file, <code>d</code> for a directory). The next nine characters
                are permissions for owner, group, and others. Each group can
                have <code>r</code> (read), <code>w</code> (write), and
                <code>x</code> (execute). Here the owner has all three, the
                group can read and execute, and others can read.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Use symbolic or numeric <code>chmod</code></h3>
              <p>
                <code>chmod u+x script.sh</code> adds execute permission for the
                owner. Numeric permissions add read=4, write=2, and execute=1
                for each group:
              </p>
              <ul>
                <li><code>chmod 755 script.sh</code> → <code>rwxr-xr-x</code>.</li>
                <li><code>chmod 600 secret.txt</code> → owner read/write only.</li>
              </ul>
              <p>
                <code>chown user:group file</code> changes ownership and usually
                requires administrator privileges.
              </p>
            </section>
          </>
        ),
      },
      {
        title: 'Privilege and process control',
        content: (
          <>
            <section className="lesson-topic">
              <h3>Use administrator access deliberately</h3>
              <p>
                The root user can make system-wide changes. Rather than logging
                in as root, systems commonly use <code>sudo</code> to run one
                command with elevated privileges, for example
                <code> sudo apt update</code>. It can bypass safeguards, so
                verify the command and its arguments first.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Inspect and stop processes</h3>
              <p>
                Each running program is a process with a process ID (PID).
                <code> ps aux</code> lists processes;
                <code> top</code> or <code>htop</code> shows live resource use
                (<code>q</code> exits). <code>kill 1234</code> asks a process
                to stop; <code>kill -9 1234</code> forces termination and
                should be a last resort. <code>killall firefox</code> targets
                processes by name.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Foreground and background jobs</h3>
              <p>
                Add <code>&amp;</code> to start a command in the background:
                <code> sleep 60 &amp;</code>. Use <code>jobs</code> to list
                jobs and <code>fg</code> to bring one to the foreground.
                <code> Ctrl+Z</code> suspends the current foreground program;
                <code> bg</code> resumes it in the background.
              </p>
              <p>
                Useful system snapshots include <code>id</code> for user and
                groups, <code>df -h</code> for disk space,
                <code> free -h</code> for memory, and <code>uptime</code> for
                system uptime and load.
              </p>
            </section>
            <p className="lesson-takeaway">
              <strong>Practice on Linux:</strong> create a script, make it
              executable with <code>chmod</code>, and run it with
              <code> ./script.sh</code>. Start <code>sleep 300 &amp;</code>,
              find its PID with <code>ps</code>, and stop it with
              <code> kill</code>. The GitGoing simulator cannot launch system
              processes.
            </p>
          </>
        ),
      },
    ],
  },
  5: {
    title: 'Putting commands together',
    pages: [
      {
        title: 'Streams, redirection, and pipes',
        content: (
          <>
            <p className="lesson-lead">
              Small commands become useful tools when their input and output
              are connected. The shell provides the wiring.
            </p>
            <section className="lesson-topic">
              <h3>Three standard streams</h3>
              <ul>
                <li><code>stdin</code> — standard input.</li>
                <li><code>stdout</code> — normal output.</li>
                <li><code>stderr</code> — error output.</li>
              </ul>
              <p>
                By default, input comes from the keyboard and both output
                streams appear in the terminal. Redirection changes where those
                streams go.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Redirect streams</h3>
              <ul>
                <li><code>&gt;</code> writes output to a file, overwriting it: <code>ls &gt; files.txt</code>.</li>
                <li><code>&gt;&gt;</code> appends: <code>echo "done" &gt;&gt; log.txt</code>.</li>
                <li><code>&lt;</code> reads from a file: <code>sort &lt; names.txt</code>.</li>
                <li><code>2&gt;</code> redirects errors: <code>find / -name "x" 2&gt; errors.txt</code>.</li>
              </ul>
            </section>
            <section className="lesson-topic">
              <h3>Pipe output into another command</h3>
              <p>
                A pipe (<code>|</code>) connects one command’s
                <code> stdout</code> to the next command’s
                <code> stdin</code>. For example,
                <code> ls -l | less</code> pages through a long listing.
              </p>
              <pre><code>grep "404" access.log | wc -l</code></pre>
              <p>
                This pipeline keeps matching lines, then counts them. Each
                command has one job; the pipe connects their results.
              </p>
            </section>
          </>
        ),
      },
      {
        title: 'Build readable command pipelines',
        content: (
          <>
            <section className="lesson-topic">
              <h3>Pipeline building blocks</h3>
              <p>
                <code>sort</code> orders lines, <code>uniq</code> removes
                adjacent duplicates, and <code>wc</code> counts lines, words,
                or characters. Use <code>sort | uniq -c</code> to group and
                count repeated values. <code>cut</code> extracts fields;
                <code> tr</code> translates characters.
              </p>
              <pre><code>tr ' ' '\n' &lt; book.txt | sort | uniq -c | sort -nr | head -5</code></pre>
              <p>
                This example splits words onto separate lines, counts
                repetitions, sorts the counts in descending numeric order, and
                prints the first five results.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Chain commands by outcome</h3>
              <ul>
                <li><code>;</code> runs the next command regardless of success.</li>
                <li><code>&amp;&amp;</code> runs the next command only after success.</li>
                <li><code>||</code> runs the next command only after failure.</li>
              </ul>
              <p>
                For example, <code>mkdir backup &amp;&amp; cp *.txt backup/</code>
                attempts the copy only if directory creation succeeds.
              </p>
            </section>
            <section className="lesson-topic">
              <h3>Variables and scripts</h3>
              <p>
                Assign a shell variable with <code>name="Alex"</code> (no spaces
                around <code>=</code>) and reference it as <code>$name</code>.
                Command substitution captures output:
                <code> echo "Today is $(date)"</code>.
              </p>
              <p>
                Put repeated commands in a script, often beginning with
                <code> #!/bin/bash</code>, then make it executable and run it.
                <code> history</code> reviews past commands, and
                <code> alias ll='ls -la'</code> creates a shortcut.
              </p>
            </section>
            <p className="lesson-takeaway">
              <strong>Practice on Linux:</strong> list <code>/etc</code>,
              filter names ending in <code>.conf</code>, sort them, and save
              the first ten to <code>configs.txt</code>. One solution is
              <code> ls /etc | grep '\.conf$' | sort | head -10 &gt; configs.txt</code>.
              This filesystem exercise requires a real Linux environment, not
              the GitGoing course simulator.
            </p>
          </>
        ),
      },
    ],
  },
};

function parseLessonBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: 'code', content: codeLines.join('\n') });
      index += 1;
      continue;
    }

    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', content: heading[1] });
      index += 1;
      continue;
    }

    const listItem = line.match(/^([-*+]|\d+[.)])\s+(.+)$/);
    if (listItem) {
      const ordered = /^\d/.test(listItem[1]);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^([-*+]|\d+[.)])\s+(.+)$/);
        if (!item || /^\d/.test(item[1]) !== ordered) break;
        items.push(item[2]);
        index += 1;
      }
      blocks.push({ type: ordered ? 'ordered-list' : 'unordered-list', items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim()) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', content: paragraph.join(' ') });
  }

  return blocks;
}

function countWords(block) {
  const text = block.items ? block.items.join(' ') : block.content;
  return (text.match(/\b[\w'-]+\b/g) || []).length;
}

function splitLessonPages(blocks, pageCount = 3) {
  const wordTotals = [0];
  blocks.forEach((block) => {
    wordTotals.push(wordTotals[wordTotals.length - 1] + countWords(block));
  });
  const totalWords = wordTotals[wordTotals.length - 1];
  const pages = [];
  let start = 0;

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const pagesLeft = pageCount - pageIndex - 1;
    const maxEnd = blocks.length - pagesLeft;
    if (pagesLeft === 0) {
      pages.push(blocks.slice(start));
      break;
    }

    const targetWords = totalWords * ((pageIndex + 1) / pageCount);
    const candidates = [];
    for (let boundary = start + 1; boundary <= maxEnd; boundary += 1) {
      if (blocks[boundary - 1]?.type !== 'heading') candidates.push(boundary);
    }
    if (!candidates.length) candidates.push(maxEnd);
    const bestEnd = candidates.reduce((best, candidate) => (
      Math.abs(wordTotals[candidate] - targetWords) <
      Math.abs(wordTotals[best] - targetWords)
        ? candidate
        : best
    ), candidates[0]);

    pages.push(blocks.slice(start, bestEnd));
    start = bestEnd;
  }

  return pages;
}

function renderInlineMarkdown(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderLessonBlock(block, index, firstParagraph) {
  if (block.type === 'heading') {
    return <h3 key={index}>{renderInlineMarkdown(block.content)}</h3>;
  }
  if (block.type === 'code') {
    return <pre key={index}><code>{block.content}</code></pre>;
  }
  if (block.type === 'unordered-list' || block.type === 'ordered-list') {
    const List = block.type === 'ordered-list' ? 'ol' : 'ul';
    return (
      <List key={index}>
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
        ))}
      </List>
    );
  }
  return (
    <p className={firstParagraph ? 'lesson-lead' : undefined} key={index}>
      {renderInlineMarkdown(block.content)}
    </p>
  );
}

function createExpandedChapterOneLectures() {
  const headings = [...chapterOneText.matchAll(/^### Lecture \d+: (.+)$/gm)];
  const importantNotes = [
    [
      'Linux is the kernel; distributions package it with utilities and applications.',
      'The filesystem is one tree rooted at /; absolute paths start there.',
      'Use pwd, ls, and cd to locate, inspect, and navigate directories.',
      'Check the exact path before recursive deletion; rm -r can permanently remove data.',
    ],
    [
      'Permissions are grouped by owner, group, and others; r, w, and x have values 4, 2, and 1.',
      'A mode such as 755 means rwx for the owner and r-x for group and others.',
      'Pipes pass stdout to the next command as stdin; redirection sends streams elsewhere.',
      'Verify paths and targets before changing ownership with sudo.',
    ],
    [
      'A PID identifies a process; shell job numbers belong only to that shell session.',
      'kill normally requests a graceful stop; SIGKILL should be a last resort.',
      'Use df, du, free, and process tools to inspect different system resources.',
      'Inspect commands and targets before using sudo or destructive tools.',
    ],
  ];

  return Object.fromEntries(headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? chapterOneText.length;
    const lectureBlocks = parseLessonBlocks(chapterOneText.slice(start, end));
    const pages = splitLessonPages(lectureBlocks).map((pageBlocks, pageIndex) => {
      const pageStart = lectureBlocks.indexOf(pageBlocks[0]);
      const pageStartsWithHeading = pageBlocks[0]?.type === 'heading';
      const pageHeading = pageStartsWithHeading
        ? pageBlocks[0]
        : [...lectureBlocks.slice(0, pageStart)]
          .reverse()
          .find((block) => block.type === 'heading');
      const pageTitle = pageHeading
        ? pageHeading.content.replace(/[`*_]/g, '')
        : `Part ${pageIndex + 1}`;
      const visibleBlocks = pageStartsWithHeading ? pageBlocks.slice(1) : pageBlocks;
      const firstParagraph = visibleBlocks.findIndex((block) => block.type === 'paragraph');

      return {
        title: pageTitle,
        content: (
          <>
            {visibleBlocks.map((block, blockIndex) => renderLessonBlock(
              block,
              blockIndex,
              blockIndex === firstParagraph,
            ))}
            {pageIndex === 2 && (
              <aside className="lesson-callout">
                <strong>Important to remember</strong>
                <ul>
                  {importantNotes[index].map((note) => (
                    <li key={note}>{renderInlineMarkdown(note)}</li>
                  ))}
                </ul>
              </aside>
            )}
          </>
        ),
      };
    });

    return [
      index + 1,
      {
        title: heading[1].replace(/`/g, ''),
        pages,
      },
    ];
  }));
}

linuxLessons[1].lectures = createExpandedChapterOneLectures();

export default linuxLessons;

### Lecture 1: Terminal vs. Shell

#### Why this distinction matters

When people first meet Linux, they hear the words “terminal,” “shell,” “console,” “command line,” and “Bash” used almost interchangeably. In casual conversation that is fine, but if you want to understand what is happening when you type a command, you need to know that two separate programs are involved. One displays text and captures your keystrokes. The other understands your commands and gets things done. Keeping them apart in your mind will help you troubleshoot problems, customize your environment, and read documentation without confusion.

For example, if your text looks wrong, with strange colors or broken characters, that is usually a *terminal* issue. If a command behaves differently from what a tutorial describes, or a script fails on one machine but not another, that is often a *shell* issue. Knowing which layer to blame saves a lot of time.

#### A short history

The word “terminal” goes back to the early days of computing. Computers were enormous, expensive machines, and many people shared one. Each person sat at a physical device called a **terminal**, a keyboard paired with a printer or, later, a screen, connected to the central computer by a cable. Early examples were *teletypewriters* (TTYs), machines originally designed to send telegrams. You typed, the computer responded, and the answer was printed on paper. Later, video terminals like the famous DEC VT100 replaced paper with a glowing screen and became the standard for decades.

These devices were “dumb.” They had no processing power of their own. They simply sent whatever you typed to the computer and displayed whatever the computer sent back. This is the key idea that survives today: **a terminal is an input/output device for text.**

Meanwhile, the software that interpreted your typing on the central computer evolved too. The first Unix shell, written by Ken Thompson in the early 1970s, was a program that read lines of text, treated each as a request to run another program, and printed the results. The name “shell” reflects its position: it is an outer layer wrapped around the **kernel**, the core of the operating system. You cannot talk to the kernel directly, so the shell acts as your interface to it.

#### What a terminal emulator is

Modern computers do not have physical terminals attached to them. Instead, you use a **terminal emulator**, a graphical program that *imitates* those old devices inside a window. When people say “open a terminal,” this is what they mean.

Popular terminal emulators include:

- **GNOME Terminal**, the default on Ubuntu and many other distributions
- **Konsole**, used with the KDE desktop
- **xterm**, one of the oldest, still found everywhere
- **Alacritty, Kitty, and WezTerm**, modern, GPU-accelerated options
- **The integrated terminal in VS Code**, which lives inside your code editor

The terminal emulator does only a few things. It draws characters on the screen, handles fonts and colors, manages scrolling and copy-and-paste, and sends your keystrokes to whatever program is running inside it. It does not understand `ls` or `cd`. If you started a terminal with nothing inside it, you would see a blank window that does nothing.

You will also see the term **console** or **TTY**. On a Linux machine you can press Ctrl+Alt+F3 (or another function key) to switch to a full-screen text console that is not running in a graphical window at all. Servers often work this way. The idea is the same: text in, text out.

#### What a shell is

The **shell** is a program that runs *inside* the terminal. Its job is to repeat a simple cycle, often called the **read-eval-print loop**:

1. Display a prompt and wait for you.
2. Read the line you typed.
3. Interpret it, which means figuring out which program to run and with what arguments.
4. Ask the operating system to run that program.
5. Display the results, then return to step 1.

The shell is both a **command interpreter** and a **programming language**. Interactively, you use it to run commands one at a time. You can also write sequences of commands into a file, which is called a **shell script**, and the shell will run them automatically. Scripts include variables, conditionals, loops, and functions, so the shell can automate almost any routine task.

#### The chain from you to the hardware

It helps to picture the layers involved:

```
You → Terminal emulator → Shell → Kernel → Hardware
```

You press a key. The terminal emulator captures it and passes it to the shell. The shell interprets your command and asks the kernel to run a program. The kernel manages the CPU, memory, disk, and network on that program’s behalf. Results flow back up the chain to your screen.

Notice that the shell never touches the hardware directly. Neither does any normal program. Everything goes through the kernel, which enforces rules about who may do what. This design is what makes Linux stable and secure.

#### What happens when you press Enter

Let’s follow a simple command, `ls -l /etc`, to see how the shell handles it.

**Parsing.** The shell splits the line into words: `ls`, `-l`, and `/etc`. The first word is treated as the command, and the rest are arguments.

**Expansion.** Before running anything, the shell performs substitutions. Wildcards like `*.txt` are replaced with matching file names. Variables like `$HOME` are replaced with their values. The tilde `~` becomes your home directory path. This is a crucial point: *the shell*, not the command, expands wildcards. The `ls` program never sees the asterisk.

**Finding the program.** The shell needs to locate `ls`. It first checks whether it is a built-in command (one the shell implements itself, like `cd`). If not, it searches a list of directories stored in the `PATH` variable. You can see this list with `echo $PATH`. The directories are searched in order, and the first match wins. You can discover where a command lives with `which ls` or `type ls`.

**Launching.** The shell asks the kernel to create a new process and load the `ls` program into it. The shell then waits for it to finish.

**Returning.** When the program ends, it returns an **exit status**, a number where 0 means success and anything else indicates a problem. You can see it with `echo $?`. The shell then shows a new prompt.

This process happens in milliseconds, but understanding it explains many behaviors that otherwise seem mysterious.

#### The shell family

Many shells exist, and they differ in features, convenience, and scripting syntax.

**sh (the Bourne shell).** The original, from 1979. Modern systems provide a compatible `sh`, often a lightweight program called **dash** on Debian and Ubuntu. Scripts meant to run everywhere are written for `sh` because it is guaranteed to exist.

**Bash (Bourne Again Shell).** Created for the GNU project, Bash adds command history, tab completion, arrays, and many conveniences to the Bourne shell. It is the default on most Linux distributions, and it is the shell this course teaches. Most online tutorials assume Bash.

**Zsh.** A powerful shell with advanced completion, spelling correction, and a huge ecosystem of themes and plugins, such as Oh My Zsh. Apple made it the default on macOS.

**Fish.** The “friendly interactive shell.” It offers syntax highlighting and suggestions as you type, with no configuration. Its scripting syntax is deliberately different from Bash, so scripts are not always portable.

**ksh and tcsh.** Older shells you may meet on legacy Unix systems.

Most beginner-level commands work identically across them. The differences become noticeable when writing scripts or customizing your environment.

#### Finding out which shell you use

Run:

```
echo $SHELL
```

This prints the path to your default login shell, for example `/bin/bash`. To see the shell you are *currently* running, which might differ if you started another one by hand, use:

```
echo $0
```

You can list the shells installed on your system with `cat /etc/shells`. To change your default, use `chsh -s /bin/zsh`, then log out and back in.

Because the terminal and the shell are independent, you can start a different shell inside your existing terminal at any time simply by typing its name, such as `zsh`. Type `exit` to leave it and return to the previous one. Likewise, you can use any terminal emulator with any shell.

#### Understanding the prompt

When the shell is ready for input, it displays a **prompt**. A typical Bash prompt looks like this:

```
alex@laptop:~$
```

Each part carries information:

- `alex` is your **username**.
- `laptop` is the **hostname**, the computer’s name. This matters when you connect to remote servers, because the prompt reminds you which machine you are on.
- `~` is your **current directory**. The tilde is shorthand for your home directory. If you were in `/etc`, it would show `/etc`.
- `$` indicates a **regular user**. If you are logged in as root, the symbol is `#`.

That last symbol deserves respect. The root user can modify or delete any file on the system, and the shell will not stop them. Experienced administrators avoid working as root, and they use `sudo` for individual commands instead.

The prompt is controlled by a variable called `PS1`, and you can customize it. Many people add colors, the current Git branch, or the time. For now, just learn to read it. Glancing at your prompt before pressing Enter should become a reflex, especially when working over a remote connection.

#### Interactive, login, and non-login shells

You may eventually encounter these terms. An **interactive shell** is one where you type commands. A **non-interactive shell** runs a script. A **login shell** starts when you log in (on a text console, or over SSH), whereas a **non-login shell** is what you get when you open a terminal window inside an already-running desktop session.

The distinction matters for **configuration files**. Bash reads `~/.bashrc` for most interactive sessions and `~/.profile` or `~/.bash_profile` for login shells. If you want to add an alias or change your prompt, `~/.bashrc` is usually the right place. For now, it is enough to know that these files exist and that the shell reads them every time it starts.

#### Why use the command line at all?

With graphical tools available, why learn this? There are several strong reasons.

**Speed and precision.** Renaming a thousand files by clicking is painful. In the shell it is a single line.

**Automation.** Anything you can type, you can save in a script and repeat endlessly, schedule to run overnight, or share with colleagues.

**Composability.** Linux tools are small and focused, and the shell lets you connect them together. You will learn this in a later chapter.

**Remote work.** Servers, cloud instances, containers, and embedded devices often have no graphical interface. Connecting through SSH gives you a shell and nothing else.

**Reproducibility.** A command can be copied into documentation, a bug report, or a chat message. “Click the third menu, then...” is much harder to share than a line of text.

**Universality.** Core commands have barely changed in decades. What you learn today will serve you on almost any Unix-like system, including macOS and many network devices.

#### Common misconceptions

**“The terminal is where commands run.”** Not exactly. The terminal displays them. The programs run under the shell’s request, managed by the kernel.

**“Bash is Linux.”** Bash is simply a program. Linux is the kernel. Together with other software, they form a complete operating system, but you can replace Bash without touching Linux.

**“The command line is only for experts.”** It is a skill like any other. Starting with a handful of commands and building gradually is how everyone learns it.

**“I might break something.”** As a normal user, you can only damage your own files. The system protects itself with permissions. Just be careful with `sudo` and with deletion commands, which you will meet in later chapters.

#### Key takeaways

- The **terminal** (emulator) is a window that displays text and relays keystrokes. The **shell** is the program inside it that interprets and runs your commands.
- The shell sits between you and the **kernel**, which controls the hardware.
- **Bash** is the most common Linux shell; Zsh, Fish, and sh are alternatives.
- The shell parses your line, expands wildcards and variables, finds the program through `PATH`, and launches it.
- The **prompt** tells you your username, hostname, current directory, and privilege level (`$` for users, `#` for root).
- The command line is valuable for speed, automation, remote access, and reproducibility.

#### Try it yourself

1. Open your terminal and run `echo $SHELL` and `echo $0`. Do they match?
2. Run `cat /etc/shells` to see which shells your system offers.
3. Identify each part of your prompt: username, hostname, directory, and symbol.
4. Run `echo $PATH` and count how many directories are listed.
5. Run `type cd` and `type ls`. How do the results differ, and what does that tell you about built-in commands?

---

### Lecture 2: Run Your First Commands

#### Getting comfortable

Reading about the command line only gets you so far. The skill comes from typing commands, seeing what happens, and making mistakes in a safe environment. This lecture walks you through your first commands, explains the structure behind them, and introduces the habits that make working in the shell fast and comfortable. Keep a terminal open and try everything as you read.

Don’t be nervous. Every command here is harmless. At worst, you will see an error message, and error messages are your teachers.

#### The anatomy of a command

Every command line follows the same general pattern:

```
command [options] [arguments]
```

The **command** is the name of the program you want to run. **Options**, also called **flags** or **switches**, adjust how it behaves. **Arguments** specify what the command should act upon, such as a file, a directory, or a piece of text. Words are separated by spaces, and you run the line by pressing **Enter**.

Consider:

```
ls -l /etc
```

Here `ls` is the command (list directory contents), `-l` is an option (use long format), and `/etc` is an argument (the directory to list). Change any part and the result changes. Remove the argument and `ls` lists the current directory. Remove the option and you get a plain, short list.

Some commands need no options or arguments. Others require arguments and will complain if you omit them. There is no universal rule, which is why documentation, covered in the next lecture, is so important.

Spaces matter. The shell uses them to separate words, so `ls -l` is two words, while `ls-l` is one unknown word. If you need a space *inside* an argument, such as in a text message or file name, put it in quotes: `echo "hello there"`.

#### Your first commands

Let’s start with commands that need nothing more than their name.

**whoami**

```
whoami
```

Prints the username of the account you are using. It seems trivial, but when you work on several machines or switch between users, it is a quick sanity check.

**date**

```
date
```

Shows the current date and time as the system understands them. You can also format the output: `date +%Y-%m-%d` prints something like `2026-10-12`, which is useful for naming backup files.

**hostname**

```
hostname
```

Displays the name of the computer.

**pwd**

```
pwd
```

Stands for *print working directory*. It shows your current location in the filesystem, for example `/home/alex`. You always have a current directory, and many commands act relative to it. When you first open a terminal, you start in your home directory.

**echo**

```
echo "Hello, Linux!"
```

Prints its arguments back to the screen. It sounds pointless, but `echo` is a workhorse in scripts, and it is a perfect way to experiment. Try `echo $HOME` to see how the shell replaces `$HOME` with the path of your home directory before `echo` even runs.

**uname**

```
uname -a
```

Prints information about the system, including the kernel name and version. This is the first command people run when asked “what system are you on?”

**uptime**

```
uptime
```

Shows how long the machine has been running and how busy it has been recently.

#### Meeting options

Now let’s see options in action with `ls`, the command you will use more than any other.

```
ls
```

Lists the files and directories in your current directory. By default you see names only, in columns, and hidden items are skipped.

```
ls -l
```

The **long format**. Each line shows permissions, number of links, owner, group, size in bytes, modification date, and name. You will learn to read this in a later chapter.

```
ls -a
```

Shows **all** files, including hidden ones. In Linux, any file or directory whose name begins with a dot is hidden. You will see `.` and `..` (the current and parent directories) and probably files such as `.bashrc`.

```
ls -lh
```

Combines long format with **human-readable** sizes, so you see `4.2M` instead of `4400000`.

```
ls -la
```

Long format *and* hidden files. Single-letter options can be bundled after one dash, so `-la` means the same as `-l -a`. The order of the letters usually does not matter.

Many options also have a **long form** that begins with two dashes, such as `ls --all` or `ls --human-readable`. Long options are longer to type but easier to read, which makes them great in scripts where clarity matters. Single-dash options are faster for everyday typing.

Other helpful `ls` variants include `ls -t` (sort by modification time, newest first), `ls -r` (reverse order), and `ls -R` (list subdirectories recursively).

#### Reading and understanding errors

Try typing something wrong:

```
Date
```

You will see:

```
bash: Date: command not found
```

Linux is **case-sensitive**. `date` and `Date` are different names, and only the first exists. The same applies to files: `Notes.txt`, `notes.txt`, and `NOTES.TXT` are three different files. This catches many newcomers who come from Windows or macOS, where file names are usually case-insensitive.

Other common messages include:

- `No such file or directory`: the path is wrong or the file doesn’t exist. Check spelling, and use `pwd` and `ls` to confirm where you are.
- `Permission denied`: you are not allowed to do that. This is the system protecting itself, and you’ll learn about permissions soon.
- `invalid option -- 'z'`: you gave the command an option it doesn’t understand.
- `missing operand`: the command needs an argument you did not provide.

Read the message carefully. In most cases it tells you precisely what went wrong. Resist the urge to retype the same line hoping for a different result.

#### Silence means success

A distinctive trait of Unix-style commands: **when everything works, they often say nothing**. If you create a directory with `mkdir test` and the prompt simply returns, the command succeeded. Output usually appears only when there is something to report or something has gone wrong. This feels strange at first, but it keeps pipelines and scripts clean, because success does not clutter the output.

#### Productivity shortcuts

Typing every command in full would be tedious. The shell provides a set of shortcuts that experienced users rely on constantly. Learn these early, and the terminal will feel dramatically faster.

**Tab completion.** Type the first few letters of a command or file name and press **Tab**. The shell completes it if the match is unique. If there are several possibilities, press Tab twice to list them. This reduces typos and keystrokes at once. If Tab does nothing, there is either no match or it is ambiguous, and you need to type a bit more.

**Command history.** Press the **Up arrow** to recall previous commands, and **Down** to move forward again. Type `history` to see a numbered list. You can rerun item 42 with `!42`, and `!!` repeats your last command. A common use: you forget `sudo`, so you type `sudo !!`.

**Reverse search.** Press **Ctrl+R**, then start typing part of an old command. The shell finds the most recent match. Press Ctrl+R again to cycle backward, Enter to run it, or the arrow keys to edit it first.

**Editing the line.** You don’t have to retype everything to fix a typo:

- **Ctrl+A** moves to the start of the line.
- **Ctrl+E** moves to the end.
- **Alt+B / Alt+F** move back or forward one word.
- **Ctrl+U** deletes from the cursor to the start of the line.
- **Ctrl+K** deletes from the cursor to the end.
- **Ctrl+W** deletes the previous word.

**Controlling programs.**

- **Ctrl+C** interrupts (stops) the running command. It is your emergency brake.
- **Ctrl+D** signals end of input; on an empty prompt it closes the shell.
- **Ctrl+L** clears the screen, same as the `clear` command.
- **Ctrl+Z** suspends the current program (covered in a later chapter).

**Copy and paste.** In many terminals, plain Ctrl+C is reserved for interruption, so copy and paste use **Ctrl+Shift+C** and **Ctrl+Shift+V**. Selecting text with the mouse and middle-clicking also pastes on many Linux desktops.

#### Running more than one command

You can place several commands on one line separated by a semicolon:

```
date; whoami; pwd
```

They run one after another. A later chapter will show how to run commands conditionally and connect them with pipes.

If a command is very long, you can break it across lines by ending a line with a backslash `\` and continuing on the next line. This is mostly seen in tutorials and scripts for readability.

#### Habits for staying safe

The shell trusts you completely. It will not ask “Are you sure?” for most actions. A few habits will protect you:

1. **Read before you press Enter.** Especially with commands that delete or overwrite data.
2. **Be careful copying commands from the internet.** Understand what a command does before pasting it, and be especially wary of anything containing `sudo` or `rm`.
3. **Check where you are.** Run `pwd` or glance at your prompt before changing things.
4. **Experiment in a scratch area.** Create a directory like `~/sandbox` and practice there.
5. **Don’t use root casually.** A normal user account limits the damage of a mistake.

#### Putting it all together: a short session

Here is what a first session might look like:

```
alex@laptop:~$ whoami
alex
alex@laptop:~$ pwd
/home/alex
alex@laptop:~$ date
Mon Oct 12 10:30:12 EEST 2026
alex@laptop:~$ echo "I am learning Linux"
I am learning Linux
alex@laptop:~$ ls -la
```

Each command is small, but together they give you your identity, your location, the time, and a look at your files. This is the foundation on which everything else is built.

#### Key takeaways

- Commands follow the pattern `command [options] [arguments]`, with spaces separating the words.
- Short options use one dash and can be bundled (`-la`); long options use two dashes (`--all`).
- Starter commands: `whoami`, `date`, `pwd`, `echo`, `hostname`, `uname`, `ls`.
- Everything is **case-sensitive**.
- Error messages are informative; read them closely.
- Silence usually means success.
- **Tab**, **Up arrow**, **Ctrl+R**, and **Ctrl+C** are the shortcuts that will save you the most time.

#### Try it yourself

1. Run `whoami`, `hostname`, `date`, and `pwd`. Write down the results.
2. Use `echo` to print your name, then `echo $HOME` to print your home directory.
3. Run `ls`, then `ls -l`, then `ls -la`. Which hidden files can you find?
4. Deliberately type `Date` and `lss`. Compare the error messages.
5. Use the Up arrow to recall `ls -la`, then use Ctrl+A to jump to the start of the line and add `echo "files:";` before it.
6. Use Ctrl+R to find an earlier `echo` command without retyping it.

---

### Lecture 3: Get Help with `man` and `--help`

#### Finding answers is the real skill

No one remembers every Linux command, and no one is expected to. There are thousands of commands, and many have dozens of options. What separates a confident user from a frustrated one is not memory but the ability to **find the answer quickly**. Fortunately, Linux ships with outstanding built-in documentation, available offline, matching exactly the version of the software installed on your machine. This lecture teaches you to use it.

There are two main tools: `--help` for quick reminders and `man` for the complete reference. We will also look at ways to search when you don’t know a command’s name, how to read the special notation that documentation uses, and what to do for commands that have no manual page.

#### Quick help with `--help`

Most commands accept a `--help` option that prints a concise summary of how to use them:

```
ls --help
cp --help
mkdir --help
```

The output typically includes a usage line, a short description, and a list of options with one-line explanations. This is ideal when you know roughly what you want and need a reminder. Is the recursive flag for `cp` `-r` or `-R`? A quick `cp --help` settles it in seconds.

Because the output can be longer than your screen, you may see the top scroll away. Pipe it into `less` to read it page by page:

```
ls --help | less
```

The `|` symbol (a pipe) sends the output of one command into the next. Here, it feeds the help text into `less`, a viewer that lets you scroll. Use the arrow keys or Space to move, and press **q** to quit. You can also use `head` to see only the beginning: `ls --help | head -20`.

A few notes about `--help`:

- It is not part of any strict standard, so some commands use `-h` or `-?` instead, and some print help if you run them with no arguments.
- Be careful with `-h`: in many commands, such as `ls` or `df`, it means “human-readable,” not “help.” That is why `--help` is the safer habit.
- Some commands send help to the error stream, so if piping seems not to work, try `command --help 2>&1 | less`. You will understand this notation after the chapter on redirection.

#### The manual pages: `man`

For the full story, use `man`, short for **manual**:

```
man ls
```

This opens the manual page for `ls` in a pager, the same type of viewer as `less`. Manual pages exist for most commands, many system calls, configuration files, and more. They have been a cornerstone of Unix since the 1970s.

**Navigating a man page:**

- **Space** or **Page Down**: forward one screen
- **b** or **Page Up**: back one screen
- **Down / Up arrows** or **j / k**: line by line
- **g** and **G**: jump to the beginning or end
- **/pattern**: search forward for “pattern”
- **n**: next match; **N**: previous match
- **?pattern**: search backward
- **h**: show help for the pager itself
- **q**: quit

Searching is the feature you will use most. Suppose you are reading `man ls` and want to know about sorting by size. Type `/size` and press Enter. The pager jumps to the first occurrence, and pressing `n` takes you through the rest.

#### The structure of a man page

Manual pages follow a standard layout, so once you learn it you can read any page efficiently:

- **NAME**: the command name and a one-line description.
- **SYNOPSIS**: a compact summary of how to invoke it.
- **DESCRIPTION**: what the command does, in more detail, often with the options listed.
- **OPTIONS**: each flag, explained. Sometimes this is part of the description.
- **EXIT STATUS**: what return codes mean.
- **EXAMPLES**: sample usage, when provided.
- **FILES**: related configuration files.
- **SEE ALSO**: related commands and pages.
- **AUTHOR / BUGS**: credits and known issues.

You rarely need to read a page from top to bottom. Typically, you scan the SYNOPSIS, jump to the option you care about with `/`, and read that part.

#### Reading the synopsis notation

The SYNOPSIS section uses a compact notation that looks cryptic at first. Here are the conventions:

- **Square brackets `[ ]`** mean the item is optional.
- **Ellipsis `...`** means the preceding item can be repeated.
- **Vertical bar `|`** means “or”: choose one of the alternatives.
- **Bold text** is typed literally, exactly as shown.
- **Underlined or italic text** is a placeholder you replace with your own value, such as a file name.

Take this line from the `cp` manual:

```
cp [OPTION]... SOURCE... DIRECTORY
```

It reads: the command `cp`, then optionally any number of options, then one or more sources, then a destination directory. And `cp [OPTION]... -t DIRECTORY SOURCE...` shows an alternative form where the destination is given by the `-t` option.

Consider another:

```
ls [OPTION]... [FILE]...
```

Everything after `ls` is optional, which is why plain `ls` works. If you give files, you can give more than one.

Once you internalize these symbols, you can understand how to use a command you have never seen before.

#### Manual sections

The manual is divided into numbered **sections**. The most important are:

1. **User commands**: programs you run, like `ls` and `cp`
2. **System calls**: functions provided by the kernel
3. **Library functions**: C library documentation
4. **Special files**: devices, usually in `/dev`
5. **File formats and configuration**: for example `passwd` and `fstab`
6. **Games**
7. **Miscellaneous**: overviews and conventions
8. **System administration commands**: usually for root

Sometimes the same name appears in multiple sections. For example, `passwd` is both a command (section 1) and a file format (section 5). By default, `man passwd` shows the lowest-numbered section. To see the other, specify the section number:

```
man 5 passwd
```

You will see references like `passwd(5)` in the SEE ALSO part of pages. That number tells you which section to request.

#### Searching when you don’t know the name

What if you know *what* you want to do but not which command does it? Linux has tools for that.

```
man -k "copy files"
apropos copy
```

Both search the one-line descriptions of all installed manual pages for a keyword. `apropos` is simply another name for `man -k`. Try `apropos disk` or `apropos "list directory"` and see what appears. The results show command names with their section numbers and short descriptions. If results are too numerous, narrow down with a more specific word, or filter with `grep`: `apropos compress | grep -i zip`.

If you do know the command and only need a one-line reminder of its purpose, use:

```
whatis ls
```

If these searches return nothing, the manual database might need updating. On many systems, `sudo mandb` rebuilds it.

#### Help for shell built-ins

Some commands, like `cd`, are not separate programs but are built into the shell itself. They often have no individual manual page, and `man cd` may fail or show a generic page. For built-ins in Bash, use `help`:

```
help cd
help
```

The second command lists all built-ins. To find out how a name is classified, use `type`:

```
type cd     # cd is a shell builtin
type ls     # ls is /usr/bin/ls
type ll     # ll is aliased to 'ls -alF'
```

Knowing whether something is a built-in, an external program, or an alias often explains unexpected behavior. For a deeper look at Bash itself, `man bash` is long but comprehensive.

#### Other sources of documentation

**info.** The GNU project maintains `info` pages, which are more detailed and hyperlinked than man pages. Try `info coreutils` for the manual covering `ls`, `cp`, `mv`, and many other core tools. The navigation keys differ: use **n** and **p** for next and previous nodes and **q** to quit.

**/usr/share/doc.** Many packages store extra documentation, README files, and examples here. Browse with `ls /usr/share/doc`.

**tldr.** Man pages are complete but dense. The community project **tldr** provides short pages made of practical examples. If available through your package manager, `tldr tar` shows the most common ways to use `tar` in just a few lines. It complements the manual rather than replacing it.

**The web.** Search engines, forums, and Q&A sites can be extremely helpful, especially for an error message. Copy the exact message (without personal details) and search for it. However, treat online answers critically: commands may be outdated, written for another distribution, or unsafe. Always cross-check with your local `man` page, which describes *your* version.

#### A workflow for solving problems

Here is a reliable approach when you are stuck:

1. **Identify the goal**: what are you trying to accomplish?
2. **Find the command**: use `apropos keyword` if you don’t know it.
3. **Check the basics**: run `command --help` for a quick overview.
4. **Dig deeper**: open `man command`, read the SYNOPSIS, and search for the relevant option with `/`.
5. **Test safely**: try your command on dummy files before using it on important data.
6. **Read errors**: if it fails, the message usually points to the fix.
7. **Look online** only if the local docs don’t answer it, and verify what you find.

This habit will serve you for as long as you use Linux. Even experts consult manual pages every day.

#### A worked example

Suppose you want to see file sizes in a friendly format, biggest files first. You already know `ls`. Run `ls --help | less` and search with `/sort`. You find `-S` sorts by file size, largest first. Search for `/human` and you find `-h`. Combine them:

```
ls -lhS
```

You have just solved a real problem without any outside help, using only the documentation already on your computer. That is exactly the workflow you will use throughout this course.

#### Key takeaways

- `command --help` gives a quick summary; pipe it to `less` if it’s long.
- `man command` opens the complete manual. Use **/** to search, **n** for the next match, and **q** to quit.
- Man pages share a structure: NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES, SEE ALSO.
- In the synopsis, `[ ]` means optional, `...` means repeatable, and `|` means “or”.
- Use `man -k`, `apropos`, and `whatis` when you don’t know the command name.
- Built-ins like `cd` are documented with `help`; use `type` to see what a name really is.
- Learning to read documentation matters more than memorizing options.

#### Try it yourself

1. Run `ls --help | less` and find the option that sorts by modification time. Test it.
2. Open `man echo` and find what `-n` and `-e` do. Try each one.
3. Use `/` inside `man ls` to find the option that prints sizes in human-readable form.
4. Run `apropos "disk usage"` and identify a command that reports disk space. Then look at its manual page.
5. Run `type cd`, `type ls`, and `type echo`. Which are built-ins, and which are programs?
6. Read the synopsis of `man mkdir`. In your own words, explain what each bracketed part means.
7. Run `man 5 passwd` and compare it to `man passwd`. Why are they different?

### Lecture 1: Linux Architecture, Filesystem Hierarchy and Navigation

#### Linux in context

Linux is a free, open-source, Unix-like kernel first released by Linus Torvalds on September 17, 1991. In everyday usage, “Linux” often means a complete operating system distribution built around that kernel. Linux-based systems power embedded devices, Android phones, cloud infrastructure, database servers and supercomputers.

The kernel is the core that coordinates hardware and system resources. A Linux distribution combines the kernel with system utilities, libraries, package management and applications to provide a usable operating system.

#### The layers of a Linux system

1. **User and application space** is where people interact with web browsers, editors, development environments and terminal emulators.
2. **The shell** is a command-line interpreter. It reads commands typed by a user or stored in a script, interprets them and starts programs. Bash is common on Linux, Zsh is popular on macOS and customized Linux systems, and Fish emphasizes interactive usability.
3. **The kernel** manages processes, memory, device drivers, system calls and filesystem operations.
4. **Hardware** includes the CPU, memory, storage and network devices managed by the kernel.

The shell is one interface to the operating system, not the kernel itself. Applications can also request operating-system services through system libraries and system calls.

#### One filesystem tree

Unlike Windows drive letters such as `C:\` and `D:\`, Linux presents files and directories in one tree that begins at the root directory, written `/`. Disks and other filesystems are attached, or mounted, at locations within this tree.

Common directories include:

- `/` — the root of the entire directory tree.
- `/bin` — essential command binaries; on many modern distributions this is linked into `/usr/bin`.
- `/boot` — files used during startup, such as the kernel and bootloader files.
- `/dev` — device interfaces represented as files.
- `/etc` — system-wide configuration.
- `/home` — personal directories for standard users, such as `/home/student`.
- `/root` — the root account’s home directory.
- `/lib` — essential shared libraries; often linked into `/usr/lib` on modern distributions.
- `/media` — common mount point for removable media.
- `/mnt` — a location often used for manually mounted filesystems.
- `/opt` — optional add-on software.
- `/proc` — a virtual filesystem exposing process and kernel information.
- `/tmp` — temporary files; cleanup behavior depends on the system.
- `/usr` — many user applications, utilities, libraries and documentation.
- `/var` — changing data such as logs in `/var/log`.

The exact layout can vary between distributions. The important idea is that paths belong to one tree, even when their storage comes from different devices.

#### Find your location and move around

`pwd` prints the absolute path of your current working directory:

```sh
pwd
/home/student
```

`cd` changes the working directory. Paths beginning with `/` are absolute; other paths are interpreted relative to the current directory.

```sh
cd /var/log
cd ..
cd ~
cd -
```

`cd ..` moves to the parent directory, `cd ~` returns to the current user’s home, and `cd -` switches to the previous directory. Running `cd` without an argument also returns home.

#### List directory contents

`ls` lists files and directories. Options change the format and which entries appear:

```sh
ls
ls -l
ls -a
ls -lh
```

`-l` shows a detailed listing, `-a` includes hidden names beginning with `.`, and `-h` uses readable size units when combined with a size display such as `-l`. Options can be combined, as in `ls -lah`.

#### Create and manage files

Use `mkdir` to create directories. The `-p` option creates any missing parent directories:

```sh
mkdir projects
mkdir -p webapp/src/components
```

`touch` creates an empty file if it does not exist, or updates its timestamp if it already exists:

```sh
touch index.html
```

`cp` copies files; use a recursive option when copying directories:

```sh
cp file1.txt file2.txt
cp -r folder1/ folder2/
```

`mv` moves a path or renames it:

```sh
mv old_name.txt new_name.txt
mv file.txt /tmp/
```

`rm` removes files. Removing directories and their contents requires a recursive option:

```sh
rm file.txt
rm -r foldername/
```

Recursive deletion is permanent on many systems. Avoid using `rm -rf` casually: it suppresses prompts and recursively removes the specified path. Check `pwd` and the full target before any destructive command, and practice in a scratch directory.

#### Read file contents

- `cat file.txt` prints a file’s contents.
- `less file.txt` opens a paginated viewer; press `q` to quit and `/` to search.
- `head -n 20 file.txt` prints the first 20 lines.
- `tail -n 20 file.txt` prints the last 20 lines.
- `tail -f logfile` follows new lines as they are appended. Access to system logs may require elevated permissions, and log paths vary by distribution.

#### Practice

In a real Linux environment, run `pwd`, list the current directory with `ls -lah`, navigate to `/var/log` with an absolute path, then return home with `cd ~`. In a scratch directory, create a nested directory with `mkdir -p`, create a file with `touch`, copy it, rename the copy, and inspect the results. The GitGoing terminal is a learning simulator and does not execute these system commands.

### Lecture 2: Permissions, Ownership, Pipes and Text Processing

#### Users, ownership and permissions

Linux is a multi-user system. Files and directories have an owner and a group, with permission rules that determine what the owner, group members and other users may do.

Run `ls -l` to inspect a path:

```text
-rw-r--r-- 1 student users 1024 Oct 12 10:00 notes.txt
```

The permission string `-rw-r--r--` has ten positions. The first identifies the file type: `-` is a regular file, `d` a directory and `l` a symbolic link. The next nine positions are three permission groups:

- Characters 2–4: owner permissions, here `rw-` (read and write).
- Characters 5–7: group permissions, here `r--` (read only).
- Characters 8–10: permissions for others, here `r--` (read only).

#### What read, write and execute mean

- **Read (`r`, value 4):** read a file’s contents, or list a directory’s names.
- **Write (`w`, value 2):** change a file, or create and remove entries in a directory.
- **Execute (`x`, value 1):** run an executable file, or traverse a directory in a path.

Directory permissions have a specific effect: being able to list names requires read permission, while accessing entries by name requires execute permission. Write permission on a directory controls creating, renaming and removing entries, subject to other restrictions.

#### Numeric permissions and `chmod`

Numeric modes add the values for each permission: `7` means read, write and execute; `6` means read and write; `5` means read and execute; `4` means read only. A three-digit mode sets permissions for owner, group and others respectively.

```sh
chmod 755 script.sh
chmod 600 secrets.txt
```

`755` gives the owner `rwx` and group/others `r-x`. `600` gives the owner `rw-` and no permissions to group or others.

Symbolic modes can express a targeted change:

```sh
chmod u+x script.sh
chmod g-w file.txt
chmod o=r file.txt
```

These add execute for the owner, remove group write, and set others’ permissions to read-only.

#### Change ownership

`chown` changes a file’s owner and optionally its group. It commonly requires administrator privileges:

```sh
sudo chown alice file.txt
sudo chown alice:developers file.txt
sudo chown -R alice:developers /var/www/html
```

The recursive form affects the target directory and its contents. Verify the path and intended owner before running it, especially with `sudo`.

#### Standard streams, redirection and pipes

Programs conventionally use three streams:

1. **Standard input (`stdin`, descriptor 0):** input to a program, often from the keyboard.
2. **Standard output (`stdout`, descriptor 1):** normal program output, often displayed in the terminal.
3. **Standard error (`stderr`, descriptor 2):** diagnostic and error output, also often displayed in the terminal.

Redirection changes where a stream comes from or goes:

```sh
echo "Hello Linux" > output.txt
echo "New line" >> output.txt
sort < unsorted_list.txt
ls /nonexistent 2> error.log
command &> full_output.log
```

`>` overwrites a destination file with standard output; `>>` appends. `<` supplies a file as standard input. `2>` redirects standard error. In Bash, `&>` redirects both standard output and standard error.

A pipe (`|`) connects the standard output of the command on its left to the standard input of the command on its right:

```sh
ls -la /etc | less
grep "Failed password" /var/log/auth.log | wc -l
```

The first example pages through a directory listing. The second filters matching log lines and counts them. Log names and permissions differ by distribution; you may need appropriate access to read a particular system log.

#### Search and transform text

- `grep "error" application.log` searches for a case-sensitive pattern.
- `grep -i "error" application.log` ignores letter case.
- `grep -rn "TODO" ./src/` searches recursively and includes line numbers.
- `find /var/log -name "*.log"` locates matching names in a directory tree.
- `find . -type f -size +10M` finds regular files larger than 10 MiB.
- `awk '{print $1}' access.log` prints the first whitespace-separated field from each line.
- `sed 's/foo/bar/g' document.txt` replaces each `foo` with `bar` on each input line.

These tools can be combined into pipelines. Each command handles one step, and the pipe passes the resulting text to the next one.

#### Practice

In a real Linux environment and a scratch directory, create a few sample files. Inspect their permissions with `ls -l`, then use `chmod` to add execute permission to a test script. Redirect output to a file, append another line, search the file with `grep`, and count matching lines with `grep ... | wc -l`. The GitGoing terminal is a learning simulator and does not execute these system commands.

### Lecture 3: Process Management, System Monitoring and Essential Tools

#### Processes and process IDs

A process is a running instance of a program. The kernel assigns each process a process ID (PID), which lets tools inspect or signal that specific process.

`ps` provides a snapshot of process activity. For example, `ps aux` lists processes across users, and `ps aux | grep python` filters the displayed text for lines containing `python`. Interactive tools such as `top` and `htop` provide a changing view of process activity, CPU use and memory use; press `q` to exit.

#### Foreground, background and jobs

Commands normally run in the foreground, where they occupy the current terminal until completion. Add `&` to start a command in the background:

```sh
python3 long_script.py &
jobs
fg %1
bg %1
```

`jobs` lists background jobs in the current shell session. `fg %1` brings job 1 to the foreground, and `bg %1` resumes a suspended job in the background. Job numbers are local to the shell session and are not the same as system-wide PIDs.

#### Stop a process deliberately

`kill` sends a signal to a process by PID. The default is normally `SIGTERM`, which asks the process to stop cleanly:

```sh
kill 1234
```

Use `kill -9 1234` only as a last resort. `SIGKILL` forces immediate termination and gives the process no opportunity to clean up. `pkill nginx` and `killall firefox` select processes by name; confirm the target before using them because they may affect more than one process.

#### Inspect system resources

- `df -h` reports filesystem space in readable units.
- `du -sh *` estimates the size of each matching item in the current directory.
- `free -h` reports memory and swap usage.
- `uptime` reports how long the system has been running and its load averages.
- `uname -a` prints kernel and machine information.
- `lscpu` summarizes CPU details.
- `lspci` lists PCI devices; `lsusb` lists USB devices.
- `ss -tuln` lists listening TCP/UDP sockets and numeric ports.

Some hardware-inspection tools may not be installed by default. Resource and network output can also depend on permissions and the system configuration.

#### Archives and compression

`tar` bundles files and can create or extract compressed archives. `gzip` compresses files; `zip` and `unzip` work with ZIP archives:

```sh
tar -cvzf project_backup.tar.gz /path/to/project
tar -xvzf project_backup.tar.gz
zip -r archive.zip folder_name
unzip archive.zip
```

Before extracting an archive, inspect its contents and destination. Archives can contain paths that overwrite files if extracted carelessly.

#### Networking commands

- `ping -c 4 example.com` sends four connectivity probes.
- `wget https://example.com/file.zip` downloads a file.
- `curl -I https://example.com` requests HTTP headers.
- `curl https://api.github.com/users` requests an API response.
- `ss -tuln` displays listening sockets and ports.

Network tools may be restricted by firewalls, DNS settings or the environment in which Linux is running. Only access systems and services you are authorized to use.

#### Search, history and quick inspection

- `history | grep "git commit"` searches the current shell’s saved command history.
- `which python3` reports the executable found through the current `PATH`.
- `whereis nginx` searches standard locations for a program and related files.
- `wc -l notes.txt` counts the lines in a file.

The result from `which` depends on your shell environment and `PATH`; it is a quick lookup, not a complete inventory of every installed copy.

#### Safe working habits

1. Inspect commands before running them with `sudo` or destructive tools such as `rm`.
2. Use `Ctrl+C` to interrupt a foreground command, `Ctrl+Z` to suspend it, and `Ctrl+L` to clear the terminal display.
3. Use Tab completion to reduce typing mistakes.
4. Read `man command` when you need command syntax or detailed behavior.
5. Test unfamiliar commands on sample data before using them on important files.

#### Practice

In a real Linux environment, inspect processes with `ps`, check disk space with `df -h`, and inspect memory with `free -h`. Start a harmless background task such as `sleep 60 &`, find it with `jobs`, bring it to the foreground with `fg`, and stop it with `Ctrl+C`. Try the other tools only where they are installed and you have permission. The GitGoing terminal is a learning simulator and does not execute these system commands.

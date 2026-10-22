# GitGoing

Programming education website.


## Course assistant

The **Ask GitBuddy** button retrieves relevant lesson pages from the JavaScript,
Python, Java, C++, HTML/CSS, and Linux courses and sends those excerpts with
the question to Gemini for a grounded answer. This is retrieval-based question
answering, not model training. Create a Gemini API key in Google AI Studio and
set `GEMINI_API_KEY` in `server/.env`; `GEMINI_MODEL` can select a model
available to your API project. The server keeps the key private, limits
requests to eight per minute per client, and does not store Gemini interactions.

Questions and selected course excerpts are sent to Google. Google's Gemini API
free tier may use submitted content to improve its products, so the assistant
displays this notice and users should not submit personal or sensitive
information. The static GitHub Pages deployment does not run the Express API;
using the assistant there requires deploying the API and setting `VITE_API_URL`
to its public address at frontend build time.

## Quiz maker

The **Quiz Maker** tab builds 20-question multiple-choice quizzes (A to D) with
instant feedback, explanations, and a score. There are two sources:

- **Course lectures:** pick a course, chapter, and lecture. Gemini writes an easy
  beginner-level quiz from that lecture's text. Every lecture page also links to
  its quiz. Generated lecture quizzes are cached in server memory to save quota.
- **Upload a document:** drag in a `.pdf` or `.docx` file of up to 5 MB.

When you answer a question wrong, **Ask GitBuddy why** sends the question, your
answer, and the correct answer to GitBuddy (with matching lesson excerpts for
lecture quizzes) and shows the explanation under the question.

The server extracts the document text (older `.doc` files and scanned PDFs are not
supported), sends up to the first 30,000 characters to Gemini using the same
`GEMINI_API_KEY` and model settings as GitBuddy, and does not store the file.
Requests are limited to four per minute per client. Document text is sent to
Google, and the free tier may use it to improve Google products, so avoid
sensitive files.

## Terminal navigation

Choose **Terminal** in the site navigation to replace the Vim preview with the
interactive shell. Available commands:

- `whoami` — show the current visitor as `guest`
- `ls` — list all available courses
- `cd <course>` — open a course, for example `cd Java`
- `cd "HTML / CSS"` — open the combined web fundamentals course
- `cd ..` — return to the home page
- `pwd`, `help`, `clear`, `exit`

Course pages are available at `/courses/<course>`, including `/courses/java`.

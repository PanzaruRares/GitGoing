import React from 'react';
import javascriptLessons from './javascriptLessons.jsx';
import htmlCssLessons from './htmlCssLessons.jsx';
import javaLessons from './javaLessons.jsx';
import cppLessons from './cppLessons.jsx';
import linuxLessons from './linuxLessons.jsx';
import programmingLessons from './programmingLessons.jsx';

const courseSources = [
  { name: 'JavaScript', slug: 'javascript', lessons: javascriptLessons },
  { name: 'Python', slug: 'python', lessons: programmingLessons.python },
  { name: 'Java', slug: 'java', lessons: javaLessons },
  { name: 'C++', slug: 'cpp', lessons: cppLessons },
  { name: 'HTML / CSS', slug: 'html-css', lessons: htmlCssLessons },
  { name: 'Linux', slug: 'linux', lessons: linuxLessons },
];

const stopWords = new Set([
  'about', 'after', 'also', 'and', 'are', 'can', 'could', 'does', 'for',
  'from', 'how', 'into', 'its', 'more', 'not', 'that', 'the', 'their',
  'then', 'there', 'these', 'this', 'those', 'what', 'when', 'where',
  'which', 'while', 'with', 'would', 'you', 'your',
]);

let cachedPages;

function textFromContent(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textFromContent).join(' ');
  if (React.isValidElement(node)) return textFromContent(node.props.children);
  return '';
}

function buildCoursePages() {
  if (cachedPages) return cachedPages;

  cachedPages = courseSources.flatMap(({ name, slug, lessons }) =>
    Object.values(lessons || {}).flatMap((chapter) => {
      const chapterTitle = chapter.title || 'Course material';
      const lectures = chapter.lectures
        ? Object.values(chapter.lectures)
        : [chapter];

      return lectures.flatMap((lecture) =>
        (lecture.pages || []).map((page) => {
          const lectureTitle = lecture.title || 'Lesson';
          const body = textFromContent(page.content).replace(/\s+/g, ' ').trim();
          const title = page.title || lectureTitle;

          return {
            slug,
            text: `${name} — ${chapterTitle} — ${lectureTitle} — ${title}. ${body}`,
            source: `${name} / ${chapterTitle} / ${lectureTitle} / ${title}`,
            searchableText: `${chapterTitle} ${lectureTitle} ${title} ${body}`.toLowerCase(),
          };
        }),
      );
    }),
  );

  return cachedPages;
}

function getQueryTerms(question) {
  return [...new Set(
    question.toLowerCase().match(/[a-z0-9_+#.-]+/g) || [],
  )].filter((term) => term.length > 1 && !stopWords.has(term));
}

function scorePage(page, terms, question, preferredCourse) {
  let score = page.slug === preferredCourse ? 2 : 0;
  const sourceText = page.source.toLowerCase();

  for (const term of terms) {
    if (sourceText.includes(term)) score += 5;
    if (page.searchableText.includes(term)) score += 1;
  }

  const normalizedQuestion = question.toLowerCase().trim();
  if (normalizedQuestion.length > 5 && page.searchableText.includes(normalizedQuestion)) {
    score += 10;
  }

  return score;
}

export function getLectureCatalog() {
  return courseSources.map(({ name, slug, lessons }) => ({
    name,
    slug,
    chapters: Object.entries(lessons || {}).map(([chapterNumber, chapter]) => {
      const lectureEntries = chapter.lectures
        ? Object.entries(chapter.lectures)
        : [['1', chapter]];

      return {
        number: chapterNumber,
        title: chapter.title || 'Course material',
        lectures: lectureEntries.map(([lectureNumber, lecture]) => ({
          number: lectureNumber,
          title: lecture.title || `Lecture ${lectureNumber}`,
          text: (lecture.pages || [])
            .map((page) => `${page.title || ''}\n${textFromContent(page.content)}`)
            .join('\n\n')
            .replace(/[ \t]+/g, ' ')
            .replace(/\s*\n\s*/g, '\n')
            .trim(),
        })),
      };
    }),
  }));
}

export function findRelevantCoursePages(question, preferredCourse = '') {
  const terms = getQueryTerms(question);
  if (terms.length === 0) return [];

  return buildCoursePages()
    .map((page) => ({ page, score: scorePage(page, terms, question, preferredCourse) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ page }) => ({
      source: page.source,
      excerpt: page.text.slice(0, 1400),
    }));
}

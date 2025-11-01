import example_prompts from '@/data/example_prompts.json';
import { IChatResponseFormat } from '@/types/chat';

const convertSentenceToArray = (prompt: string): string[] => {
  return prompt.toLowerCase().split(' ');
};

const removeStopWords = (prompt: string[]): string[] => {
  const stopWords = [
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'if',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
    'is',
    'am',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'having',
    'he',
    'she',
    'it',
    'they',
    'them',
    'his',
    'her',
    'him',
    'its',
    'their',
    'our',
    'we',
    'you',
    'your',
    'yours',
    'me',
    'my',
    'mine',
    'i',
  ];
  return prompt.filter((word) => !stopWords.includes(word));
};

const removePunctuations = (prompt: string[]): string[] => {
  const punctuations = [
    '.',
    ',',
    '!',
    '?',
    ';',
    ':',
    "'",
    '"',
    '-',
    '—',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '...',
    '/',
    '\\',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '_',
    '+',
    '=',
    '<',
    '>',
    '|',
    '~',
    '`',
  ];
  return prompt.map((str) =>
    str
      .split('')
      .filter((ch) => !punctuations.includes(ch))
      .join(''),
  );
};

const getDiceCoefficient = (
  userPrompt: string[],
  examplePrompt: string[],
): number => {
  const commonWords = userPrompt.filter((word) => examplePrompt.includes(word));

  const diceScore =
    (2 * commonWords.length) / (userPrompt.length + examplePrompt.length);

  return diceScore;
};

const getPromptKey = (prompt: string[]): IChatResponseFormat[] => {
  const json = example_prompts;
  const scores: Record<IChatResponseFormat, number> = Object.fromEntries(
    Object.keys(json).map((key) => [key, 0]),
  ) as Record<IChatResponseFormat, number>;

  for (const [category, examples] of Object.entries(json)) {
    let categoryBestScore = 0;

    const chatCategory = category as IChatResponseFormat;

    for (const example of examples) {
      const exampleArray = convertSentenceToArray(example);
      const pureExample = removePunctuations(exampleArray);
      const filteredExample = removeStopWords(pureExample);

      const score = getDiceCoefficient(prompt, filteredExample);

      if (score > categoryBestScore) {
        categoryBestScore = score;
      }
    }

    scores[chatCategory] = categoryBestScore;
  }

  const PRIMARY_THRESHOLD = 0.3;
  const SECONDARY_THRESHOLD = 0.2;
  const MIN_DIFFERENCE = 0.1;

  const sortedCategories = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .filter(([, score]) => score >= SECONDARY_THRESHOLD);

  if (
    sortedCategories.length === 0 ||
    sortedCategories[0][1] < PRIMARY_THRESHOLD
  ) {
    return ['not_found'];
  }

  const topScore = sortedCategories[0][1];
  const matchedCategories: IChatResponseFormat[] = [];

  for (const [category, score] of sortedCategories) {
    if (score >= topScore - MIN_DIFFERENCE && score >= SECONDARY_THRESHOLD) {
      matchedCategories.push(category as IChatResponseFormat);
    }
  }

  return matchedCategories.slice(0, 3);
};

export const getPromptResponse = (prompt: string): IChatResponseFormat[] => {
  const promptArray = convertSentenceToArray(prompt);
  const pureArray = removePunctuations(promptArray);
  const filteredArray = removeStopWords(pureArray);

  const categoryKey = getPromptKey(filteredArray);

  return categoryKey;
};

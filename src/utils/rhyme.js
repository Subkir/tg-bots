// Very lightweight Russian rhyme helper using simple endings matching.
// Not perfect, but works offline without external APIs.

const VOWELS = 'аеёиоуыэюя';

function normalizeWord(word) {
  return (word || '')
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\-']/gi, '')
    .replace(/ё/g, 'е');
}

function getRhymeKey(word) {
  const w = normalizeWord(word);
  if (!w) return '';
  // Find from last vowel backwards two vowels window as rhyme key
  let lastVowelIndex = -1;
  for (let i = w.length - 1; i >= 0; i -= 1) {
    if (VOWELS.includes(w[i])) {
      lastVowelIndex = i;
      break;
    }
  }
  if (lastVowelIndex === -1) return w.slice(-3);

  // Include from previous vowel (if any) to end to make a stronger key
  let prevVowelIndex = -1;
  for (let i = lastVowelIndex - 1; i >= 0; i -= 1) {
    if (VOWELS.includes(w[i])) {
      prevVowelIndex = i;
      break;
    }
  }
  const start = prevVowelIndex !== -1 ? prevVowelIndex : Math.max(0, lastVowelIndex - 1);
  const key = w.slice(start);
  return key.length >= 3 ? key : w.slice(-3);
}

const STOCK_LINES = [
  'Вот рифма — прямо с жару, без понтов и без пиару',
  'Слова сложились ловко — получилась эта строфка',
  'Стишок не сложный выйдет — но всё же улыбнёт вас',
  'Рифму ловлю мгновенно — звучит почти отмено',
  'Пусть будет рифма смелой — но прозвучит умелой',
  'Сходится ритм уверенно — и рифма неизменно',
];

function buildRhymedReply(text) {
  const original = (text || '').trim();
  if (!original) return '';

  const words = original.split(/\s+/);
  const last = words[words.length - 1];
  const key = getRhymeKey(last);

  // Pick a stock line that "rhymes" by ending with a matching key if possible.
  const candidates = STOCK_LINES.filter((line) => getRhymeKey(line.split(/\s+/).pop()) === key);
  const secondLine = (candidates[0] || STOCK_LINES[Math.floor(Math.random() * STOCK_LINES.length)]);

  // Make first line rephrase of input ending with last word for rhyme.
  const firstLine = `Ты написал: ${original}`;

  return `${firstLine}\n${secondLine}`;
}

module.exports = {
  buildRhymedReply,
};



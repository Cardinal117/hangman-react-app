
// Loads the words from a word.txt file and returns an 
// array containing the loaded words.
export async function wordLoader() {
  const res = await fetch("/words.txt");
  const text = await res.text();
  return text
    .split(/[\r\n,]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

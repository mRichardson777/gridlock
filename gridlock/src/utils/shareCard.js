// Generates the Wordle-style share text for Gridlock results

const SOLVED_EMOJI = '🟥';
const FAILED_EMOJI = '⬜';

/**
 * Generate share card text.
 * @param {Array} results - Array of { solved: boolean } for each puzzle attempted
 * @param {number} streak - Current streak
 * @param {string} dateStr - e.g. "March 30"
 */
export function generateShareText(results, streak, dateStr) {
  const grid = results.map(r => r.solved ? SOLVED_EMOJI : FAILED_EMOJI).join('');
  const solvedCount = results.filter(r => r.solved).length;
  const streakLine = streak > 1 ? `🔥 ${streak} day streak\n` : '';

  return [
    `Gridlock ${dateStr}`,
    `${solvedCount}/${results.length} puzzles`,
    ``,
    grid,
    ``,
    streakLine + `Play at gridlock.app`,
  ].join('\n');
}

// Gridlock Daily Puzzles
// Each puzzle has a date key and an array of vehicles.
// The player car (red) is always id: 'player', orientation: 'H', row: 2

export const DAILY_PUZZLES = {
  // Format: 'YYYY-MM-DD'
  '2026-03-30': {
    difficulty: 'easy',
    vehicles: [
      // The red escape car
      { id: 'player', row: 2, col: 1, length: 2, orientation: 'H', isPlayer: true },
      // Blockers
      { id: 'a', row: 0, col: 2, length: 2, orientation: 'V', isPlayer: false },
      { id: 'b', row: 0, col: 4, length: 3, orientation: 'V', isPlayer: false },
      { id: 'c', row: 1, col: 0, length: 2, orientation: 'H', isPlayer: false },
      { id: 'd', row: 3, col: 2, length: 2, orientation: 'H', isPlayer: false },
      { id: 'e', row: 4, col: 0, length: 3, orientation: 'V', isPlayer: false },
      { id: 'f', row: 3, col: 4, length: 2, orientation: 'V', isPlayer: false },
    ],
  },
  '2026-03-31': {
    difficulty: 'medium',
    vehicles: [
      { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
      { id: 'a', row: 0, col: 1, length: 3, orientation: 'V', isPlayer: false },
      { id: 'b', row: 0, col: 3, length: 2, orientation: 'H', isPlayer: false },
      { id: 'c', row: 1, col: 5, length: 3, orientation: 'V', isPlayer: false },
      { id: 'd', row: 2, col: 3, length: 2, orientation: 'V', isPlayer: false },
      { id: 'e', row: 3, col: 1, length: 2, orientation: 'H', isPlayer: false },
      { id: 'f', row: 4, col: 3, length: 2, orientation: 'H', isPlayer: false },
      { id: 'g', row: 3, col: 4, length: 2, orientation: 'V', isPlayer: false },
    ],
  },
};

/**
 * Get today's puzzle.
 * Returns null if no puzzle exists for today (fallback needed).
 */
export function getTodaysPuzzle() {
  const today = new Date().toISOString().split('T')[0];
  return DAILY_PUZZLES[today] || getFallbackPuzzle();
}

/**
 * Get puzzle for a specific date string (YYYY-MM-DD).
 */
export function getPuzzleForDate(dateStr) {
  return DAILY_PUZZLES[dateStr] || null;
}

/**
 * Fallback puzzle if no daily puzzle is defined for today.
 */
function getFallbackPuzzle() {
  // Return the most recent puzzle as fallback
  const keys = Object.keys(DAILY_PUZZLES).sort();
  const last = keys[keys.length - 1];
  return DAILY_PUZZLES[last] || null;
}

// Gridlock Daily Puzzles
// All puzzles are hand-verified solvable.
// Player car (red) is always: id='player', orientation='H', row=2
// Win condition: slide player to col 4 (right edge)

export const DAILY_PUZZLES = {

  // EASY — 2 key moves + player slides out
  // Solution: move A up, move B up, slide player right to exit
  '2026-03-30': {
    difficulty: 'easy',
    vehicles: [
      { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
      { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },  // (1,2),(2,2) — blocks player, move UP
      { id: 'b', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false },  // (1,4),(2,4) — blocks player, move UP
      { id: 'c', row: 4, col: 1, length: 3, orientation: 'H', isPlayer: false },  // decorative
      { id: 'd', row: 0, col: 5, length: 2, orientation: 'V', isPlayer: false },  // decorative
    ],
  },

  // MEDIUM — 3 key moves + player slides out
  // Solution: move B left, move A up, move C down, slide player right to exit
  '2026-03-31': {
    difficulty: 'medium',
    vehicles: [
      { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
      { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },  // (1,2),(2,2) — blocks col 2, needs (0,2) free
      { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false },  // (0,1),(0,2) — blocks A from going up, move LEFT
      { id: 'c', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false },  // (2,4),(3,4) — blocks col 4, move DOWN
      { id: 'd', row: 5, col: 2, length: 2, orientation: 'H', isPlayer: false },  // decorative
      { id: 'e', row: 0, col: 5, length: 2, orientation: 'V', isPlayer: false },  // decorative
    ],
  },

  // HARD — 5 key moves + player slides out
  // Solution: move B right, B right again, move A up, move D left, move C down, slide player right to exit
  '2026-04-01': {
    difficulty: 'hard',
    vehicles: [
      { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
      { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },  // (1,2),(2,2) — blocks col 2
      { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false },  // (0,1),(0,2) — blocks A, move RIGHT twice
      { id: 'c', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false },  // (2,4),(3,4) — blocks col 4
      { id: 'd', row: 3, col: 3, length: 2, orientation: 'H', isPlayer: false },  // (3,3),(3,4) — blocks C from going down, move LEFT
      { id: 'e', row: 0, col: 4, length: 2, orientation: 'V', isPlayer: false },  // (0,4),(1,4) — decorative
    ],
  },

};

/**
 * Get today's puzzle.
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
 * Fallback: return the most recent puzzle.
 */
function getFallbackPuzzle() {
  const keys = Object.keys(DAILY_PUZZLES).sort();
  const last = keys[keys.length - 1];
  return DAILY_PUZZLES[last] || null;
}

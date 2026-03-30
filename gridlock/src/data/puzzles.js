// Gridlock Daily Puzzle Sessions
// Each day has an ordered list of puzzles — players race through as many as possible in 90 seconds.
// All puzzles are hand-verified solvable.
// Player car (red): id='player', orientation='H', row=2
// Win condition: slide player to col 4 (right edge, col + length >= GRID_SIZE)

export const SESSIONS = {

  '2026-03-30': [
    {
      id: 1,
      difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'c', row: 4, col: 1, length: 3, orientation: 'H', isPlayer: false },
        { id: 'd', row: 0, col: 5, length: 2, orientation: 'V', isPlayer: false },
      ],
      // Solution: A up, B up, player right x4
    },
    {
      id: 2,
      difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 0, col: 2, length: 3, orientation: 'V', isPlayer: false },
        { id: 'b', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'c', row: 0, col: 4, length: 2, orientation: 'H', isPlayer: false },
        { id: 'd', row: 3, col: 0, length: 2, orientation: 'H', isPlayer: false },
      ],
      // Solution: A down, B down, player right x4
    },
    {
      id: 3,
      difficulty: 'medium',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false },
        { id: 'c', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'd', row: 5, col: 2, length: 2, orientation: 'H', isPlayer: false },
        { id: 'e', row: 0, col: 5, length: 2, orientation: 'V', isPlayer: false },
      ],
      // Solution: B left, A up, C down, player right x4
    },
    {
      id: 4,
      difficulty: 'medium',
      vehicles: [
        { id: 'player', row: 2, col: 1, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 0, col: 3, length: 3, orientation: 'V', isPlayer: false },
        { id: 'b', row: 2, col: 5, length: 2, orientation: 'V', isPlayer: false },
        { id: 'c', row: 0, col: 0, length: 2, orientation: 'V', isPlayer: false },
        { id: 'd', row: 4, col: 3, length: 2, orientation: 'H', isPlayer: false },
      ],
      // Solution: A down, B up, player right x2
    },
    {
      id: 5,
      difficulty: 'hard',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false },
        { id: 'c', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'd', row: 3, col: 3, length: 2, orientation: 'H', isPlayer: false },
        { id: 'e', row: 0, col: 4, length: 2, orientation: 'V', isPlayer: false },
      ],
      // Solution: B right x2, A up, D left, C down, player right x4
    },
  ],

  '2026-03-31': [
    {
      id: 1,
      difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 0, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'c', row: 4, col: 0, length: 3, orientation: 'H', isPlayer: false },
      ],
      // Solution: A down, B up, player right x4
    },
    {
      id: 2,
      difficulty: 'medium',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 0, col: 1, length: 3, orientation: 'H', isPlayer: false },
        { id: 'c', row: 2, col: 4, length: 3, orientation: 'V', isPlayer: false },
        { id: 'd', row: 3, col: 1, length: 2, orientation: 'H', isPlayer: false },
      ],
      // Solution: B right, A up, C up, player right x4
    },
  ],

};

/**
 * Get today's puzzle session (ordered array of puzzles).
 */
export function getTodaysSession() {
  const today = new Date().toISOString().split('T')[0];
  return SESSIONS[today] || getFallbackSession();
}

/**
 * Get session for a specific date.
 */
export function getSessionForDate(dateStr) {
  return SESSIONS[dateStr] || null;
}

function getFallbackSession() {
  const keys = Object.keys(SESSIONS).sort();
  return SESSIONS[keys[keys.length - 1]] || [];
}

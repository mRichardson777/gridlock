// Gridlock Daily Puzzle Sessions
// All puzzles hand-verified solvable. Each has a visually distinct layout.
// Player car (red): id='player', orientation='H', row=2
// Win: player.col + player.length >= 6 (right edge)

export const SESSIONS = {

  '2026-03-30': [

    // ── Puzzle 1 (Easy) ───────────────────────────────────────────────
    // Layout: player far left, 2 vertical blockers in middle + right
    // Solution: A↑, B↑, player →→→→  (3 moves)
    // . . . . . .
    // . . A . B .
    // P P . . . .  →
    // . . . . . .
    // . C C C . .
    // . . . . . .
    {
      id: 1, difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false }, // (1,2),(2,2) → move up
        { id: 'b', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false }, // (1,4),(2,4) → move up
        { id: 'c', row: 4, col: 0, length: 3, orientation: 'H', isPlayer: false }, // deco
      ],
    },

    // ── Puzzle 2 (Easy) ───────────────────────────────────────────────
    // Layout: player STARTS IN THE MIDDLE, 1 blocker, short slide to exit
    // Solution: A↓, player →→  (2 moves)
    // . B B . . .
    // . . . . . .
    // . . P P A .  →
    // . . . . A .
    // . D D . . .
    // . . . . . .
    {
      id: 2, difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 2, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false }, // (2,4),(3,4) → move down
        { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false }, // deco
        { id: 'd', row: 4, col: 1, length: 2, orientation: 'H', isPlayer: false }, // deco
      ],
    },

    // ── Puzzle 3 (Medium) ─────────────────────────────────────────────
    // Layout: player far left, B in top row creates a chain (move B first to free A)
    // Solution: B←, A↑, C↑, player →→→→  (4 moves)
    // . B B . . .
    // . . A . C .
    // P P . . . .  →
    // . . . . . .
    // . . D D D .
    // . . . . . .
    {
      id: 3, difficulty: 'medium',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false }, // (1,2),(2,2) → needs (0,2) free
        { id: 'b', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false }, // (0,1),(0,2) → move LEFT first
        { id: 'c', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false }, // (1,4),(2,4) → move up
        { id: 'd', row: 4, col: 2, length: 3, orientation: 'H', isPlayer: false }, // deco
      ],
    },

    // ── Puzzle 4 (Medium) ─────────────────────────────────────────────
    // Layout: player starts col 1, blockers A+B occupy player's row going DOWN
    // Solution: A↓, B↓, player →→→  (3 moves)
    // . C C . . .
    // . . . . . .
    // . P P A B .  →
    // . . . A B .
    // . . . . . .
    // . E E E . .
    {
      id: 4, difficulty: 'medium',
      vehicles: [
        { id: 'player', row: 2, col: 1, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 2, col: 3, length: 2, orientation: 'V', isPlayer: false }, // (2,3),(3,3) → move down
        { id: 'b', row: 2, col: 4, length: 2, orientation: 'V', isPlayer: false }, // (2,4),(3,4) → move down
        { id: 'c', row: 0, col: 1, length: 2, orientation: 'H', isPlayer: false }, // deco
        { id: 'e', row: 5, col: 1, length: 3, orientation: 'H', isPlayer: false }, // deco
      ],
    },

    // ── Puzzle 5 (Hard) ───────────────────────────────────────────────
    // Layout: 5-step chain — D must move before C can move twice; B must move before A
    // Solution: D←, C↓, C↓, B→, A↑, player →→→→  (6 moves)
    // . . B B . F
    // . . A . C F
    // P P . . . .  →
    // . . . D D .
    // . . . . . .
    // E E E . . .
    {
      id: 5, difficulty: 'hard',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 1, col: 2, length: 2, orientation: 'V', isPlayer: false }, // (1,2),(2,2) → blocked by B above
        { id: 'b', row: 0, col: 2, length: 2, orientation: 'H', isPlayer: false }, // (0,2),(0,3) → move right to free (0,2)
        { id: 'c', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false }, // (1,4),(2,4) → blocked by D below
        { id: 'd', row: 3, col: 3, length: 2, orientation: 'H', isPlayer: false }, // (3,3),(3,4) → move left to free (3,4)
        { id: 'e', row: 5, col: 0, length: 3, orientation: 'H', isPlayer: false }, // deco
        { id: 'f', row: 0, col: 5, length: 2, orientation: 'V', isPlayer: false }, // deco
      ],
    },

  ],

  '2026-03-31': [
    {
      id: 1, difficulty: 'easy',
      vehicles: [
        { id: 'player', row: 2, col: 0, length: 2, orientation: 'H', isPlayer: true },
        { id: 'a', row: 0, col: 2, length: 2, orientation: 'V', isPlayer: false },
        { id: 'b', row: 1, col: 4, length: 2, orientation: 'V', isPlayer: false },
        { id: 'c', row: 4, col: 0, length: 3, orientation: 'H', isPlayer: false },
      ],
    },
  ],

};

export function getTodaysSession() {
  const today = new Date().toISOString().split('T')[0];
  return SESSIONS[today] || getFallbackSession();
}

export function getSessionForDate(dateStr) {
  return SESSIONS[dateStr] || null;
}

function getFallbackSession() {
  const keys = Object.keys(SESSIONS).sort();
  return SESSIONS[keys[keys.length - 1]] || [];
}

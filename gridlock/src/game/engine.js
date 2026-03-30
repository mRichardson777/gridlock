// Gridlock Game Engine
// Handles all puzzle logic — no UI here

export const GRID_SIZE = 6;
export const EXIT_ROW = 2; // row the red car must reach (0-indexed)

/**
 * A vehicle:
 * {
 *   id: string,
 *   row: number,       // top-left row
 *   col: number,       // top-left col
 *   length: number,    // 2 or 3
 *   orientation: 'H' | 'V',
 *   isPlayer: boolean  // true = the red escape car
 * }
 */

/**
 * Check if a move is valid.
 * direction: 'up' | 'down' | 'left' | 'right'
 */
export function canMove(vehicles, vehicleId, direction) {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return false;

  const { row, col, length, orientation } = vehicle;

  // Validate direction matches orientation
  if (orientation === 'H' && (direction === 'up' || direction === 'down')) return false;
  if (orientation === 'V' && (direction === 'left' || direction === 'right')) return false;

  // Calculate new position
  let newRow = row;
  let newCol = col;
  if (direction === 'up') newRow -= 1;
  if (direction === 'down') newRow += 1;
  if (direction === 'left') newCol -= 1;
  if (direction === 'right') newCol += 1;

  // Check bounds
  if (newRow < 0 || newCol < 0) return false;
  if (orientation === 'H' && newCol + length > GRID_SIZE) return false;
  if (orientation === 'V' && newRow + length > GRID_SIZE) return false;
  if (orientation === 'H' && newRow >= GRID_SIZE) return false;
  if (orientation === 'V' && newCol >= GRID_SIZE) return false;

  // Check collisions with other vehicles
  const occupied = getOccupiedCells(vehicles, vehicleId);
  const newCells = getVehicleCells({ ...vehicle, row: newRow, col: newCol });

  for (const cell of newCells) {
    if (occupied.has(`${cell.row},${cell.col}`)) return false;
  }

  return true;
}

/**
 * Apply a move, returning new vehicles array (immutable).
 */
export function applyMove(vehicles, vehicleId, direction) {
  if (!canMove(vehicles, vehicleId, direction)) return vehicles;

  return vehicles.map(v => {
    if (v.id !== vehicleId) return v;
    const updated = { ...v };
    if (direction === 'up') updated.row -= 1;
    if (direction === 'down') updated.row += 1;
    if (direction === 'left') updated.col -= 1;
    if (direction === 'right') updated.col += 1;
    return updated;
  });
}

/**
 * Check if the puzzle is solved.
 * The player car must have a clear path to the right edge.
 */
export function isSolved(vehicles) {
  const player = vehicles.find(v => v.isPlayer);
  if (!player) return false;

  // Player car must be horizontal and in EXIT_ROW
  if (player.orientation !== 'H' || player.row !== EXIT_ROW) return false;

  // Check if player car reaches the right edge
  const rightEdge = player.col + player.length;
  if (rightEdge < GRID_SIZE) {
    // Check if path to exit is clear
    const occupied = getOccupiedCells(vehicles, player.id);
    for (let c = rightEdge; c < GRID_SIZE; c++) {
      if (occupied.has(`${player.row},${c}`)) return false;
    }
  }

  return true;
}

/**
 * Get all cells occupied by a single vehicle.
 */
export function getVehicleCells(vehicle) {
  const cells = [];
  for (let i = 0; i < vehicle.length; i++) {
    if (vehicle.orientation === 'H') {
      cells.push({ row: vehicle.row, col: vehicle.col + i });
    } else {
      cells.push({ row: vehicle.row + i, col: vehicle.col });
    }
  }
  return cells;
}

/**
 * Get a Set of "row,col" strings for all cells occupied by OTHER vehicles.
 */
export function getOccupiedCells(vehicles, excludeId = null) {
  const set = new Set();
  for (const v of vehicles) {
    if (v.id === excludeId) continue;
    for (const cell of getVehicleCells(v)) {
      set.add(`${cell.row},${cell.col}`);
    }
  }
  return set;
}

/**
 * Build a 6x6 grid map for rendering.
 * Returns a 2D array where each cell is null or a vehicle id.
 */
export function buildGrid(vehicles) {
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  for (const v of vehicles) {
    for (const cell of getVehicleCells(v)) {
      if (cell.row >= 0 && cell.row < GRID_SIZE && cell.col >= 0 && cell.col < GRID_SIZE) {
        grid[cell.row][cell.col] = v.id;
      }
    }
  }
  return grid;
}

/**
 * Count total moves made (length of move history).
 */
export function getMoveCount(history) {
  return history.length;
}

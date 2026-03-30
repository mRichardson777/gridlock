import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { colors, radius, shadows } from '../theme';
import { getVehicleCells, canMove, GRID_SIZE, EXIT_ROW } from '../game/engine';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_SIZE = Math.min(SCREEN_WIDTH - 32, 360);
const CELL_SIZE = BOARD_SIZE / GRID_SIZE;
const VEHICLE_PADDING = 4;

export default function GameBoard({ vehicles, onMove, solved }) {
  return (
    <View style={[styles.board, solved && styles.boardSolved]}>
      {/* Grid lines */}
      {Array(GRID_SIZE).fill(null).map((_, row) =>
        Array(GRID_SIZE).fill(null).map((_, col) => (
          <View
            key={`cell-${row}-${col}`}
            style={[
              styles.cell,
              { top: row * CELL_SIZE, left: col * CELL_SIZE },
            ]}
          />
        ))
      )}

      {/* Exit arrow */}
      <View style={styles.exitMarker} />

      {/* Vehicles */}
      {vehicles.map(vehicle => (
        <Vehicle
          key={vehicle.id}
          vehicle={vehicle}
          onMove={onMove}
          vehicles={vehicles}
        />
      ))}
    </View>
  );
}

function Vehicle({ vehicle, onMove, vehicles }) {
  const { id, row, col, length, orientation, isPlayer } = vehicle;
  const dragAccum = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragAccum.current = 0;
      },
      onPanResponderMove: (_, gestureState) => {
        const delta = orientation === 'H' ? gestureState.dx : gestureState.dy;
        const steps = Math.round(delta / CELL_SIZE);
        const diff = steps - dragAccum.current;

        if (diff !== 0) {
          const direction = orientation === 'H'
            ? (diff > 0 ? 'right' : 'left')
            : (diff > 0 ? 'down' : 'up');

          // Only move one cell at a time per threshold
          onMove(id, direction);
          dragAccum.current = steps;
        }
      },
      onPanResponderRelease: () => {
        dragAccum.current = 0;
      },
    })
  ).current;

  const isHorizontal = orientation === 'H';
  const width = isHorizontal ? CELL_SIZE * length - VEHICLE_PADDING * 2 : CELL_SIZE - VEHICLE_PADDING * 2;
  const height = isHorizontal ? CELL_SIZE - VEHICLE_PADDING * 2 : CELL_SIZE * length - VEHICLE_PADDING * 2;

  const top = row * CELL_SIZE + VEHICLE_PADDING;
  const left = col * CELL_SIZE + VEHICLE_PADDING;

  const bgColor = isPlayer ? colors.redCar : getCarColor(id);
  const borderColor = isPlayer ? colors.redCarDark : darken(bgColor);

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.vehicle,
        {
          top,
          left,
          width,
          height,
          backgroundColor: bgColor,
          borderColor,
          borderRadius: isHorizontal ? height / 2 : width / 2,
        },
        isPlayer && styles.playerVehicle,
      ]}
    >
      {/* Windshield hint — small white strip */}
      {isPlayer && (
        <View style={[
          styles.windshield,
          isHorizontal
            ? { right: 8, top: '25%', bottom: '25%', width: 6 }
            : { bottom: 8, left: '25%', right: '25%', height: 6 }
        ]} />
      )}
    </View>
  );
}

const CAR_COLORS = [
  colors.car1, colors.car2, colors.car3,
  colors.car4, colors.car5, colors.car6, colors.car7,
];

function getCarColor(id) {
  // Deterministic color from id
  const code = id.charCodeAt(0);
  return CAR_COLORS[code % CAR_COLORS.length];
}

function darken(hex) {
  // Crude darken for border
  return hex; // simplified — just use same color
}

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: colors.gridBackground,
    borderRadius: radius.md,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.gridLine,
    ...shadows.strong,
  },
  boardSolved: {
    borderColor: colors.success,
    borderWidth: 2,
  },
  cell: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: colors.gridLine,
  },
  exitMarker: {
    position: 'absolute',
    right: -12,
    top: EXIT_ROW * CELL_SIZE + CELL_SIZE / 2 - 6,
    width: 12,
    height: 12,
    backgroundColor: colors.exitArrow,
    borderRadius: 6,
  },
  vehicle: {
    position: 'absolute',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerVehicle: {
    ...shadows.card,
  },
  windshield: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
  },
});

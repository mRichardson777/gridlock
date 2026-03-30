import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../theme';
import GameBoard from '../components/GameBoard';
import { applyMove, isSolved, getMoveCount } from '../game/engine';
import { getTodaysPuzzle } from '../data/puzzles';

export default function GameScreen() {
  const puzzle = getTodaysPuzzle();
  const [vehicles, setVehicles] = useState(puzzle?.vehicles || []);
  const [history, setHistory] = useState([]);
  const [solved, setSolved] = useState(false);

  const handleMove = useCallback((vehicleId, direction) => {
    if (solved) return;
    setVehicles(prev => {
      const next = applyMove(prev, vehicleId, direction);
      if (next !== prev) {
        setHistory(h => [...h, prev]);
        if (isSolved(next)) setSolved(true);
      }
      return next;
    });
  }, [solved]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    setVehicles(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    setSolved(false);
  }, [history]);

  const handleReset = useCallback(() => {
    setVehicles(puzzle?.vehicles || []);
    setHistory([]);
    setSolved(false);
  }, [puzzle]);

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const moveCount = getMoveCount(history);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GRIDLOCK</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{moveCount}</Text>
          <Text style={styles.statLabel}>MOVES</Text>
        </View>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{puzzle?.difficulty?.toUpperCase()}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>—</Text>
          <Text style={styles.statLabel}>TIME</Text>
        </View>
      </View>

      {/* Game Board */}
      <View style={styles.boardContainer}>
        <GameBoard
          vehicles={vehicles}
          onMove={handleMove}
          solved={solved}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlBtn, history.length === 0 && styles.controlBtnDisabled]}
          onPress={handleUndo}
          disabled={history.length === 0}
        >
          <Text style={styles.controlBtnText}>↩ Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={handleReset}>
          <Text style={styles.controlBtnText}>↺ Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Solved overlay */}
      {solved && (
        <View style={styles.solvedOverlay}>
          <View style={styles.solvedCard}>
            <Text style={styles.solvedEmoji}>🎉</Text>
            <Text style={styles.solvedTitle}>Solved!</Text>
            <Text style={styles.solvedMoves}>{moveCount} moves</Text>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Share Result</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playAgainBtn} onPress={handleReset}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 4,
    color: colors.textPrimary,
  },
  date: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  stat: {
    alignItems: 'center',
    minWidth: 60,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.textMuted,
    marginTop: 2,
  },
  difficultyBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.accent,
  },
  boardContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  controlBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  controlBtnDisabled: {
    opacity: 0.4,
  },
  controlBtnText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  // Solved overlay
  solvedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  solvedCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    width: '80%',
    ...shadows.strong,
  },
  solvedEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  solvedTitle: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  solvedMoves: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  shareBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  shareBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  playAgainBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playAgainText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
});

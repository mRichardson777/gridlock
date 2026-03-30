import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../theme';
import GameBoard from '../components/GameBoard';
import { applyMove, isSolved } from '../game/engine';
import { getTodaysSession } from '../data/puzzles';
import useTimer from '../hooks/useTimer';

const TOTAL_SECONDS = 90;

export default function GameScreen({ onSessionEnd }) {
  const session = getTodaysSession();

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [vehicles, setVehicles] = useState(() => (session[0]?.vehicles || []).map(v => ({ ...v })));
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [started, setStarted] = useState(false);

  // Use refs to avoid stale closures
  const puzzleIndexRef = useRef(0);
  const resultsRef = useRef([]);
  const solveTimer = useRef(null);
  const sessionEndedRef = useRef(false);

  const flashAnim = useRef(new Animated.Value(1)).current;

  const handleTimerExpire = useCallback(() => {
    if (sessionEndedRef.current) return;
    sessionEndedRef.current = true;
    const final = [...resultsRef.current, { solved: false }];
    onSessionEnd(final);
  }, [onSessionEnd]);

  const { formatted, progress, urgency, start } = useTimer(TOTAL_SECONDS, handleTimerExpire);

  // Load a fresh puzzle by index
  const loadPuzzle = useCallback((index) => {
    if (index >= session.length) return;
    setVehicles(session[index].vehicles.map(v => ({ ...v })));
    setHistory([]);
    setPuzzleSolved(false);
  }, [session]);

  // Watch puzzleSolved — when true, wait then advance
  useEffect(() => {
    if (!puzzleSolved) return;

    solveTimer.current = setTimeout(() => {
      const currentIndex = puzzleIndexRef.current;
      const nextIndex = currentIndex + 1;
      const newResults = [...resultsRef.current, { solved: true }];

      resultsRef.current = newResults;
      setResults(newResults);

      if (nextIndex >= session.length) {
        // All puzzles done!
        if (!sessionEndedRef.current) {
          sessionEndedRef.current = true;
          onSessionEnd(newResults);
        }
      } else {
        puzzleIndexRef.current = nextIndex;
        setPuzzleIndex(nextIndex);
        loadPuzzle(nextIndex);
      }
    }, 700);

    return () => clearTimeout(solveTimer.current);
  }, [puzzleSolved, session.length, loadPuzzle, onSessionEnd]);

  const handleMove = useCallback((vehicleId, direction) => {
    if (puzzleSolved) return;

    if (!started) {
      setStarted(true);
      start();
    }

    setVehicles(prev => {
      const next = applyMove(prev, vehicleId, direction);
      if (next === prev) return prev;
      setHistory(h => [...h, prev]);
      if (isSolved(next)) {
        setPuzzleSolved(true);
        // Flash animation
        Animated.sequence([
          Animated.timing(flashAnim, { toValue: 0.3, duration: 120, useNativeDriver: true }),
          Animated.timing(flashAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();
      }
      return next;
    });
  }, [puzzleSolved, started, start, flashAnim]);

  const handleUndo = useCallback(() => {
    if (history.length === 0 || puzzleSolved) return;
    setVehicles(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
  }, [history, puzzleSolved]);

  useEffect(() => () => clearTimeout(solveTimer.current), []);

  const currentPuzzle = session[puzzleIndex];
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const timerColor = urgency === 'critical' ? colors.redCar
    : urgency === 'warning' ? colors.car3
    : colors.success;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GRIDLOCK</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      {/* Timer bar */}
      <View style={styles.timerBarBg}>
        <View style={[styles.timerBarFill, { width: `${progress * 100}%`, backgroundColor: timerColor }]} />
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.puzzleDots}>
          {session.map((_, i) => {
            const isDone = i < results.length;
            const isCurrent = i === puzzleIndex;
            const wasSolved = isDone && results[i]?.solved;
            return (
              <View key={i} style={[
                styles.dot,
                isCurrent && styles.dotCurrent,
                isDone && (wasSolved ? styles.dotSolved : styles.dotFailed),
              ]} />
            );
          })}
        </View>
        <View style={styles.timerDisplay}>
          <Text style={[styles.timerText, urgency === 'critical' && styles.timerCritical]}>
            {started ? formatted : `${TOTAL_SECONDS}s`}
          </Text>
          <Text style={styles.statLabel}>TIME</Text>
        </View>
      </View>

      {/* Puzzle label */}
      <View style={styles.puzzleLabel}>
        <Text style={styles.puzzleLabelText}>
          Puzzle {puzzleIndex + 1} of {session.length}
        </Text>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{currentPuzzle?.difficulty?.toUpperCase()}</Text>
        </View>
      </View>

      {/* Game Board */}
      <Animated.View style={[styles.boardContainer, { opacity: flashAnim }]}>
        <GameBoard vehicles={vehicles} onMove={handleMove} solved={puzzleSolved} />
      </Animated.View>

      {/* Start hint */}
      {!started && (
        <View style={styles.startHint}>
          <Text style={styles.startHintText}>Slide a piece to start the timer</Text>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlBtn, (history.length === 0 || puzzleSolved) && styles.controlBtnDisabled]}
          onPress={handleUndo}
          disabled={history.length === 0 || puzzleSolved}
        >
          <Text style={styles.controlBtnText}>↩ Undo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 22, fontWeight: '800', letterSpacing: 4, color: colors.textPrimary },
  date: { ...typography.bodySmall, marginTop: 2 },
  timerBarBg: { height: 4, backgroundColor: colors.border, width: '100%' },
  timerBarFill: { height: 4, borderRadius: 2 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  puzzleDots: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.border },
  dotCurrent: { backgroundColor: colors.textMuted, width: 12, height: 12, borderRadius: 6 },
  dotSolved: { backgroundColor: colors.redCar },
  dotFailed: { backgroundColor: colors.gridLine },
  timerDisplay: { alignItems: 'center' },
  timerText: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  timerCritical: { color: colors.redCar },
  statLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 1, color: colors.textMuted, marginTop: 2 },
  puzzleLabel: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: spacing.sm, paddingBottom: spacing.sm,
  },
  puzzleLabelText: { ...typography.bodySmall },
  difficultyBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.full,
  },
  difficultyText: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: colors.accent },
  boardContainer: { alignItems: 'center', paddingHorizontal: spacing.md },
  startHint: { alignItems: 'center', paddingTop: spacing.md },
  startHintText: { ...typography.bodySmall, color: colors.textMuted, fontStyle: 'italic' },
  controls: { flexDirection: 'row', justifyContent: 'center', paddingTop: spacing.lg },
  controlBtn: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, backgroundColor: colors.surface,
    ...shadows.card,
  },
  controlBtnDisabled: { opacity: 0.4 },
  controlBtnText: { ...typography.body, fontWeight: '600', color: colors.textSecondary },
});

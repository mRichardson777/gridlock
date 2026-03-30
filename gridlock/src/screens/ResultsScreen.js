import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Animated, Share
} from 'react-native';
import { colors, spacing, typography, radius, shadows } from '../theme';
import { generateShareText } from '../utils/shareCard';

export default function ResultsScreen({ results, streak, onPlayAgain }) {
  const solvedCount = results.filter(r => r.solved).length;
  const total = results.length;

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleShare = async () => {
    const text = generateShareText(results, streak, today);
    try {
      await Share.share({ message: text });
    } catch (e) {
      console.log('Share failed:', e);
    }
  };

  const scoreLabel = solvedCount === 0 ? 'Better luck tomorrow!'
    : solvedCount === total ? '🏆 Perfect round!'
    : solvedCount >= total / 2 ? 'Nice work!'
    : 'Keep practicing!';

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* Header */}
        <Text style={styles.title}>GRIDLOCK</Text>
        <Text style={styles.date}>{today}</Text>

        {/* Score card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreNumber}>{solvedCount}</Text>
          <Text style={styles.scoreTotal}>/ {total} puzzles</Text>
          <Text style={styles.scoreLabel}>{scoreLabel}</Text>
        </View>

        {/* Share grid */}
        <View style={styles.shareGrid}>
          {results.map((r, i) => (
            <Text key={i} style={styles.shareEmoji}>
              {r.solved ? '🟦' : '⬜'}
            </Text>
          ))}
        </View>

        {/* Streak */}
        {streak > 0 && (
          <View style={styles.streakRow}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
        )}

        {/* Come back tomorrow */}
        <View style={styles.tomorrowCard}>
          <Text style={styles.tomorrowTitle}>Come back tomorrow</Text>
          <Text style={styles.tomorrowSub}>New puzzles drop every day at midnight</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>Share Result</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.practiceBtn} onPress={onPlayAgain}>
          <Text style={styles.practiceBtnText}>Practice Again</Text>
        </TouchableOpacity>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 4,
    color: colors.textPrimary,
  },
  date: {
    ...typography.bodySmall,
    marginTop: 4,
    marginBottom: spacing.xl,
  },
  scoreCard: {
    alignItems: 'center',
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    marginBottom: spacing.lg,
    ...shadows.strong,
  },
  scoreNumber: {
    fontSize: 80,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 88,
  },
  scoreTotal: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: spacing.sm,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  shareGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  shareEmoji: {
    fontSize: 32,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
    backgroundColor: colors.goldLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  streakEmoji: {
    fontSize: 20,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
  },
  tomorrowCard: {
    backgroundColor: colors.successLight,
    borderRadius: radius.md,
    padding: spacing.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  tomorrowTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.success,
  },
  tomorrowSub: {
    ...typography.bodySmall,
    color: colors.success,
    marginTop: 2,
  },
  shareBtn: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  shareBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
  },
  practiceBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  practiceBtnText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
});

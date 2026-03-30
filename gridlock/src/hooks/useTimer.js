import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Countdown timer hook.
 * @param {number} totalSeconds - Total seconds to count down from
 * @param {function} onExpire - Called when timer reaches 0
 */
export default function useTimer(totalSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Format as M:SS
  const formatted = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

  // 0-1 progress (1 = full, 0 = empty)
  const progress = timeLeft / totalSeconds;

  // Urgency level for color changes
  const urgency = timeLeft <= 10 ? 'critical' : timeLeft <= 20 ? 'warning' : 'normal';

  return { timeLeft, formatted, progress, urgency, running, start, pause, reset };
}

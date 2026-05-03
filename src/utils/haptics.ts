import RNHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Defer so feedback still fires when called from a pan gesture (some devices coalesce haptics
 * on the same synchronous turn as touch move).
 */
function deferHaptic(run: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

export function hapticLight(): void {
  deferHaptic(() => {
    try {
      RNHapticFeedback.trigger(HapticFeedbackTypes.impactLight, hapticOptions);
    } catch {
      /* unsupported / simulator edge cases */
    }
  });
}

export function hapticMedium(): void {
  deferHaptic(() => {
    try {
      RNHapticFeedback.trigger(HapticFeedbackTypes.impactMedium, hapticOptions);
    } catch {
      /* unsupported / simulator edge cases */
    }
  });
}

export function hapticHeavy(): void {
  deferHaptic(() => {
    try {
      RNHapticFeedback.trigger(HapticFeedbackTypes.impactHeavy, hapticOptions);
    } catch {
      /* unsupported / simulator edge cases */
    }
  });
}

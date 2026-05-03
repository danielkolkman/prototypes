/**
 * Defer so feedback still fires when called from a pan gesture (some devices coalesce haptics
 * on the same synchronous turn as touch move).
 */
function deferHaptic(run: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

/** No-op placeholder after removing Expo Haptics; add react-native-haptic-feedback if you want native impact again. */
export function hapticLight(): void {
  deferHaptic(() => {});
}

/** No-op placeholder after removing Expo Haptics; add react-native-haptic-feedback if you want native impact again. */
export function hapticMedium(): void {
  deferHaptic(() => {});
}

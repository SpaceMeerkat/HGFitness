import { useEffect, useRef } from 'react';
import { Animated, Keyboard, KeyboardEvent, Platform, TextInput } from 'react-native';

// Gap left between the bottom of the focused input and the top of the keyboard.
const KEYBOARD_GAP = 24;
const SHIFT_DURATION = 200;

// Slides content up (translateY) just enough to keep the focused TextInput visible above the
// keyboard, rather than resizing/squeezing the layout. Android edge-to-edge doesn't resize the
// window for the keyboard, so inputs near the bottom of the page would otherwise be covered.
// Only inputs that call onInputFocus/onInputBlur trigger a shift, so inputs in other modals
// (e.g. TrackingNotes) leave the page where it is.
export function useKeyboardShift() {
  const translateY = useRef(new Animated.Value(0)).current;
  const keyboardTop = useRef<number | null>(null);
  const trackedInputFocused = useRef(false);

  const animateTo = (value: number) => {
    Animated.timing(translateY, {
      toValue: value,
      duration: SHIFT_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const adjustForFocusedInput = () => {
    const input = TextInput.State.currentlyFocusedInput();
    if (!trackedInputFocused.current || keyboardTop.current === null || !input) return;

    // Stop first so the measured position and the current shift agree with each other.
    translateY.stopAnimation(currentValue => {
      input.measureInWindow((_x, y, _width, height) => {
        const overlap = y + height + KEYBOARD_GAP - (keyboardTop.current ?? Infinity);
        // A negative overlap means we've shifted more than needed for this input, so ease back down.
        const shift = Math.max(0, -currentValue + overlap);
        animateTo(-shift);
      });
    });
  };

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e: KeyboardEvent) => {
      keyboardTop.current = e.endCoordinates.screenY;
      adjustForFocusedInput();
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardTop.current = null;
      animateTo(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onInputFocus = () => {
    trackedInputFocused.current = true;
    // Moving between inputs while the keyboard is already open fires no keyboard event.
    adjustForFocusedInput();
  };

  const onInputBlur = () => {
    trackedInputFocused.current = false;
  };

  return { translateY, onInputFocus, onInputBlur };
}

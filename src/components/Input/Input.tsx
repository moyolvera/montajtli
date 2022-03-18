import { isAndroid } from '@utils';
import { AnimatePresence, MotiView } from 'moti';
import * as React from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import styles from './Input.styles';

interface InputProps extends TextInputProps {
  label: string;
  maxLength?: number;
  isRequired?: boolean;
}

export type InputHandlers = {
  validate: () => boolean;
  getValue: () => string;
  setValue: (value: string) => void;
};

const LABEL_PLACE = isAndroid() ? 30 : 24;

const Input: React.ForwardRefRenderFunction<InputHandlers, InputProps> = (
  { label, maxLength, isRequired, ...props },
  forwardedRef
) => {
  const animation = useSharedValue(LABEL_PLACE);
  const [value, setInputValue] = React.useState('');
  const [error, setError] = React.useState<string>();

  const labelStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animation.value
        },
        {
          translateX: interpolate(animation.value, [0, LABEL_PLACE], [-2, 10])
        },
        {
          scale: interpolate(animation.value, [0, LABEL_PLACE], [0.8, 1])
        }
      ]
    };
  }, []);

  function onFocus() {
    animation.value = withTiming(0);
  }

  function onBlur() {
    if (value.length !== 0) {
      return;
    }

    animation.value = withTiming(LABEL_PLACE);
  }

  function validate() {
    if (maxLength && value.length > maxLength) {
      return 'minLength';
    }

    if (isRequired && value.length === 0) {
      return 'required';
    }

    return undefined;
  }

  function runValidations() {
    const validation = validate();

    setError(validation);

    return validation === undefined;
  }

  React.useImperativeHandle(forwardedRef, () => ({
    validate: () => {
      return runValidations();
    },
    getValue: () => {
      return value;
    },
    setValue: (newValue: string) => {
      if (typeof newValue === 'string' && newValue.length > 0) {
        animation.value = withTiming(0);
      }

      setInputValue(newValue);
    }
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.labelWrapper, labelStyles]}
        pointerEvents="none">
        <Text style={styles.label}>{`${label}:`}</Text>
      </Animated.View>
      <AnimatePresence>
        {error !== undefined ? (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.errorIcon}>
            <Text>!</Text>
          </MotiView>
        ) : null}
      </AnimatePresence>
      <TextInput
        value={value}
        onChangeText={setInputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        {...props}
      />
      <Text style={styles.error}>{error || ' '}</Text>
    </View>
  );
};

export default React.forwardRef(Input);

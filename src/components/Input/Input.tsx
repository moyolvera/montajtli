import { isAndroid } from '@utils';
import { AnimatePresence, MotiView } from 'moti';
import * as React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import Text from '../Text/Text';
import styles from './Input.styles';

export type InputValidationFunction = {
  validator: (value: string) => boolean;
  message: string;
};

interface InputProps extends TextInputProps {
  label: string;
  customValidations?: InputValidationFunction[];
  isRequired?: boolean;
  maxLength?: number;
  renderLeftIcon?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export type InputHandlers = {
  validate: () => boolean;
  getValue: () => string;
  setValue: (value: string) => void;
};

const LABEL_PLACE = isAndroid() ? 26 : 24;

const Input: React.ForwardRefRenderFunction<InputHandlers, InputProps> = (
  {
    label,
    customValidations,
    maxLength,
    isRequired,
    renderLeftIcon,
    wrapperStyle,
    onBlur: onBlurProp,
    ...props
  },
  forwardedRef
) => {
  const animation = useSharedValue(LABEL_PLACE);
  const [value, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
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
  }, [renderLeftIcon]);

  function onFocus() {
    setIsFocused(true);

    animation.value = withTiming(0);
  }

  function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false);

    if (onBlurProp) {
      onBlurProp(e);
    }

    if (value.length !== 0) {
      return;
    }

    animation.value = withTiming(LABEL_PLACE);
  }

  function validate() {
    if (customValidations) {
      const customValidators = customValidations
        .map(({ validator, message }) => {
          if (!validator(value)) {
            return message;
          }
        })
        .filter(Boolean);

      if (customValidators.length > 0) {
        return customValidators[0];
      }
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
    <View style={[styles.wrapper, wrapperStyle]}>
      <Animated.View
        style={[styles.labelWrapper, labelStyles]}
        pointerEvents="none">
        <Text style={styles.label}>{`${label}:`}</Text>
      </Animated.View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setInputValue}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            !!renderLeftIcon && styles.withLeftIcon,
            !!error && styles.errorInput
          ]}
          {...props}
        />
        {renderLeftIcon && (
          <View style={styles.leftIcon}>{renderLeftIcon}</View>
        )}
        <AnimatePresence>
          {error !== undefined ? (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.errorIcon}>
              <Feather name="alert-triangle" size={16} color="#000" />
            </MotiView>
          ) : null}
        </AnimatePresence>
      </View>
      <Text style={styles.error}>{error || ' '}</Text>
    </View>
  );
};

export default React.forwardRef(Input);

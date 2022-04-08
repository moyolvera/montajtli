import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@components';

import styles from './Button.styles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  link?: boolean;
}

function Button({ onPress, title, icon, link }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, !link && styles.action]}>
      <Text style={[styles.text, link && styles.actionText]}>{title}</Text>
      {!!icon && icon}
    </TouchableOpacity>
  );
}

export default Button;

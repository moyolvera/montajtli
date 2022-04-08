import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import styles from './SimpleHeader.styles';
import { commonStyles } from '@theme';

interface SimpleHeaderProps {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

function SimpleHeader({ children, left, right }: SimpleHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.flexOne}>
        {!!left && <View style={styles.left}>{left}</View>}
        <Text font="bold" style={styles.title}>
          {children}
        </Text>
      </View>
      {!!right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

export default SimpleHeader;

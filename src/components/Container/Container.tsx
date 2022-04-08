import * as React from 'react';
import colors from '@theme/colors';
import { common } from '@theme/common';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
}

function Container({ children, scrollEnabled = true }: ContainerProps) {
  return (
    <View style={[common.flexOne, { backgroundColor: colors.light }]}>
      <SafeAreaView style={common.flexOne}>
        {scrollEnabled ? (
          <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
        ) : (
          children
        )}
      </SafeAreaView>
    </View>
  );
}

export default Container;

import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Container;

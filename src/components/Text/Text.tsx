import * as React from 'react';
import { Text as RNText, TextProps } from 'react-native';

function Text({ ...props }: TextProps) {
  return <RNText {...props} />;
}

export default Text;

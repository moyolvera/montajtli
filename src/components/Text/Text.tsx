import * as React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import useLocalization from '@hooks/useLocalization';

function Text({ children, ...props }: TextProps) {
  const { localize } = useLocalization();
  return <RNText {...props}>{localize(children)}</RNText>;
}

export default Text;

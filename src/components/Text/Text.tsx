import * as React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import useLocalization from '@hooks/useLocalization';

interface ExtendedTextProps extends TextProps {
  font?: 'regular' | 'light' | 'black' | 'bold';
}

const styles = StyleSheet.create({
  regular: {},
  light: {
    fontWeight: '300'
  },
  black: {
    fontWeight: '900'
  },
  bold: {
    fontWeight: 'bold'
  }
});

function Text({ font = 'regular', children, ...props }: ExtendedTextProps) {
  const { localize } = useLocalization();

  const textStyles = React.useMemo(() => {
    switch (font) {
      case 'regular':
        return styles.regular;
      case 'light':
        return styles.light;
      case 'black':
        return styles.black;
      case 'bold':
        return styles.bold;
      default:
        return styles.regular;
    }
  }, [font]);

  return (
    <RNText {...props} style={[props.style, textStyles]}>
      {localize(children)}
    </RNText>
  );
}

export default Text;

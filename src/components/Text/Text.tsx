import * as React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import useLocalization from '@hooks/useLocalization';
import colors from '@theme/colors';

interface ExtendedTextProps extends TextProps {
  font?: 'regular' | 'light' | 'black' | 'bold';
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Nexa-Regular',
    color: colors.black
  },
  light: {
    fontFamily: 'Nexa-Light',
    color: colors.black
  },
  black: {
    fontFamily: 'Nexa-Black',
    color: colors.black
  },
  bold: {
    fontFamily: 'Nexa-Bold',
    color: colors.black
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
    <RNText {...props} style={[textStyles, props.style]}>
      {localize(children)}
    </RNText>
  );
}

export default Text;

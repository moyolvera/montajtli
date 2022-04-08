import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  createWrapper: {
    backgroundColor: colors.action,
    marginRight: 16,
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    transform: [{ rotate: '3deg' }],
    marginBottom: 8
  },
  joinWrapper: {
    backgroundColor: colors.action,
    marginRight: 16,
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    transform: [{ rotate: '-3deg' }],
    marginBottom: 8
  },
  label: {
    color: colors.white,
    fontSize: 18
  }
});

export default styles;

import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    padding: 6,
    flexDirection: 'row',
    paddingLeft: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  action: {
    backgroundColor: colors.action
  },
  actionText: {
    color: colors.action
  },
  text: {
    color: colors.white,
    fontSize: 16,
    top: 1,
    marginRight: 8
  }
});

export default styles;

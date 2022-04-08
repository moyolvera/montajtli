import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    padding: 18
  },
  welcome: {
    color: colors.black,
    fontSize: 12,
    marginBottom: 2
  },
  textWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  notification: {
    width: 40,
    height: 40,
    backgroundColor: colors.action,
    borderRadius: 16,
    transform: [{ rotateZ: '6deg' }],
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell: {
    color: colors.white,
    transform: [{ rotateZ: '-6deg' }]
  },
  name: {
    color: colors.black
  }
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    padding: 18
  },
  welcome: {
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
    backgroundColor: '#fee6de',
    borderRadius: 16,
    transform: [{ rotateZ: '6deg' }],
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell: {
    transform: [{ rotateZ: '-6deg' }]
  }
});

export default styles;

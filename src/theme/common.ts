import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  flexOneJustifyCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  flexOneCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  absolute: {
    position: 'absolute'
  },
  backgroundWhite: {
    backgroundColor: '#fff'
  }
});

export { common };

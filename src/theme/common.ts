import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  },
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
  },
  rightLabel: {
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 12,
    textAlign: 'right'
  },
  marginTop8: {
    marginTop: 8
  },
  padding: {
    padding: 16
  },
  paddingHorizontal: {
    paddingHorizontal: 16
  }
});

export { common };

import { isAndroid } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {},
  labelWrapper: {
    position: 'absolute',
    paddingLeft: 16,
    zIndex: 2
  },
  label: {
    color: '#bbb'
  },
  inputFocused: {
    borderColor: '#00bcd4'
  },
  errorInput: {
    borderWidth: 1,
    borderColor: '#f00'
  },
  leftIcon: {
    position: 'absolute',
    width: 24,
    alignItems: 'center',
    overflow: 'hidden'
  },
  withLeftIcon: {
    paddingLeft: 24
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#eee',
    padding: isAndroid() ? 3 : 6,
    borderWidth: 1
  },
  inputWrapper: {
    marginTop: 18,
    justifyContent: 'center'
  },
  errorIcon: {
    position: 'absolute',
    right: 8
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 4,
    marginTop: 8,
    marginBottom: 2,
    color: '#f00'
  }
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8
  },
  labelWrapper: {
    position: 'absolute',
    zIndex: 2
  },
  label: {
    color: '#999'
  },
  input: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#ccc',
    padding: 6,
    borderWidth: 1
  },
  errorIcon: {
    position: 'absolute',
    right: 8,
    top: 22
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 4,
    marginBottom: 10
  }
});

export default styles;

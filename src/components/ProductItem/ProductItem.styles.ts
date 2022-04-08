import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 16,
    alignItems: 'center',

    shadowColor: '#000',
    elevation: 10
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  name: {
    fontSize: 18,
    marginBottom: 4
  }
});

export default styles;

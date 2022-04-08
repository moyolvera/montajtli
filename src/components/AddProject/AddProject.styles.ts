import dimensions from '@utils/dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18
  },
  description: {
    textAlign: 'right',
    paddingLeft: dimensions.WIDTH / 3
  }
});

export default styles;

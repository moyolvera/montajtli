import * as React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { commonStyles } from '@theme';

import styles from './Loader.styles';

interface LoaderProps {
  loading: boolean;
}

function Loader({ loading }: LoaderProps) {
  return loading ? (
    <Modal animationType="fade" style={commonStyles.flexOne} transparent>
      <View
        style={[
          commonStyles.absolute,
          commonStyles.flexOneCenter,
          commonStyles.fullWidth,
          styles.wrapper
        ]}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  ) : null;
}

export default React.memo(Loader);

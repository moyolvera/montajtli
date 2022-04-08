import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { AnimatePresence, MotiView } from 'moti';
import { Text } from '@components';
import colors from '@theme/colors';
import styles from './ProductsActions.styles';

interface ProductsActionsProps {
  showActions: boolean;
  addAction: () => void;
  joinAction: () => void;
}

function ProductsActions({
  showActions,
  addAction,
  joinAction
}: ProductsActionsProps) {
  return (
    <View style={styles.wrapper}>
      <AnimatePresence>
        {showActions && (
          <MotiView
            from={{ height: 0, opacity: 0, transform: [{ scale: 0 }] }}
            animate={{ height: 80, opacity: 1, transform: [{ scale: 1 }] }}
            exit={{ height: 0, opacity: 0, transform: [{ scale: 0 }] }}
            transition={{
              type: 'timing'
            }}>
            <TouchableOpacity onPress={addAction} style={styles.createWrapper}>
              <Feather name="edit" color={colors.white} size={30} />
              <Text font="bold" style={styles.label}>
                project.add.create
              </Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showActions && (
          <MotiView
            from={{ height: 0, opacity: 0, transform: [{ scale: 0 }] }}
            animate={{ height: 80, opacity: 1, transform: [{ scale: 1 }] }}
            exit={{ height: 0, opacity: 0, transform: [{ scale: 0 }] }}
            transition={{
              type: 'timing'
            }}>
            <TouchableOpacity onPress={joinAction} style={styles.joinWrapper}>
              <Feather name="user-plus" color={colors.white} size={30} />
              <Text font="bold" style={styles.label}>
                project.add.join
              </Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

export default ProductsActions;

import * as React from 'react';
import { View } from 'react-native';
import colors from '@theme/colors';
import { Text } from '@components';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyles } from '@theme';
import { ProjectItem } from '@utils/types';
import styles from './ProductItem.styles';

interface ProductItemProps {
  item: ProjectItem;
}

function ProductItem({ item }: ProductItemProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Feather name="star" color={colors.white} size={22} />
        </View>
        <View style={commonStyles.flexOne}>
          <Text font="bold" style={styles.name}>
            {item.name}
          </Text>
          <Text font="light">{item.description}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProductItem;

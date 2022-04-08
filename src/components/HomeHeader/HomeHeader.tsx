import * as React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAuthContext } from '@hooks';
import { Text } from '@components';
import { commonStyles } from '@theme';

import styles from './HomeHeader.styles';

interface HomeHeaderProps {}

function HomeHeader({}: HomeHeaderProps) {
  const { user } = useAuthContext();

  return (
    <View style={[styles.wrapper, commonStyles.flexRow]}>
      <View>
        {!!user?.photoURL ? (
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
        ) : null}
      </View>
      <View style={[commonStyles.flexOne, styles.textWrapper]}>
        <Text font="light" style={styles.welcome}>
          home.welcome
        </Text>
        <Text font="bold" style={styles.name}>
          {user?.displayName}
        </Text>
      </View>
      <View style={styles.notification}>
        <SimpleLineIcons
          name="bell"
          size={20}
          color="black"
          style={styles.bell}
        />
      </View>
    </View>
  );
}

export default HomeHeader;

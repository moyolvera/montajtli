import * as React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '@theme';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Home</Text>
    </View>
  );
}

export default HomeScreen;

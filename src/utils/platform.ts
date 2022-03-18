import { Platform } from 'react-native';

function isWeb() {
  return Platform.OS === 'web';
}

function isAndroid() {
  return Platform.OS === 'android';
}

function isIos() {
  return Platform.OS === 'ios';
}

export { isWeb, isAndroid, isIos };

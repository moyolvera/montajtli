module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@actions': './src/actions',
            '@components': './src/components',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@utils': './src/utils'
          },
          extensions: ['.ts', '.tsx', 'web.ts', '.web.tsx']
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};

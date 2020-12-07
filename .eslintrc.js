module.exports = {
  env: {
    browser: true,
  },
  extends: ['react-native-wcandillon', 'prettier'],
  plugins: ['import'],
  rules: {
    'react/prefer-stateless-function': 2, // only React.FC

    'import/prefer-default-export': 0, // only named exports
    'import/no-default-export': 2, // only named exports

    '@typescript-eslint/member-delimiter-style': 0, // comma in TS interfaces
  },
}

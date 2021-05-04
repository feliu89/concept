module.exports = {
    "env": {
        "react-native/react-native": true,
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "no-unused-vars": 0,
        "react/prop-types": 0,
        "react-native/no-inline-styles": 0,
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-color-literals": 2,
        "react-native/no-raw-text": 2,
        "react-native/no-single-element-style-arrays": 2,
        "react/display-name": 0,
      }
};

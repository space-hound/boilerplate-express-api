const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
    ],
    settings: {
        'import/resolver': {
            'babel-module': {},
        }
    },
    rules: {
        'no-console': OFF,

        'no-unused-vars': [WARN],

        'semi': [ERROR, 'always'],
        'quotes': [ERROR, 'single'],

        'object-curly-spacing': [ERROR, 'always'],
    },
};

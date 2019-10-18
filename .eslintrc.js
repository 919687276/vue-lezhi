module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: 'babel-eslint'
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential',
      'airbnb-base',
    ],
    // required to lint *.vue files
    plugins: [
      'vue',
    ],
    // add your custom rules here
    rules: {
      'linebreak-style': 'off',
      'max-len': 0,
      'no-alert': 0,
      'no-console': 0,
      'no-continue': 0,
      'no-mixed-operators': 0,
      "no-restricted-syntax": 0,
      'no-param-reassign': 0,
      'no-shadow': 1,
      'no-underscore-dangle': 0,
      'no-useless-return': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'vue/v-bind-style': 2,
      'vue/v-on-style': 2,
      'vue/html-indent': [1, 2, {
        "attribute": 1,
        "closeBracket": 0,
        "alignAttributesVertically": false,
        "ignores": []
      }],
      'vue/html-quotes': [2, "double"],
      'vue/script-indent': 0,
      'vue/no-multi-spaces': 2,
      'vue/max-attributes-per-line': [2, {
        "singleline": 4,
        "multiline": {
          "max": 4,
          "allowFirstLine": true
        },
      }],
    },
  }
  
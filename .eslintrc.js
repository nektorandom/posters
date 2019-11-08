module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true,
      "preferType": {
        "String": "string",
        "object": "Object",
      }
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false,
      }
    }],
    "no-var": 1,
    "no-eval": "error",
    // "indent": ["WARN", 8],
    "quotes": ["error", "single"],
    "no-console": ["error", { "allow": ["warn", "info"] }],
    "space-before-function-paren": ["error", "never"],
    // "padded-blocks": ["error", "always"],
    "space-before-blocks": [ "error", "always" ],
    "prefer-arrow-callback": [0, { "allowNamedFunctions": true }],
    "func-names": ["error", "never"],
    "no-use-before-define": [
      "error", {
        "functions": true,
        "classes": true
      }
    ],
    "max-nested-callbacks": [
      "error",
      5
    ],
  }
};

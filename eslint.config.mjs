import globals from "globals";
import pluginJs from "@eslint/js";
import nodePlugin from 'eslint-plugin-n'; // https://github.com/eslint-community/eslint-plugin-n#-rules


export default [
  {
    files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}
  },
  pluginJs.configs.recommended,
  nodePlugin.configs["flat/recommended-script"],
  {
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node,
        VV : 'readonly',
        vvClient: 'readonly',
        $: 'readonly',
        ControlName: 'readonly',
        Swal: 'readonly'
      } 
    },

    // plugins: {},

    rules: {
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'warn',
      'no-unsafe-finally': 'warn',

      // No longer need "version" property now that package.json has an "engines" definition
      "n/no-unsupported-features/es-builtins": ["error", {
        "ignores": []
      }],
      "n/no-unsupported-features/es-syntax": ["error", {
        "ignores": []
      }],
      "n/no-unsupported-features/node-builtins": ["error", {
        "ignores": []
      }],
    }
  },
];
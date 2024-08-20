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

      // 14.18.0 as noted in nodeJs-rest-client-library (VV rest client lib)
      "n/no-unsupported-features/es-builtins": ["error", {
        "version": "14.18.0",
        "ignores": []
      }],
      "n/no-unsupported-features/es-syntax": ["error", {
        "version": "14.18.0",
        "ignores": []
      }],
      "n/no-unsupported-features/node-builtins": ["error", {
        "version": "14.18.0",
        "ignores": []
      }],
    }
  },
];
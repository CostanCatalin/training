/*global module*/
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    "curly": "error",
    "quotes": ["error", "double"],
    "complexity": ["error", {
      "max": 8
    }],
    "max-params": ["error", 4],
    "max-depth": ["error", 4],
    "max-nested-callbacks": ["error", 3],
    "max-statements": ["error", 20, {
      "ignoreTopLevelFunctions": true
    }],
    "no-array-constructor": "error",
    "array-callback-return": "error",
    "no-new-object": "error",
    // TODO:will be added later as warnings are solved
    // "prefer-template": "error",
    // template strings give you a readable, concise syntax with proper newlines and string interpolation features.
    "template-curly-spacing": ["error", "never"],
    // It improves syntax highlighting, and is also more easily optimized by many JS engines.
    "quote-props": ["warn", "as-needed"],
    // Backslashes harm readability, thus they should only be present when necessary.
    "no-useless-escape": "error",
    /**
     * An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens,
     * in parens, cleanly expresses this.
     * Note that in a world with modules everywhere, you almost never need an IIFE.
     */
    "wrap-iife": ["error", "outside"],
    // Writing functions within loops tends to result in errors due to the way the function creates a closure around the loop
    "no-loop-func": "error",
    // ... is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like arguments
    "prefer-rest-params": "error",
    /**
     * Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.
     * Reassigning parameters can lead to unexpected behavior, especially when accessing the arguments object.
     * It can also cause optimization issues, especially in V8.
     */
    "no-param-reassign": ["error", {
      "props": true
    }],
    /**
     * It creates a version of the function that executes in the context of this, which is usually what you want, and is a more concise syntax.
     * Why not? If you have a fairly complicated function, you might move that logic out into its own function declaration.
     */
    "prefer-arrow-callback": "off",
    //Require space before/after arrow function's arrow
    "arrow-spacing": ["error", {
      "before": true,
      "after": true
    }],
    // Syntactic sugar. It reads well when multiple functions are chained together.
    "arrow-parens": ["error", "as-needed"],
    "arrow-body-style": ["error", "always"],
    // Avoid confusing arrow function syntax (=>) with comparison operators (<=, >=)
    "no-confusing-arrow": ["error", {
      allowParens: true
    }],
    // Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.
    "no-dupe-class-members": "error",
    "no-duplicate-imports": ["error", {
      "includeExports": true
    }],
    // This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
    "no-iterator": "error",
    "one-var": ["off", {
      var: "off",
      let: "off",
      const: "off"
    }],
    // TODO:will be added later as warnings are solved
    // "prefer-const": "warn",
    "prefer-const": "off",
    // TODO:will be added later as warnings are solved
    // http://eslint.org/docs/rules/no-var
    // "no-var": "warn",
    "no-var": "off",
    /**
     * Lexical declarations are visible in the entire switch block but only get initialized when assigned,
     * which only happens when its case is reached. This causes problems when multiple case clauses attempt to define the same thing.
     */
    "no-case-declarations": "error",
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    // one true brace style
    "brace-style": ["error", "1tbs", {
      "allowSingleLine": true
    }],
    /**
     * soft tab indentation of 2 spaces
     * disabled - handled by jscs
     *   "indent": ["error", 2, {
     *   "SwitchCase": 1,
     *   "VariableDeclarator": 1
     * }],
     * */
    "indent": "off",
    // Place 1 space before the leading brace
    "space-before-blocks": "error",
    /**
     * Place 1 space before the opening parenthesis in control statements (if, while etc.).
     * Place no space between the argument list and the function name in function calls and declarations
     */
    "keyword-spacing": ["error", {
      "before": true
    }],
    // Set off operators with spaces
    "space-infix-ops": ["error", {
      "int32Hint": false
    }],
    // TODO:will be added later as warnings are solved
    // "newline-per-chained-call": ["error", {
    //   "ignoreChainWithDepth": 2
    // }],
    "newline-per-chained-call": "off",
    /**
     * Use indentation when making long method chains (more than 2 method chains).
     * Use a leading dot, which emphasizes that the line is a method call, not a new statement.
     */
    "no-whitespace-before-property": "error",
    // Do not pad your blocks with blank lines
    "padded-blocks": ["error", "never"],
    //Do not add spaces inside parentheses
    "space-in-parens": ["error", "never"],
    //Do not add spaces inside brackets
    "array-bracket-spacing": ["error", "never"],
    // Add spaces inside curly braces
    "object-curly-spacing": ["error", "always"],
    //Avoid having lines of code that are longer than 120 characters (including whitespace)
    "max-len": ["error", 120],
    //Leading commas: Nope
    "comma-style": ["error", "last"],
    /**
     * No additional trailing comma
     * Why allow Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove
     * the additional trailing comma in the transpiled code which means you don't have to worry about
     * the trailing comma problem in legacy browsers. To allow it use "comma-dangle": ["error", "always"]
     */
    "comma-dangle": ["error", "never"],
    // Semicolons: Yup
    semi: ["error", "always", {
      "omitLastInOneLineBlock": false
    }],
    /**
     * Numbers: Use Number for type casting and parseInt always with a radix for parsing strings
     * https://davidwalsh.name/parseint-radix
     * http://jslinterrors.com/missing-radix-parameter/
     */
    radix: "error",
    camelcase: "error",
    //http://eslint.org/docs/rules/new-cap.html
    "new-cap": ["error", {
      "newIsCap": true,
      "properties": false
    }],
    // TODO:will be added later as warnings are solved
    // http://eslint.org/docs/rules/no-underscore-dangle.html
    // "no-underscore-dangle": ["error", { "allowAfterThis": true }]
    "no-underscore-dangle": "off"
  },
  overrides: [
    // node files
    {
      files: [
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
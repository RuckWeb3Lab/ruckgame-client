module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'custom-property-pattern': null,
    'color-hex-length': null,
    'max-line-length': null,
    'string-quotes': 'single',
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules'],
  },
}

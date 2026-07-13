module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'button',
        'input',
        'navbar',
        'tabbar',
        'popup',
        'card',
        'icon',
        'styles',
        'hooks',
        'utils',
        'components',
        'shared',
        'docs',
        'ci',
      ],
    ],
  },
};

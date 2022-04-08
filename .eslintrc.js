/*
 * @Author: 王鑫
 * @Description: eslint 配置
 * @Date: 2022-04-01 12:32:18
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    //不能有声明后未被使用的变量或参数
    // "no-unused-vars": "off"
  },
  scripts: {
    eslint: 'eslint src --ext .ts',
  },
};

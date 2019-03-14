# react-cnode

[![Build Status](https://travis-ci.org/FuNn1esT/react-cnode.svg?branch=master)](https://travis-ci.org/FuNn1esT/react-cnode)
[![codecov](https://codecov.io/gh/FuNn1esT/react-cnode/branch/master/graph/badge.svg)](https://codecov.io/gh/FuNn1esT/react-cnode)
[![codebeat badge](https://codebeat.co/badges/3a41264f-cf1c-498c-90ed-8246335f091d)](https://codebeat.co/projects/github-com-funn1est-react-cnode-master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with: prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/FuNn1esT/react-cnode/blob/master/LICENSE)

使用 React.js 开发的前端 BBS 社区项目，使用 [cnodejs.org](https://cnodejs.org/) API。

## 演示

👉 在线预览: https://cnode.funn1est.cn

## 快速开始

```bash
$ git clone
$ cd react-cnode
$ yarn # 安装依赖
$ yarn start # 开发
$ yarn build # 打包
```

## 特性

- 移动端支持
- 在 Redux 中使用 Immutable
- 基于 Ant Design UI 库
- webpack 4 开发和生产配置
- 使用 Babel 支持 ES6 + 语法
- 使用 Jest 进行单元测试，Enzyme 进行 UI 测试，Sinon 进行函数的模拟和监视
- 使用 husky 和 lint-staged 在 git commit 前进行代码风格检查
- Github Markdown CSS 风格

## 依赖

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [React Router 4](https://github.com/ReactTraining/react-router)
- [Immutable](https://github.com/facebook/immutable-js)
- [Ant Design](https://github.com/ant-design/ant-design)
- [webpack 4](https://github.com/webpack/webpack)
- [Babel](https://babeljs.io/)
- [Jest](https://github.com/facebook/jest) + [Enzyme](https://github.com/airbnb/enzyme) + [Sinon](https://github.com/sinonjs/sinon)
- [ESLint](https://github.com/eslint/eslint) + [Prettier](https://github.com/prettier/prettier) + [stylelint](https://github.com/stylelint/stylelint)
- [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)

## 脚本

### 测试

```bash
$ yarn test # 测试
$ yarn test:update # 升级快照
$ yarn test:watch # 交互测试模式
$ yarn coverage # 生成测试覆盖率报告
```

### 更多

```bash
$ yarn prettier # 使用 Prettier 格式化 src 目录下所有 js 文件代码
$ yarn lint:style # 使用 stylelint 检查 src 目录下所有 scss 文件代码
```
## 截图

### 平板及以上设备

<p align="center">
  <img width="50%" height="50%" src="https://raw.githubusercontent.com/FuNn1esT/react-cnode/master/docs/assets/screenshot-ipad.png">
</p>

### 移动端

<p align="center">
  <img width="50%" height="50%" src="https://raw.githubusercontent.com/FuNn1esT/react-cnode/master/docs/assets/screenshot-iphone6.png">
</p>

## 开源协议

[MIT](LICENSE)

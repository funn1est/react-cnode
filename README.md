# react-cnode | [中文](/README-zh_CN.md)

[![Build Status](https://travis-ci.org/FuNn1esT/react-cnode.svg?branch=master)](https://travis-ci.org/FuNn1esT/react-cnode)
[![codecov](https://codecov.io/gh/FuNn1esT/react-cnode/branch/master/graph/badge.svg)](https://codecov.io/gh/FuNn1esT/react-cnode)
[![codebeat badge](https://codebeat.co/badges/3a41264f-cf1c-498c-90ed-8246335f091d)](https://codebeat.co/projects/github-com-funn1est-react-cnode-master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with: prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/FuNn1esT/react-cnode/blob/master/LICENSE)

A frontend project for BBS community using [cnodejs.org](https://cnodejs.org/) API developed with React.js.

## Demo

👉 Online preview: https://cnode.f1t.io

## Getting Started

```bash
$ git clone
$ cd react-cnode
$ yarn # Install dependencies
$ yarn start # Development
$ yarn build # Production build
```

## Features

- Mobile support
- Use Immutable data in Redux
- Base on Ant Design library
- webpack 4 development and production configuration
- Babel for ES6 +
- Use Jest for unit test, Enzyme for UI test, Sinon for mock and spy function
- ESLint and Prettier for JavaScript code format, stylelint for scss code lint
- Use husky and lint-staged for code lint before git commit
- Github Markdown CSS style

## Dependencies

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

## Scripts

### Test

```bash
$ yarn test # Test
$ yarn test:update # Update test snapshots
$ yarn test:watch # Test interactive mode
$ yarn coverage # Generate test coverage
```

### More

```bash
$ yarn prettier # Use Prettier to format all js file under src directory
$ yarn lint:style # Use stylelint to lint all scss file under src directory
```

## Screenshots

### Tablet and above

<p align="center">
  <img width="50%" height="50%" src="https://raw.githubusercontent.com/FuNn1esT/react-cnode/master/docs/assets/screenshot-ipad.png">
</p>

### Mobile

<p align="center">
  <img width="50%" height="50%" src="https://raw.githubusercontent.com/FuNn1esT/react-cnode/master/docs/assets/screenshot-iphone6.png">
</p>

## License

[MIT](LICENSE)

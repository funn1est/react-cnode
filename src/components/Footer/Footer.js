import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './Footer.scss';

const Footer = () => {
  return (
    <Layout.Footer className={styles.container}>
      <span>
        CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js
        的技术研究。
      </span>
      <div className={styles.link}>
        <Icon type="api" />
        <a
          target="_blank"
          href="https://cnodejs.org/api"
          rel="noopener noreferrer"
        >
          API
        </a>
        <Icon type="github" />
        <a
          target="_blank"
          href="https://github.com/FuNn1esT/react-cnode"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      </div>
    </Layout.Footer>
  );
};

export default Footer;

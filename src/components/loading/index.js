import React from 'react';
import { Spin } from 'antd';
import styles from './index.scss';

const Loading = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);

export default Loading;

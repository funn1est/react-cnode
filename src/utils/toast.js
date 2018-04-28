import { message } from 'antd';

/**
 * 生成全局提示工厂函数
 * @param {string} type 提示类型
 * @returns {function(string): void}
 */
const generator = type =>
  /**
   * @param {string} msg
   */
  msg => message[type](msg);

const typeMaps = ['success', 'info', 'warning', 'error'];

/**
 * 全局提示 有四种类型 success, info, warning, error
 * 提示可选参数 (msg: string)
 * @type {{object}}
 * @property success 成功提示
 * @property info 信息提示
 * @property warning 警告提示
 * @property error 错误提示
 */
const toastUtils = {};
typeMaps.forEach((item) => {
  toastUtils[item] = generator(item);
});

export default toastUtils;

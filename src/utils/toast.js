import { message } from 'antd';

/**
 * global toast generator
 * @param {string} type - toast type
 * @returns {function(string): void}
 */
const generator = type =>
  /**
   * @param {string} msg - toast msg
   */
  msg => message[type](msg);

const typeMaps = ['success', 'info', 'warning', 'error'];

/**
 * global toast
 * Four types: success, info, warning, error
 * @example
 * toastUtils.success(msg)
 * @type {{object}}
 * @property success - success toast
 * @property info - info toast
 * @property warning - warning toast
 * @property error - error toast
 */
const toastUtils = {};
typeMaps.forEach((item) => {
  toastUtils[item] = generator(item);
});

export default toastUtils;

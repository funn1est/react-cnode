import { notification } from 'antd';

/**
 * 生成提醒框工厂函数
 * @param {string} type 提醒框类型
 * @returns {function(string, string): void}
 */
const generator = type =>
  /**
   * @param {string} message 提醒标题
   * @param {string} description 提醒内容
   */
  (message, description) => (
    notification[type]({
      message,
      description,
    })
  );

const typeMaps = ['success', 'info', 'warning', 'error'];

/**
 * 通知提醒框 有四种类型 success, info, warning, error
 * 提醒框可选参数 (message: string, description: string)
 * @type {{object}}
 * @property success 成功提醒框
 * @property info 信息提醒框
 * @property warning 警告提醒框
 * @property error 错误提醒框
 */
const notificationUtils = {};
typeMaps.forEach((item) => {
  notificationUtils[item] = generator(item);
});

export default notificationUtils;

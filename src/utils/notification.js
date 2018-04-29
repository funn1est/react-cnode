import { notification } from 'antd';

/**
 * notification generator
 * @param {string} type - notification type
 * @returns {function(string, string): void}
 */
const generator = type =>
  /**
   * @param {string} message - notification message
   * @param {string} description - notification description
   */
  (message, description) => (
    notification[type]({
      message,
      description,
    })
  );

const typeMaps = ['success', 'info', 'warning', 'error'];

/**
 * notification
 * Four types: success, info, warning, error
 * @example
 * notification.success(message, description)
 * @type {{object}}
 * @property success - success notification
 * @property info - info notification
 * @property warning - warning notification
 * @property error - error notification
 */
const notificationUtils = {};
typeMaps.forEach((item) => {
  notificationUtils[item] = generator(item);
});

export default notificationUtils;

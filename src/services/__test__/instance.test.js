import sinon from 'sinon';
import { instance, get } from '../instance';

describe('checkStatus()', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = sinon.stub(instance, 'get');
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should show error when response status not in [200,300]', async () => {
    const iconPrefix = '.ant-notification-notice-icon';
    mockAxios
      .withArgs('/error')
      .resolves({ status: 404, data: { error_msg: 'error' } });

    get('/error').then(() => {
      expect(document.querySelectorAll(`${iconPrefix}-error`).length).toBe(1);
    });
  });
});

import Logger from '../../logger';

describe('Logger unit tests', () => {
  let logger: Logger;
  beforeAll(() => {
    logger = Logger.getInstance();
  });

  it('should set config', () => {
    logger.setConfig({
      appName: 'pagarME App',
    });
    expect(logger.config).toStrictEqual({ appName: 'pagarME App' });
  });
  it('should set appName', () => {
    logger.setConfig({
      appName: 'pagarME App',
    });
    expect(logger.config.appName).toStrictEqual('pagarME App');
  });
  it('should be instance of', () => {
    expect(Logger.getInstance()).toBeInstanceOf(Logger);
  });
});

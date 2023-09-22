import './config/module-alias';
import app from './index';
import Logger from './logger/logger';

const logger = Logger.getInstance();
logger.setConfig({
  appName: 'pagarME App',
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.log(`is running`, { port: PORT }));

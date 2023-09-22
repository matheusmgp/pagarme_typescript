export type ConfigType = {
  appName: string;
};
export default class Logger {
  private static instance: Logger;
  config: ConfigType;
  private constructor() {
    this.config = {
      appName: 'Not Configured',
    };
  }
  setConfig(config: ConfigType) {
    this.config = config;
  }
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log(message: string, ...params: any) {
    console.log(this.config.appName, message, params);
  }
}

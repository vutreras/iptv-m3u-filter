/**
 * Custom logger format
 * @autor vutreras
 */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, splat, printf } = format;

const APP_NAME = 'iptv-m3u-filter';

const customFormat = printf(({ timestamp, level, message, meta }) => {
  return `[${timestamp}][${level}][${APP_NAME}] ${message} ${meta? JSON.stringify(meta) : ''}`;
});

let transportsArray = [new transports.Console()];

const logger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    customFormat
  ),
  transports: transportsArray
});

module.exports = logger;

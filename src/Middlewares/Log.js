const date = require('../helpers/date');
const write = require('../helpers/write');

const writeLog = text => {
  const logPath = `${process.env.APPLICATION_LOG_DIR}/REQUEST-${date.getDateString('-')}.log`;
  setTimeout(() => write(logPath, `${text}\n`), 0);
}

module.exports = (req, res, next) => {
  const requestLog = `[${date.getDateString()} ${date.getTimeString()}][${req.method}]: ${req.path} from ${req.ip}`;

  writeLog(requestLog);
  console.log(requestLog);

  next();
};
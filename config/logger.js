import winston from "winston";
// import winstondb from "winston-mongodb";

const { combine, timestmap, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestmap }) => {
  return `${timestmap} [${label}] ${level} : ${message}`;
});

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.MongoDB)({
      level: "info",
      user: process.env.USERDB,
      pwddb: process.env.PWDDB,
      collection: "logs",
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: combine(
    label({
      label: "pokemon-api",
    }),
    timestamp(),
    myFormat
  ),
});

export { logger };

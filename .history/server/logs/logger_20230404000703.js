import { createLogger, transports, format } from "winston";
import { MongoDB } from "winston-mongodb";
// import winston from "winston";

console.log(process.env.MONGO);

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new MongoDB({
      level: "info",
      db: process.env.MONGO,
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

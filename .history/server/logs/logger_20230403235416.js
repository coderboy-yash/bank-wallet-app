import { createLogger, transports, format } from "winston";
import "winston-mongodb";
// import winston from "winston";
export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new MongoDBTransport({
      level: "info",
      db: process.env.MONGO,
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

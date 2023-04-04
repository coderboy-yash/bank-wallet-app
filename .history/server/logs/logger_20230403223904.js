import { createLogger, transports, format } from "winston";
// import winston from "winston";
export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

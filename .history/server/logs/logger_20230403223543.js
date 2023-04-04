import { createLogger, transports, format } from "winston";
import winston from "winston/lib/winston/config";
export const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: winston.format.json(),
    }),
  ],
});

import { createLogger, transports, format } from "winston";
const logger=createLogger({
    transports:[
        new transports.Console({
            level:"Info"
        })
    ]
})
e
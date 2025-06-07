import { createLogger, format, transports } from "winston"; // importando o winston usado para log
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// confugurção do que vai aparecer no logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), //formatação da data
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`; // retorno no terminal
    })
  ),
  transports: [
    new transports.Console(),
    // criando arquivo para registros
    new transports.File({ filename: path.join(__dirname, "logs", "error.log"), level: "error" }), 
    new transports.File({ filename: path.join(__dirname, "logs", "combined.log") })
  ]
});

export default logger;

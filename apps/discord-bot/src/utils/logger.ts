/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { addColors, config, createLogger, format, transports } from "winston";
// eslint-disable-next-line @EslintImports/no-unassigned-import
import "winston-daily-rotate-file";
import crypto from "node:crypto";
import path from "node:path";

//--------------------------------
// Log Levels
//--------------------------------

const LEVELS = {
	emergency: 0,
	alert: 1,
	critical: 2,
	error: 3,
	warning: 4,
	notice: 5,
	info: 6,
	debug: 7
} as const;

//--------------------------------
// Log Colors
//--------------------------------
addColors({
	emergency: "bgRed white",
	alert: "bgYellow black",
	critical: "bgMagenta white",
	error: "red",
	warning: "yellow",
	notice: "cyan",
	info: "green",
	debug: "blue"
} satisfies Record<keyof typeof LEVELS, string>);

//--------------------------------
// Logs Directory
//--------------------------------
const logsDir = path.join(process.cwd(), "logs");

//--------------------------------
// Logger Configuration
//--------------------------------

export const logger = createLogger({
	level: process.env.NODE_ENV === "production" ? "info" : "debug",
	levels: config.syslog.levels,
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss"
		}),
		format(info => {
			info.requestId = `${Date.now().toString(36)}${crypto.randomInt(100).toString().padStart(2, "0")}`;
			return info;
		})(),
		format.ms(),
		format.json(),
		format.align()
	),
	handleExceptions: true,
	exceptionHandlers: [new transports.File({ filename: path.join(logsDir, "exception.log") })],
	rejectionHandlers: [new transports.File({ filename: path.join(logsDir, "rejections.log") })],
	transports: [
		// Console Transport
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.simple(),
				format.printf(
					({ level, message, timestamp, context, ms, requestId }) =>
						`[${timestamp}] [${requestId}] [${context}] ${level}: ${message} ${ms}`
				)
			)
		}),
		// Combined Log File Transport
		new transports.File({
			filename: path.join(logsDir, "combined.log"),
			maxsize: 10 * 1024 * 1024, // 10MB
			maxFiles: 5,
			tailable: true,
			zippedArchive: true,
			format: format.combine(format.uncolorize(), format.timestamp(), format.json())
		}),
		// Error Log File Transport
		new transports.DailyRotateFile({
			filename: path.join(logsDir, "error.log"),
			level: "error",
			maxSize: 250 * 1024 * 1024, // 10MB // TODO: api env
			maxFiles: "14d",
			zippedArchive: true,
			format: format.combine(format.uncolorize(), format.timestamp(), format.json())
		})
	],
	exitOnError: false
});

export default logger;

//TODO: Custom Transports support (DB/Telegram/syslog etc)

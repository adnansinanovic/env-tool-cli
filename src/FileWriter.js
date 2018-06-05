const fs = require(`fs`);
const path = require(`path`);
const logger = require(`./logger`).default;

export default class FileWriter {
    constructor() {
    }

    async write(options, stream) {
        try {
            const envFile = path.resolve(options.outputPath);
            const fileStream = fs.createWriteStream(envFile, { encoding: options.encoding });
            stream.pipe(fileStream);
            logger.info(`File saved: '${options.outputPath}'`);
        } catch (error) {
            logger.error(`FileWriterError`, error);
        }
    }
}
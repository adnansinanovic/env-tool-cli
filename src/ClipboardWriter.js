const StringStream = require(`stringstream`);
const cp = require(`copy-paste`);
const logger = require(`./logger`).default;
const Promise = require(`bluebird`);

export default class ClipboardWriter {
    constructor() {
        this.copy = Promise.promisify(cp.copy, { context: this });
    }

    async write(options, stream) {
        try {
            stream.pipe(new StringStream());
            await this.copy(stream);
            logger.info(`Written to clipboard`);
        } catch (error) {
            logger.error(`ClipboardWriter Error`, error);
        }
    }
}

const logger = require(`./logger`).default;

export class ModeResolver {
    constructor() {
    }

    resolve(config) {
        let mode = null;

        try {
            if (config.mode.toLowerCase() === `auto`) {
                JSON.parse(config.input);
                mode = `j2e`;
            }
        } catch (error) {
            mode = `e2j`;
        } finally {
            logger.info(`Mode resolved as '${mode}'`);
        }

        return mode;
    }
}

const instance = new ModeResolver();
export default instance;


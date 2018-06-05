const colors = require(`colors/safe`);

class Logger {
    constructor () {
        this.writer = console;
    }

    log(msg, obj) {
        obj ? this.writer.log(`- LOG: ${msg}`, obj) : this.writer.log(`- LOG: ${msg}`);
    }

    info(msg, obj) {
        msg = colors.green(`- INFO: ${msg}`);
        obj ? this.writer.warn(msg, obj) : this.writer.warn(msg);
    }

    warn(msg, obj) {
        msg = colors.yellow(`- INFO: ${msg}`);
        obj ? this.writer.info(msg, obj) : this.writer.info(msg);
    }

    error(msg, error) {
        this.writer.error(colors.red(`- ERROR: ${msg}`), error);
    }
}

const instance = new Logger();
export default instance;
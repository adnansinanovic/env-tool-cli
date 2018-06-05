const logger = require(`./logger`).default;
const fs = require(`fs`);
const modeResolver = require(`./ModeResolver`).default;
const writerFactory = require(`./WriterFactory`).default;
const Env2Json = require(`./Env2Json`).default;
const Json2Env = require(`./Json2Env`).default;

export class Program {
    constructor() {
        this.getWriters = (options) => {
            const writers = [];
            if (options.clipboardOut === true) {
                logger.info(`Clipboard writer resolved`);
                writers.push(writerFactory.getWriter(`clipboard`));
            }

            if (options.outputPath) {
                logger.info(`File writer resolved`);
                writers.push(writerFactory.getWriter(`file`));
            }

            return writers;
        };
    }
    async run(argv) {
        const converters = { e2j: Env2Json, j2e: Json2Env };

        const config = {
            inputPath: argv.input,
            outputPath: argv.output,
            encoding: argv.encoding,
            clipboardIn: argv.input === ``,
            clipboardOut: argv.clipboard,
            mode: argv.mode,
            input: null
        };

        config.input = await this.readInput(config);
        config.mode = modeResolver.resolve(config);

        const converter = new converters[config.mode];
        const streamReadable = await converter.convert(config);

        const writers = this.getWriters(config);

        for (const writer of writers) {
            await writer.write(config, streamReadable);
        }
    }

    async readInput(config) {
        if (config.clipboardIn === true) {
            return require(`copy-paste`).paste();
        }

        return fs.readFileSync(config.inputPath, { encoding: config.encoding });
    }
}

const instance = new Program();
export default instance;
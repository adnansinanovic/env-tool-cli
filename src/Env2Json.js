const fs = require(`fs`);
const path = require(`path`);
const stream = require(`stream`);

export default class Env2Json {
    constructor() {
    }

    async convert(options) {
        const src = await this.getSource(options);
        const parsedObj = await this.parse(src);

        const readableStream = new stream.Readable({ objectMode: true });
        readableStream.push(JSON.stringify(parsedObj));
        readableStream.push(null);
        return readableStream;
    }

    async getSource(options) {
        const encoding = options.encoding;
        const clipboard = options.clipboard;
        const envFile = path.resolve(options.inputPath);

        if (clipboard === true) {
            return require(`copy-paste`).paste();
        }

        return fs.readFileSync(envFile, { encoding: encoding });
    }

    /**
     * Original code: https://github.com/motdotla/dotenv/blob/master/lib/main.js
     * Parses a string or buffer into an object
     * @param {(string|Buffer)} src - source to be parsed
     * @returns keys and values from src
     * @memberof Env2Json
     */
    async parse(src) {
        const obj = {};

        // convert Buffers before splitting into lines and processing
        src.toString().split(`\n`).forEach((line) => {
            // matching "KEY' and 'VAL' in 'KEY=VAL'
            const item = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
            // matched?
            if (item != null) {
                const key = item[1];

                // default undefined or missing values to empty string
                let value = item[2] || ``;

                // expand newlines in quoted values
                const length = value ? value.length : 0;
                if (length > 0 && value.charAt(0) === `"` && value.charAt(length - 1) === `"`) {
                    value = value.replace(/\\n/gm, `\n`);
                }

                // remove any surrounding quotes and extra spaces
                value = value.replace(/(^['"]|['"]$)/g, ``).trim();

                obj[key] = value;
            }
        });

        return obj;
    }
}
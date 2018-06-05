const path = require(`path`);
const fs = require(`fs`);
const stream = require(`stream`);

export default class Json2Env {
    constructor() {
        this.isCamelCase = (str) => { return !!str.match(/^[a-z]+[A-Z]/); };
        this.camelToSnakeCase = (str) => { if (this.isCamelCase(str)) { return str.replace(/[A-Z]/g, `\_$&`); } return str; };
    }

    async convert(options) {
        const readableStream = new stream.Readable({ objectMode: true });
        this.build(JSON.parse(options.input), readableStream);
        readableStream.push(null);
        return readableStream;
    }

    async getSource(options) {
        const clipboard = options.clipboard;
        const jsonFile = path.resolve(options.inputPath);
        const encoding = options.encoding;

        if (clipboard === true) {
            return JSON.parse(require(`copy-paste`).paste());
        }
        return fs.readFileSync(jsonFile, { encoding: encoding });
    }

    async build(obj, readableStream) {
        for (const item in obj) {
            if (typeof obj[item] == `string`) {
                const exportString = `${this.camelToSnakeCase(item).toUpperCase()}=${obj[item]}\n`;
                readableStream.push(exportString);
            } else if (typeof obj[item] == `object`) {
                this.build(obj[item], readableStream);
            }
        }
    }
}
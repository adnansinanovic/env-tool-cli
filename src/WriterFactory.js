const ClipboardWriter = require(`./ClipboardWriter`).default;
const FileWriter = require(`./FileWriter`).default;

export default class WriterFactory {
    constructor() {
    }

    static getWriter(type) {
        if (type === `clipboard`) {
            return new ClipboardWriter();
        }

        if (type === `file`) {
            return new FileWriter();
        }

        throw new Error(`Unknown writer type: '${type}'`);
    }
}
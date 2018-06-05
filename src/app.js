const colors = require(`colors`);
const logger = require(`./Logger`).default;
const program = require(`./program`).default;
const choices = [`auto`, `j2e`, `e2j`];

const argv = require(`yargs`)
    .help(`help`)
    .option(`c`, {
        alias: ``,
        describe: `input source is clipboard, not file`,
        default: false,
        type: `boolean`,
    })
    .option(`m`, {
        alias: `mode`,
        chocies: choices,
        describe: `Conversion method:\r\n- auto = tool will try to determine if it need to convert json-to-env or env-to-json\r\n- e2j = convert env-to-json\r\n- j2e = convert json-to-env`,
        type: `string`,
        default: `auto`
    })
    .option(`e`, {
        alias: `encoding`,
        describe: `Set input encoding`,
        default: `utf8`,
    })
    .option(`i`, {
        alias: `input`,
        describe: `Input file path. If not set, input source is clipboard`,
        type: `string`,
        default: ``,
    })
    .option(`o`, {
        alias: `output`,
        describe: `Output file path. If not set, output destination is clipboard.`,
        type: `string`,
        default: ``,
    })
    .option(`c`, {
        alias: `clipboard`,
        describe: `Use clipoboard as output. In case when --output is not set, --clipoard=true is true and cannot be overriden by user.`,
        type: `boolean`,
        default: true
    })
    .check((yargs) => {
        if (choices.indexOf(yargs.mode) === -1) {
            throw (new Error(colors.red(`ERROR: Invalid 'mode' value: ${yargs.mode}`)));
        }

        if (yargs.output === `` && yargs.clipboard === false) {
            yargs.clipboard = true;
            logger.warn(`INFO: Output is not set. Output will be stored to clipboard.`);
        }

        return true;
    })
    .argv;

async function main() {
    try {
        await program.run(argv);
        logger.info(`Completed`);
    } catch (error) {
        logger.error(`Error:`, error);
    }
}

main();
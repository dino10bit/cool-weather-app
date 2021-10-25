'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.commands = void 0;
const tslib_1 = require('tslib');
const yargs = (0, tslib_1.__importStar)(require('yargs'));
const chalk_1 = (0, tslib_1.__importDefault)(require('chalk'));
const dimmed = chalk_1.default.dim;
const greyed = chalk_1.default.gray;
const bold = chalk_1.default.bold;
const version = require('../../package').version;
exports.commands = yargs
  .usage(`\nYou can run commands with "cognito-backup-restore" or the shortcut "cbr"\n
    Usage: $0 <command> [options]`)
  .option('city', {
    alias: [ 'c' ],
    describe: dimmed `The city to use.`,
    string: true,
    conflicts: [ 'importFile' ],
  })
  .option('temperature', {
    alias: [ 't' ],
    describe: dimmed `Use Fahrenheit temperature scale (default is Celsius).`,
    string: true,
    default: 'c',
    choices: [ 'c', 'f' ],
    conflicts: [ 'importFile' ],
  })
  .option('importFile', {
    alias: [ 'import', 'i' ],
    describe: dimmed `Import file of cities for search.`,
    string: true,
  })
  .help('help', dimmed `Show help`)
  .alias('help', 'h')
  .showHelpOnFail(false, bold `Specify --help for available options`)
  .version('version', dimmed `Show version number`, (function () {
    return version;
  })())
  .alias('version', 'v')
  .epilog(dimmed `\nPlease report any issues/suggestions here:\nhttps://github.com/rahulpsd18/cognito-backup-restore/issues\n`)
  .strict()
  .wrap(Math.min(120, yargs.terminalWidth()))
  .argv;
// # sourceMappingURL=commands.js.map

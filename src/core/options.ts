import * as yargs from 'yargs';
import chalk from 'chalk';

const dimmed = chalk.dim;
const bold = chalk.bold;

const version = require('../../package').version;

export const options = yargs
// header
  .usage(`\nYou can run commands with "cool-weather"\n
    Usage: cool-weather [options]`)

// options
  .option('city', {
    alias: [ 'c', 'z' ],
    describe: dimmed`Fetch weather for the city (example: -c Amsterdam) or zipcode(example: -z 38000, fr).`,
    string: true,
    conflicts: [ 'importFile' ],
  })
  .option('temperature', {
    alias: [ 't' ],
    describe: dimmed`Use Fahrenheit temperature scale (default is Celsius).`,
    string: true,
    default: 'c',
    choices: [ 'c', 'f' ],
  })
  .option('importFile', {
    alias: [ 'import', 'i' ],
    describe: dimmed`Import file of cities for search.`,
    string: true,
  })
  .option('last', {
    alias: [ 'l' ],
    describe: dimmed`Fetch weather for the latest query.`,
    type: 'boolean',
    conflicts: [ 'importFile', 'city' ],
  })

// help
  .help('help', dimmed`Show help`)
  .alias('help', 'h')
  .showHelpOnFail(false, bold`Specify --help for available options`)

// version
  .version('version', dimmed`Show application version number`, (function () {
    return version;
  })())
  .alias('version', 'v')

// footer
  .epilog(dimmed`\nPlease report any issues/suggestions here:\nhttps://github.com/dino10bit/cool-weather/issues\n`)
  .strict()
  .wrap(Math.min(120, yargs.terminalWidth()))
  .argv;

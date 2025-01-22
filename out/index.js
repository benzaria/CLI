import { Command } from "commander";
import chalk from "./lib/chalk";
// import chalkEx from "./lib/chalk.deprecated";
const echo = console.log;
const write = process.stdout.write.bind(process.stdout);
(async function () {
    const program = new Command();
    program
        .name('mycli')
        .version('1.0.0')
        .description('An example CLI tool');
    program
        .option('-d, --debug [bool]', 'enable debug mode', false)
        .option('-c, --copy <dest>', 'copy file to destination')
        .argument('<file>', 'file to process')
        .action((file, options) => {
        echo(`Debug mode : ${options.debug}`);
        echo(`copy mode : ${options.copy}`);
        echo(`Processing file: ${file}`);
    });
    program
        .command('clone <repo>')
        .action((options) => {
        echo('cloning', options.clone);
    });
    /* test chalk extend */
    echo('Line 1');
    echo('Line 2');
    echo('Line 3');
    chalk
        .upline(2, chalk.bold.red('This replaces Line 2!'))
        .dnline(2);
    await chalk.XY(11, 5, 'sheeeeeesh');
    /**/
    //write(ansi.cursorGetPosition)
    program.configureHelp({
        sortSubcommands: true,
        sortOptions: true,
        optionTerm: (option) => `${chalk.blueBright(option.short)}, ${chalk.redBright(option.long)}`,
        subcommandTerm: (cmd) => `${cmd.name()}`
    });
    program.parse(process.argv);
})();
//# sourceMappingURL=index.js.map
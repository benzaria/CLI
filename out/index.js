import { Command } from "commander";
(async function () {
    const echo = console.log;
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
            echo(`Debug mode : ${options.copy}`);
            echo(`Processing file: ${file}`);
        });
    program.parse(process.argv);
})();

import { Command } from "commander";
import { input } from "@inquirer/prompts";
import chalk from "./lib/chalk";
import ansi from "ansi-escapes";
import dialog from "dialog-node";
// import promisify from "@gar/promisify";
import promisify, { Promisify } from "../test/es-promisify";
// import pify from "pify"

import '../types/index.d'
import * as fs from "fs";

export const echo = console.log;
export const write = process.stdout.write.bind(process.stdout);

// const promisify = new Promisify()

async function test() {

    // const prompt = (type: keyof typeof dialog, title: string = '', msg: string = '', timeout: number = 0) => new Promise(res =>
    //     dialog[type](msg, title, timeout, (code: number, retVal: string, stderr: string) => res({ code, retVal, stderr })));

    const prompt = promisify(dialog, { bind: "this" }).entry

    echo(await promisify(dialog, { bind: dialog }).entry('Input Prompt', 'Please enter your name:', 0))

    //echo(await prompt('Input Prompt', 'Please enter your name:', 0))

    const obj = {
        fn: function (arg: string) {
            setTimeout(() => {
                echo('this', this)
                this.s = arg.toUpperCase()
            }, 1000);
        },
        fn2: (arg: string, cb: Function = () => { }) => {
            setTimeout(() => {
                cb(null, arg.toUpperCase())
            }, 2000);
        },
        s: 'string'
    }

    const fnp = promisify(function (arg: string, cb?) {
        setTimeout(() => {
            cb(null, arg.toUpperCase())
        }, 1000);
    }, 2000);

    // const dial_1 = pify(obj)
    const dial_2 = promisify(obj)

    echo(await fnp('ddd'))


    // echo(await dial.info('msg1', 'title', 0))

    // echo(await fnp.info('msg', 'title', 0))

    echo('done');
}
test()
    ;
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
        .action((file: string, options: { debug: boolean, copy: string }) => {
            echo(`Debug mode : ${options.debug}`);
            echo(`copy mode : ${options.copy}`);
            echo(`Processing file: ${file}`);
        });

    program
        .command('clone <repo>')
        .action((options: { clone: URL }) => {
            echo('cloning', options.clone)
        });

    /* test chalk extend */
    echo('Line 1');
    echo('Line 2');
    echo('Line 3');
    chalk
        .upline(2, chalk.bold.red('This replaces Line 2!'))
        .dnline(2);

    await chalk.XY(11, 5, 'sheeeeeesh')
    await chalk.XY()
    /**/

    program.configureHelp({
        sortSubcommands: true,
        sortOptions: true,
        optionTerm: (option) => `${chalk.blueBright(option.short)}, ${chalk.redBright(option.long)}`,
        subcommandTerm: (cmd) => `${cmd.name()}`
    });


    program.parse(process.argv);
})

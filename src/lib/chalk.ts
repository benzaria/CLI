import { Chalk } from "chalk";
import * as ansi from "ansi-escapes";
import './chalk.d'

const { stdin, stdout } = process;

const chalk = new Chalk();
const write = stdout.write.bind(process.stdout);

chalk.upline = function (line = 1, replace = '') {
    write(ansi.cursorUp(line) + replace);
    return this;
}

chalk.dnline = function (line = 1, replace = '') {
    write(ansi.cursorDown(line) + replace);
    return this;
}

chalk.move = function (x, y, replace = '') {
    if (x && y)
        write(ansi.cursorMove(x, y) + replace);
    return this;
}

chalk.XY = function (x, y, replace = '') {
    if (x && y) {
        write(ansi.cursorTo(x, y) + replace);
        return this;
    }
    return new Promise((resolve, reject) => {
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding("utf8");

        process.stdout.write("\x1b[6n");

        stdin.once("data", (data: string) => {
            const match = /\x1b\[(\d+);(\d+)R/.exec(data);
            stdin.setRawMode(false);
            stdin.pause();

            if (match) {
                resolve({ x: +match[1], y: +match[2] });
            } else {
                reject(new Error("Failed to parse cursor position"));
            }
        });
    });
}

export default chalk;
// src/index.ts
import { Command } from "commander";

// src/lib/chalk.ts
import { Chalk } from "chalk";
import * as ansi from "ansi-escapes";
var { stdin, stdout } = process;
var chalk = new Chalk();
var write = stdout.write.bind(process.stdout);
chalk.upline = function(line = 1, replace = "") {
  write(ansi.cursorUp(line) + replace);
  return this;
};
chalk.dnline = function(line = 1, replace = "") {
  write(ansi.cursorDown(line) + replace);
  return this;
};
chalk.move = function(x, y, replace = "") {
  if (x && y)
    write(ansi.cursorMove(x, y) + replace);
  return this;
};
chalk.XY = function(x, y, replace = "") {
  if (x && y) {
    write(ansi.cursorTo(x, y) + replace);
    return this;
  }
  return new Promise((resolve, reject) => {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    process.stdout.write("\x1B[6n");
    stdin.once("data", (data) => {
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
};
var chalk_default = chalk;

// src/index.ts
var echo = console.log;
var write2 = process.stdout.write.bind(process.stdout);
(async function() {
  const program = new Command();
  program.name("mycli").version("1.0.0").description("An example CLI tool");
  program.option("-d, --debug [bool]", "enable debug mode", false).option("-c, --copy <dest>", "copy file to destination").argument("<file>", "file to process").action((file, options) => {
    echo(`Debug mode : ${options.debug}`);
    echo(`copy mode : ${options.copy}`);
    echo(`Processing file: ${file}`);
  });
  program.command("clone <repo>").action((options) => {
    echo("cloning", options.clone);
  });
  program.configureHelp({
    sortSubcommands: true,
    sortOptions: true,
    optionTerm: (option) => `${chalk_default.blueBright(option.short)}, ${chalk_default.redBright(option.long)}`,
    subcommandTerm: (cmd) => `${cmd.name()}`
  });
  program.parse(process.argv);
})();
//# sourceMappingURL=index.js.map
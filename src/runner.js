const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const assert = require("assert");

const render = require("./render");

const forbiddenDirs = ["node_modules"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTest() {
    for (let file of this.testFiles) {
      console.log(chalk.grey(`\n[O] ${file.shortName}`));
      const beforeEaches = [];

      global.assert = assert;

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green(`\t[+] -- ${desc}`));
        } catch (error) {
          const message = error.message.replace(/\n/g, "\n\t\t");
          console.log(chalk.red(`\t[-] -- ${desc}`));
          console.log(chalk.red(`\t${message}`));
        }
      };

      global.render = render;

      try {
        require(file.name);
      } catch (error) {
        console.log(
          chalk.red(`[-] -- Error loading file ${file.name}:\n${error} `)
        );
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;

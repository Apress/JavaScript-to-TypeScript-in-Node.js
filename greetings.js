import * as _ from 'lodash-es';
import { Command } from '../chapter4/node_modules/commander/esm.mjs';
import Prompt from "../chapter4/node_modules/@cloud-technology/cli-prompt";
import chalk from 'chalk';
import boxen from 'boxen';
import { readlevel } from './levels.js';
import fetch from 'node-fetch';

const program = new Command();
program.version('0.0.1')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-l, --level <type>', 'the level of our maze we want to load')
  .option('-f, --fetch', 'fetch the data from our api instead of local')

program.parse(process.argv);
const options = program.opts();

if (options.level) console.log(`my level is ${options.level}`);

const args = process.argv.splice(2);
console.log(args);
console.log(chalk.blue('hello welkom to the maze'));

const f = await fetch('http://localhost:4444/maze/')

const level = options.fetch ? await f.json() : await readlevel(1)
let x = 0, y = 0;

console.log(level)
console.log(options.fetch)

async function navigation() {
  const Query = await Prompt("What is the direction you want to go? " + chalk.green("(R L U D Q)") + ":");
  const current = level[y][x];
  console.log(current, x, y);

  let navigationText = 'No clue where to go';
  if (Query === 'R') {
    if (current.right) {
      x += 1;
      navigationText = 'going right';
    } else {
      navigationText = 'we can not go right';
    }
  } else if (Query === 'L') {
    if (current.left) {
      x -= 1;
      navigationText = 'going left';
    } else {
      navigationText = 'we can not go left';
    }
  } else if (Query === 'U') {
    if (current.up) {
      y -= 1;
      navigationText = 'going up';
    } else {
      navigationText = 'we can not go up';
    }
  } else if (Query === 'D') {
    if (current.right) {
      y += 1;
      navigationText = 'going down';
    } else {
      navigationText = 'we can not go down';
    }
  } else if (Query === 'Q') {
    process.exit(0);
  }
  console.log(boxen(chalk.bold(navigationText) + ` (${x}, ${y})`, {padding: 1, borderStyle: 'double'}));
  await navigation();
}

await navigation();
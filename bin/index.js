#!/usr/bin/env node

const inquirer = require("inquirer");
const yargs = require("yargs");
const helpers = require("./helpers");
const responses = require("./foaasResponses");
const getBrownieQuestions = require('./brownieQuestions');

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

inquirer.prompt([
  {
    type: 'list',
    name: 'talker',
    message: `Hi ${options.name}, who do you want to talk to today?`,
    choices: ['Brownie Shytles', 'Woody Held', 'Phat Ho'],
  },
]).then(async (answers) => {
  if (helpers.getBoolean()) {
    console.log(await responses.getIdea(answers.talker));
    console.log('')

    if (answers.talker === 'Brownie Shytles') {
      getBrownieQuestions(options.name);
    }
  }
  else {
    const message = await responses.getDotWantToTalk(options.name, answers.talker);
    console.log(`I'm sorry ${answers.talker} said:`);
    console.log('');
    console.log(message);
  }
})
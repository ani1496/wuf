const inquirer = require("inquirer");
const helpers = require('./helpers');
const responses = require("./foaasResponses");

const getBrownieQuestions = (name) => {
  return inquirer.prompt([{
    type: 'input',
    name: 'lifeChange',
    message: 'Tell me something, what positive changes do you wanna feel in your life?',
    default: 'None, I suck',
  }, {
    type: 'input',
    name: 'mood',
    message: helpers.getBoolean() ? 'Over all how do you describe your mood?' : 'How do you feel today?',
  }]).then(async answers => {
    try {
      const sentiment = await helpers.getSentimentType(answers.mood);

      if (!sentiment || sentiment.error) return await console.log(responses.getDontCare('Brownie'));

      if (sentiment?.scores?.Positive > sentiment?.scores?.Negative) {
        return console.log(await responses.getCoolAnswer('Brownie'))
      }

      inquirer.prompt([{
        type: 'input',
        name: 'problem',
        message: 'What is the problem from your point of view?'
      },{
        type: 'list',
        name: 'feeling',
        message: `When you tell me you feel ${answers.mood}, what else do you feel?`,
        choices: ['sad', 'mad', 'hopeless', 'stuck', 'angry'],
      }]).then(async (negativeAnswers) => {
        const responseType = helpers.getBoolean() ? 'cheer' : 'disgrace';
        const response = responseType === 'cheer'
          ? await responses.getCheer(name, 'Brownie', negativeAnswers.problem)
          : await responses.getNoHope(name, 'Brownie');

        return console.log(response)
      })
    } catch {
      console.log('Something went wrong, fuck off')
    }
  });
}

module.exports = getBrownieQuestions;
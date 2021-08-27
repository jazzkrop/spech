const { NlpManager } = require('node-nlp')

manager = new NlpManager()
manager.load('./src/api/trainedModels/commands.nlp')

async function recognizeCommand(command) {
  const response = await manager.process('en', command)
  // console.log(response)
  return response
}

module.exports = recognizeCommand

// recognizeCommand("I want to add row").then((result) => {
//   console.log(result);
// });

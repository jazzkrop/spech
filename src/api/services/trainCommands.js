const { NlpManager } = require('node-nlp')
const fs = require('fs')

const commandsContent = fs.readFileSync('./src/api/datasets/commands.json')
const commands = JSON.parse(commandsContent)

const manager = new NlpManager({
  languages: ['en'],
  forceNER: true,
  autoSave: false
})

for (let i = 0; i < commands.length; i++) {
  const command = commands[i]
  manager.addDocument('en', command.command, command.type)
}

// Train and save the model.
;(async () => {
  await manager.train()
  manager.save('./src/api/trainedModels/commands.nlp')
  const response = await manager.process(
    'en',
    'I want to delete row with id 93'
  )
  console.log(response)
})()

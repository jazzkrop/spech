const recognizeCommand = require('./recognizeCommand')
const parseSimpleAction = require('./parseSimpleAction')
const buildHtml = require('./buildHtml')

const commandMethodMap = {
  simpleAction: parseSimpleAction
}

const command = 'I want to add row'
// const command = 'I want to add column with id 5 into row with id 1'
// const command = 'I want to delete column with id 9'

recognizeCommand(command).then((result) => {
  const commandType = result.classifications[0].intent
  commandMethodMap[commandType](command).then((result) => {
    buildHtml(result)
  })
})

// How to add new command
// 1. Add to api/entities actions or elements
// 2. node .\src\api\services\buildCommandsDataset.js
// 3. write synonyms to api/entities extended for action/element if you need
// 4. node .\src\api\services\trainEntities.js 
// 5. node .\src\api\services\trainCommands.js
// 6. in services/buildHtml.js write actions for your new command
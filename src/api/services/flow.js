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

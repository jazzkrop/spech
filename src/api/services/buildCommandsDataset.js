const fs = require('fs')

// Reading atoms (actions, elements). Smallest building blocks
const actionsContent = fs.readFileSync('./src/api/entities/actions.json')
const elementsContent = fs.readFileSync('./src/api/entities/elements.json')

const actions = Object.keys(JSON.parse(actionsContent))
const elements = JSON.parse(elementsContent)

const elementsKeys = Object.keys(JSON.parse(elementsContent))

let commands = []

// Generating combinations with actions and elements
for (let i = 0; i < actions.length; i++) {
  if (actions[i] == 'delete' || actions[i] == 'remove') {
    for (let z = 0; z < elements['id'].length; z++) {
      commands.push({
        command: `${actions[i]} ${elements['id'][z]}`,
        type: 'simpleAction'
      })
    }
  } else
    for (let j = 0; j < elementsKeys.length; j++) {
      commands.push({
        command: `${actions[i]} ${elementsKeys[j]}`,
        type: 'simpleAction'
      })
    }
}

// Saving combinations generated above to the file commands.json
fs.writeFileSync('./src/api/datasets/commands.json', JSON.stringify(commands))

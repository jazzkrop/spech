const keywordExtractor = require('keyword-extractor')
const fs = require('fs')

const typo = require('typo-js')
const dictionary = new typo('en_US')

const entitiesContent = fs.readFileSync('./src/api/trainedModels/entities.nlp')
const actionsExtendedContent = fs.readFileSync(
  './src/api/entities/actionsExtended.json'
)
const elementsExtendedContent = fs.readFileSync(
  './src/api/entities/elementsExtended.json'
)

const entities = JSON.parse(entitiesContent)
const actionsExtended = JSON.parse(actionsExtendedContent)
const elementsExtended = JSON.parse(elementsExtendedContent)

async function parseSimpleAction(command) {
  // TODO as an idea - implement NOUN, VERB detectors
  const extractionResult = keywordExtractor.extract(command, {
    language: 'english',
    remove_digits: false,
    return_changed_case: true,
    remove_duplicates: false
  })
  const result = {}

  extractionResult.forEach((word) => {
    if (isNumeric(word)) {
      result['id'] = word
    }
    if (entities[word]) {
      if (!result[entities[word]]) result[entities[word]] = word
    } else {
      if (!dictionary.check(word)) {
        word = dictionary.suggest(word)[0]
        if (entities[word]) {
          result[entities[word]] = word
        }
      }
    }
  })
  // check for synonyms
  if (result['action']) {
    let synonymFinded = false
    actionsExtended.forEach((action) => {
      if (synonymFinded) return

      if (action['origin'] != result['action']) {
        if (action['synonyms'])
          action['synonyms'].forEach((synonym) => {
            if (result['action'] == synonym) {
              result['action'] = action['origin']
              synonymFinded = true
              return
            }
          })
      }
    })
  }

  // console.log(result)
  return result
}
function isNumeric(value) {
  return /^-?\d+$/.test(value)
}
// parseSimpleAction("I want to add fantastic row").then((result) => {
//   console.log(result);
// });

module.exports = parseSimpleAction

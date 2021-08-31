const fs = require('fs')
const json2html = require('node-json2html')

// let buildedCommand = {
//   action: 'add',
//   element: 'row',
//   id: '1'
// }

//function takes json of builded command and return builded html
function buildHtml(buildedCommand) {
  let template = JSON.parse(
    fs.readFileSync('./src/api/jsonRes/modelOfHtml.json', 'utf-8')
  )
  let components = JSON.parse(
    fs.readFileSync('./src/api/jsonRes/jsonComponents.json')
  )

  //clean up template from null and undefinded
  template = template.filter(function (el) {
    return el != null
  })
  // console.log(buildedCommand)

  // COMMAND: CLEAR
  if (buildedCommand.action == 'clear') {
    template = []
  } 
  // COMMAND: ADD
  else if (buildedCommand.action == 'add') {
    // search in existing components
    let component = components[buildedCommand.element]
    if (!component) return undefined
    // add for new element unique id
    component['id'] = findFreeId(template)
    // when id exist in builded command it adds into block with this id
    if (buildedCommand.id) {
      addIntoElementWithId(template, component, buildedCommand.id)
    } else template.push(component)
  } 
  // COMMAND: DELETE
  else if (buildedCommand.action == 'delete') {
    //find by id and delete this element
    if (!buildedCommand.id) return undefined
    deleteById(template, buildedCommand.id)
  } else return undefined

  // generate html from json template
  let html = json2html.render({}, template)

  // update json model
  fs.writeFileSync(
    './src/api/jsonRes/modelOfHtml.json',
    JSON.stringify(template)
  )
  return html
  // fs.writeFileSync('./src/api/jsonRes/result.html', html)
}

// return id that not exist in html like string
function findFreeId(template) {
  //find all existed id
  let existedId = []
  existedId = findAllId(template, existedId)
  let i = 1
  while (true) {
    if (!existedId.includes(i)) {
      return i.toString()
    } else i++
  }
}

// add to Obj template
function addIntoElementWithId(template, component, id) {
  for (const key of Object.keys(template)) {
    if (template[key]['id'] == id) template[key]['html'].push(component)
    else if (Array.isArray(template[key]['html']))
      addIntoElementWithId(template[key]['html'], component, id)
  }
}

// return array of all existed id
function findAllId(template, existedId) {
  for (const key of Object.keys(template)) {
    if (isNumeric(template[key]['id']))
      existedId.push(parseInt(template[key]['id']))
    if (Array.isArray(template[key]['html'])) {
      existedId = findAllId(template[key]['html'], existedId)
    }
  }
  return existedId
}
// delete by id in template
function deleteById(template, id) {
  for (const key of Object.keys(template)) {
    if (template[key]['id'] == id) {
      delete template[key]
      return
    } else if (Array.isArray(template[key]['html'])) {
      deleteById(template[key]['html'], id)
    }
  }
}

// helper function for checking if string is Numeric
function isNumeric(value) {
  return /^\d+$/.test(value)
}

module.exports = buildHtml

const fs = require('fs')
const json2html = require('node-json2html')

function generateHtmlFile() {
  const path = './src/api/jsonRes/result.html'
  const template = JSON.parse(
    fs.readFileSync('./src/api/jsonRes/modelOfHtml.json', 'utf-8')
  )

  const html = json2html.render({}, template)

  fs.writeFileSync(path, html)

  return '/src/api/jsonRes/result.html'
}

module.exports = generateHtmlFile
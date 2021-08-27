const CommandService = require('./Command.service')
const httpStatus = require('http-status')

const recognizeCommand = require('../../services/recognizeCommand')
const parseSimpleAction = require('../../services/parseSimpleAction')
const buildHtml = require('../../services/buildHtml')
const generateHtmlFile = require('../../services/generateHtmlFile')
const path = require("path");

__dirname = path.resolve();

class CommandController {
  constructor() {}

  getHtml(req, res) {
    const { str } = req.body

    recognizeCommand(str).then((result) => {
      const commandMethodMap = {
        simpleAction: parseSimpleAction
      }

      const commandType = result.classifications[0].intent
      
      commandMethodMap[commandType](str).then((result) => {
        res.status(200).send(JSON.stringify({html: buildHtml(result)}))
      })
    })
    // Sending response
    //status(httpStatus[200]).
  }
  downloadHtml(req,res) {
    res.sendFile(path.resolve(__dirname + generateHtmlFile()))
  }
}

module.exports = CommandController

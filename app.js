const express = require('express')
const fs = require('fs')
const logger = require('./src/global/logger')
const routesV1 = require('./src/api/domains/routes')
const cors = require('cors')

const app = express()

const port = process.env.PORT || '3000'

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
    'Content-type'
  )

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next()
})

app.use(
  express.urlencoded({
    extended: false
  })
)

// app.use(express.text())
app.use(express.json())

app.use(cors())


// const router = express.Router()
// router.get('/commands', function (req, res) {
//   res.send('Birds home page')
// })
app.use('/api', routesV1)

fs.writeFileSync('./src/api/jsonRes/modelOfHtml.json', "[]")

app.listen(port, () => {
  logger.info(`Listening at port: ${port}`)
})

module.exports = app

const express = require('express')
const { CommandRoute } = require('./Command')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/commands',
    route: CommandRoute
  },
]
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router

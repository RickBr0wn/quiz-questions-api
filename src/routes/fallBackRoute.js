const express = require('express')
var router = express.Router()
const controller = require('../controllers/fallBackController')

router.get('/', controller.fallBackController)

module.exports = router

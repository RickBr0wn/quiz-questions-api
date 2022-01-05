const express = require('express')
var router = express.Router()
const controller = require('../controllers/healthCheckController')

router.get('/check', controller.healthCheckController)

module.exports = router

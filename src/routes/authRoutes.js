const express = require('express')
var router = express.Router()
const controller = require('../controllers/authenticationController')

/**
 * @summary AUTHENTICATION - LOGIN
 * @route   POST /api/quiz/auth/login
 * @access  Public
 * @header  null
 * @body    null
 * @returns json
 * {
 *   route: string,
 *   error: boolean,
 *   count: int
 *   questions: [
 *     _id: string,
 *     question: string,
 *     answers: [string, string, ...]
 *   ]
 *  }
 *
 */
router.get('/login', controller.authController)

module.exports = router

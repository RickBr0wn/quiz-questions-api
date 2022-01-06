const express = require('express')
var router = express.Router()
const controller = require('../controllers/getAllQuestionsController')

/**
 * @summary GET ALL QUESTIONS
 * @route   GET /api/quiz/questions/get-all-questions
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
router.get('/questions/get-all-questions', controller.getAllQuestionsController)

module.exports = router

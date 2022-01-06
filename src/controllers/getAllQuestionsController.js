const Question = require('../models/question')
const config = require('../config/config')
const logger = require('../middleware/logging')

const NAMESPACE = 'GET ALL QUESTIONS CONTROLLER'

const getAllQuestionsController = (req, res) => {
	/* success */
	res.status(200)
	/* log the success */
	logger.info(NAMESPACE, `Get all questions called.`)
	/* to use in the response objects */
	const queries = '/api/quiz/questions/get-all-questions/'
	/* Query all of the documents */
	Question.find()
		.select('_id question answers')
		.exec()
		.then((documents) => {
			/* handles the case where there are no documents in the database */
			if (documents.length === 0) {
				res.json({
					route: config.server.url + queries,
					status: 200,
					message: `Welcome to the quiz-question-api. There are currently no questions. Please add a new 'question' to get started.`
				})
			}
			/* response object */
			const response = {
				route: config.server.url + queries,
				status: res.status,
				error: false,
				count: documents.length,
				questions: documents.map((document) => ({
					_id: document._id,
					question: document.question,
					answers: document.answers,
					request: {
						type: 'GET',
						url: config.server.url + queries + document._id
					}
				}))
			}
			/* return the response object */
			res.json(response)
		})
		.catch((error) => {
			/* handle any errors */
			res.status = error.status || 500
			res.json({
				route: config.server.url + queries,
				status: res.status,
				error: error.message
			})
		})
}

module.exports = { getAllQuestionsController }

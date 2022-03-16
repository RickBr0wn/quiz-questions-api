const Question = require('../models/question')
const config = require('../config/config')
const logger = require('../middleware/logging')

const NAMESPACE = 'ALL_Qs'

const getAllQuestionsController = (req, res) => {
	/* log the success */
	logger.info(NAMESPACE, `Get all questions has been called. ${req.baseUrl}`)
	/* to use in the response objects */
	const route = '/api/quiz/questions/get-all-questions/'
	/* Query all of the documents */
	Question.find()
		.select('_id question answers')
		.exec()
		.then(documents => {
			/* handles the case where there are no documents in the database */
			if (documents.length === 0) {
				return res.status(200).json({
					route: config.server.url + route,
					status: res.status,
					error: false,
					count: documents.length,
					questions: ['no questions in database']
				})
			}
			/* response object */
			const response = {
				route: config.server.url + route,
				status: res.status,
				error: false,
				count: documents.length,
				questions: documents.map(document => ({
					_id: document._id,
					question: document.question,
					answers: document.answers,
					request: {
						type: 'GET',
						url: config.server.url + route + document._id
					}
				}))
			}
			/* return the response object */
			return res.status(200).json(response)
		})
		.catch(error => {
			/* handle any errors */
			return res.status(error.status || 500).json({
				route: config.server.url + route,
				status: res.status,
				error: error.message
			})
		})
}

module.exports = { getAllQuestionsController }

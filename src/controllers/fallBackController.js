const config = require('../config/config')
const logger = require('../middleware/logging')
const NAMESPACE = 'HOME__'

const fallBackController = (req, res) => {
	logger.info(NAMESPACE, `Fall back called.`)

	let queries = req.url

	return res.status(200).json({
		route: config.server.url + queries,
		status: res.status,
		error: false,
		count: 0,
		message: 'welcome to the quiz-questions-api.'
	})
}

module.exports = { fallBackController }

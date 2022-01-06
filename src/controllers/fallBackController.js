const config = require('../config/config')
const logger = require('../middleware/logging')
const NAMESPACE = 'FALL BACK CONTROLLER'

const fallBackController = (req, res) => {
	logger.info(NAMESPACE, `Fall back called.`)

	return res.status(200).json({
		status: 200,
		endpoint: `${config.server.url}${req.url}`,
		config: config.mongo.url,
		message: 'welcome to the quiz-questions-api.'
	})
}

module.exports = { fallBackController }

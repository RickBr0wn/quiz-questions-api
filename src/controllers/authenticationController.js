const config = require('../config/config')
const logger = require('../middleware/logging')
const NAMESPACE = 'AUTH__'

const authController = (req, res) => {
	logger.info(NAMESPACE, `auth controller called.`, config.server.url + req.url)

	let queries = req.url

	return res.status(200).json({
		route: config.server.url + queries,
		status: res.status,
		error: false,
		count: 0,
		message: 'auth'
	})
}

module.exports = { authController }

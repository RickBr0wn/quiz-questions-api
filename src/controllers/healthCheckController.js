const config = require('../config/config')
const logger = require('../middleware/logging')
const NAMESPACE = 'HEALTH'

const healthCheckController = (req, res) => {
	logger.info(NAMESPACE, `Server health check called.`)

	return res.status(200).json({
		status: 200,
		endpoint: `${config.server.url}/health/check`,
		message: `server successfully running on ${config.server.name}`
	})
}

module.exports = { healthCheckController }

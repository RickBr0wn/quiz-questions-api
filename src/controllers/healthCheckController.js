const config = require('../config/config')
const logger = require('../middleware/logging')
const NAMESPACE = 'HEALTH CHECK CONTROLLER'

const healthCheckController = (req, res, next) => {
	logger.info(NAMESPACE, `Server health check called.`)

	return res.status(200).json({
		message: `✅ : server running on ${config.server.name}:${config.server.port}`
	})
}

module.exports = { healthCheckController }

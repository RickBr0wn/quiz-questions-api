const http = require('http')
const https = require('https')
const logger = require('./middleware/logging')
const bodyParser = require('body-parser')
/** define & initialise express */
const express = require('express')
const router = express()
/** load the config object */
const config = require('./config/config')
/** load the route files */
const healthCheckRoutes = require('./routes/healthCheckRoute')
/** define the namespace for logging */
const NAMESPACE = 'SERVER'

/** log the request */
router.use((req, res, next) => {
	logger.info(
		NAMESPACE,
		`METHOD - ${req.method}, URL - ${req.url}, IP - ${req.socket.remoteAddress}`
	)

	res.on('finish', () => {
		logger.info(
			NAMESPACE,
			`METHOD - ${req.method}, URL - ${req.url}, IP - ${req.socket.remoteAddress}, STATUS - ${res.statusCode}`
		)
	})

	next()
})

/** parse the request */
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/** handle potential CORS issues */
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
	}

	next()
})

/** routes */
router.use('/health/', healthCheckRoutes)

/** error handling */
router.use((req, res, next) => {
	const error = new Error('❌ 404 - Page Not Found!')

	return res.status(404).json({
		message: error.message
	})
})

/** create the server */
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () =>
	logger.info(
		NAMESPACE,
		`Server running on ${config.server.name}:${config.server.port}`
	)
)

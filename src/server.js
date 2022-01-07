const http = require('http')
const https = require('https')
const logger = require('./middleware/logging')
const bodyParser = require('body-parser')
/** define & initialise express */
const express = require('express')
const router = express()
/** load mongoose */
const mongoose = require('mongoose')
/** load the config object */
const config = require('./config/config')
/** load the route files */
const healthCheckRoutes = require('./routes/healthCheckRoute')
const fallBackRoute = require('./routes/fallBackRoute')
const apiRoutes = require('./routes/apiRoutes')
const res = require('express/lib/response')
/** define the namespace for logging */
const NAMESPACE = 'SERVER'

mongoose.connect(config.mongo.url, config.mongo.options)

const db = mongoose.connection

db.on('connected', () => {
	logger.info(
		NAMESPACE,
		`Mongo database connected via ${
			process.env.NODE_ENV === 'production'
				? 'https://quiz-questions-api.herokuapp.com'
				: config.mongo.url
		}`
	)
})

db.on('error', (err) => {
	logger.error(
		NAMESPACE,
		`Connection error ${
			process.env.NODE_ENV === 'production'
				? 'https://quiz-questions-api.herokuapp.com'
				: config.mongo.url
		}: ${err.message}`
	)
})

/** log the request */
router.use((req, res, next) => {
	const ip = req.socket.remoteAddress.replace('::ffff:', '')

	logger.info(NAMESPACE, `[${req.method}], [${req.url}] [${ip}]`)

	res.on('finish', () => {
		logger.info(
			NAMESPACE,
			`[${req.method}] [${req.url}] [${ip}] [${res.statusCode}]`
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
router.use('/api/quiz/', apiRoutes)
router.use('/health/', healthCheckRoutes)
router.use('/', fallBackRoute)

/** error handling */
router.use((req, res, next) => {
	const error = new Error('404 - Page Not Found!')

	logger.error(NAMESPACE, `404 - Page Not Found!`)

	return res.status(404).json({
		status: 404,
		endpoint: `${config.server.url}${req.url}`,
		message: error.message
	})
})

/** create the server */
const httpServer = http.createServer(router)

httpServer.listen(config.server.port, () =>
	logger.info(
		NAMESPACE,
		`Server running on ${
			process.env.NODE_ENV === 'production'
				? 'https://quiz-questions-api.herokuapp.com'
				: config.server.name
		}:${config.server.port}`
	)
)

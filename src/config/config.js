const dotenv = require('dotenv')
dotenv.config()

const SERVER_PORT = process.env.PORT || 1337

const BASE_HTTP_URL =
	process.env.NODE_ENV === 'production'
		? 'https://quiz-questions-api.herokuapp.com'
		: 'localhost'

const SERVER_HOSTNAME = process.env.HOST || `${BASE_HTTP_URL}`

// const MONGO_URL = 'mongodb://localhost:27017/quiz-questions-api'

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	autoIndex: false,
	retryWrites: false
}

const MONGO_USERNAME =
	process.env.NODE_ENV === 'production'
		? process.env.MONGO_USERNAME
		: '127.0.0.1'

const MONGO_PASSWORD = process.env.MONGO_PASSWORD

const SERVER = {
	url: BASE_HTTP_URL,
	name: SERVER_HOSTNAME,
	port: SERVER_PORT
}

const MONGO = {
	options: MONGO_OPTIONS,
	username: MONGO_USERNAME,
	password: MONGO_PASSWORD,
	url:
		process.env.NODE_ENV === 'production'
			? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.aqbar.mongodb.net/quiz-questions-api?retryWrites=true&w=majority`
			: `mongodb://${MONGO_USERNAME}:27017/quiz-questions-api`
}

const config = {
	server: SERVER,
	mongo: MONGO
}

module.exports = config

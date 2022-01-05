/** define & initialise the `.env` file */
const dotenv = require('dotenv')
dotenv.config()

const SERVER_NAME = process.env.HOSTNAME || 'localhost'
const SERVER_PORT = process.env.PORT || 1337
const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://warm-island-43015.herokuapp.com'
		: 'localhost:1337'

const SERVER = {
	url: BASE_URL,
	name: SERVER_NAME,
	port: SERVER_PORT
}

const config = {
	server: SERVER
}

module.exports = config

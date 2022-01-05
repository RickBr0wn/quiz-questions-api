/** define & initialise the `.env` file */
const dotenv = require('dotenv')
dotenv.config()

const SERVER_NAME = process.env.HOSTNAME || 'localhost'
const SERVER_PORT = process.env.PORT || 1337

const SERVER = {
	name: SERVER_NAME,
	port: SERVER_PORT
}

const config = {
	server: SERVER
}

module.exports = config

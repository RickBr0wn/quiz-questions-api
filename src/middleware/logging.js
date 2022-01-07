const getTimeStamp = () =>
	new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString()

const error = (namespace, message, object) => {
	if (process.env.NODE_ENV === 'production') {
		if (object) {
			console.error(`[ERROR] [${namespace}] ${message}, ${object}`)
		} else {
			console.error(`[ERROR] [${namespace}] ${message}`)
		}
	} else {
		if (object) {
			console.error(
				`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`)
		}
	}
}

const debug = (namespace, message, object) => {
	if (process.env.NODE_ENV === 'production') {
		if (object) {
			console.debug(`[DEBUG] [${namespace}] ${message}, ${object}`)
		} else {
			console.debug(`[DEBUG] [${namespace}] ${message}`)
		}
	} else {
		if (object) {
			console.debug(
				`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`)
		}
	}
}

const info = (namespace, message, object) => {
	if (process.env.NODE_ENV === 'production') {
		if (object) {
			console.info(`[INFO] [${namespace}] ${message}, ${object}`)
		} else {
			console.info(`[INFO] [${namespace}] ${message}`)
		}
	} else {
		if (object) {
			console.info(
				`[${getTimeStamp()}] [INFO] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
		}
	}
}

const warn = (namespace, message, object) => {
	if (process.env.NODE_ENV === 'production') {
		if (object) {
			console.warn(`[WARN] [${namespace}] ${message}, ${object}`)
		} else {
			console.warn(`[WARN] [${namespace}] ${message}`)
		}
	} else {
		if (object) {
			console.warn(
				`[${getTimeStamp()}] [WARN] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`)
		}
	}
}

module.exports = { error, debug, info, warn }

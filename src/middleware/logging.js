const getDateAndTimeStamp = () =>
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
				`[${getDateAndTimeStamp()}] [ERROR] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.error(
				`[${getDateAndTimeStamp()}] [ERROR] [${namespace}] ${message}`
			)
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
				`[${getDateAndTimeStamp()}] [DEBUG] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.debug(
				`[${getDateAndTimeStamp()}] [DEBUG] [${namespace}] ${message}`
			)
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
				`[${getDateAndTimeStamp()}] [INFO] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.info(
				`[${getDateAndTimeStamp()}] [INFO] [${namespace}] ${message}`
			)
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
				`[${getDateAndTimeStamp()}] [WARN] [${namespace}] ${message}, ${object}`
			)
		} else {
			console.warn(
				`[${getDateAndTimeStamp()}] [WARN] [${namespace}] ${message}`
			)
		}
	}
}

module.exports = { error, debug, info, warn }

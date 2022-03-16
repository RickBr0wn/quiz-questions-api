const jwt = require('jsonwebtoken')

/**
 * This middleware helper accepts the `req, res, next` parameters.
 * It extracts the JWT token from the header (req.headers.token)
 * and checks the tokens validity using the `jwt.verify` method.
 *
 * On success, it will attach the `user` to the request object (`req.user`)
 * then call the `next()` function to continue to the route.
 *
 * On failure, the `next` function is never called and so the route is never reached.
 *
 * Used in
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns (see description)
 */
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token
	if (authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) res.status(403).json('Token is not valid!')
			req.user = user
			next()
		})
	} else {
		return res.status(401).json('You are not authenticated!')
	}
}

/**
 * A function that manipulates the next function being passed
 * to the `verifyToken` method to check that the user that is
 * requesting the authentication is the same as the user thats
 * being changed, or is an admin.
 *
 * Mainly used for UPDATE
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next()
		} else {
			res.status(403).json('You are not alowed to do that!')
		}
	})
}

/**
 * A function that manipulates the next function being passed
 * to the `verifyToken` method to check that the user is an admin.
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next()
		} else {
			res.status(403).json('You are not alowed to do that!')
		}
	})
}

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin
}

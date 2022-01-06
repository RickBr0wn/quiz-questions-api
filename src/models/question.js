const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
	_id: { type: String, required: true },
	question: { type: String, required: true },
	answers: [{ type: String, required: true }]
})

module.exports = mongoose.model('Question', questionSchema, 'questions') // (name, schema, collection)

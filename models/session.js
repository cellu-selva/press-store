const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    tokenExpiresOn: {
        type: Date
    },

}, { timestamps: true })

const sessionModel = mongoose.model('Session', sessionSchema)
module.exports = sessionModel
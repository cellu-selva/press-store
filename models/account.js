const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String
    },
    companyUrl: {
      type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    verifiedOn: {
      type: Date,
    },
    verificationToken: {
      type: String
    }
    // plan: {
    //     type: String,
    //     enum: ['free'],
    //     required: true
    // }
}, { timestamps: true })

const AccountModel = mongoose.model('Account', AccountSchema)
module.exports = AccountModel

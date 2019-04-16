const __ = require('../../../helpers/response')

class AdminClass {
    isAdmin(req, res, next) {
        if (req.user && req.user.get('isAdmin')) {
            next()
        } else {
            __.forbidden(res, 'You\'re not admin')
        }
    }
}

AdminClass = new AdminClass()
module.exports = AdminClass
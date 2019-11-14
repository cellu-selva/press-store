'use strict'

const config = require('config')
const uuidv1 = require('uuid/v1');


const User = require('../../../models/user')
const Auth = require('../middlewares/auth')

const __ = require('../../../helpers/response')
const queue = require('../../../helpers/queue')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateUser = (data) => {
  let error
  switch (true) {
    case (!(data && data.email && data.email.constructor === String && (data.email = data.email.trim()))):
      error = new Error('Please provide your email')
      break
    case (!(data.password && data.password.constructor === String && (data.password = data.password.trim()))):
      error = new Error('Please provide password')
      break
    case (!emailRegexp.test(data.email = data.email.trim())):
      error = new Error('Please enter a valid email')
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
  return
}

const validateNewUser = (data) => {
  let error
  switch (true) {
    case (!(data && data.email && data.email.constructor === String && (data.email = data.email.trim()))):
      error = new Error('Please provide your email')
      break;
    case (!(data.name && data.name.constructor === String && (data.name = data.name.trim()))):
      error = new Error('Please provide your name')
      break
    case (!(data.password && data.password.constructor === String && (data.password = data.password.trim()))):
      error = new Error('Please provide password')
      break
    case (!emailRegexp.test(data.email = data.email.trim())):
      error = new Error('Please enter a valid email')
      break
    case (data.password.length < 8):
      error = new Error('Password should have atleast 8 characters')
      break
    default:
      break
  }
  if (error) {
    error.status = 400
    throw error
  }
}

const validateChangePassword = function(credentials) {
  const { newPassword, confirmNewPassword } = credentials
  return newPassword && confirmNewPassword && newPassword === confirmNewPassword
}

class UserController {
  async checkMailExists(email) {
    let error
    email = email.trim().toLowerCase()
    let condition = {
      email,
      isDeleted: false
    }
    let user = await User.findOne(condition).lean()
    if (user) {
      error = new Error('Email taken. Please try a different email')
      error.status = 409
      throw error
    }
    return
  }

  async createGuestUser(req, res) {
    try {
      const user = new User({
        firstName: 'guest',
        lastName: uuidv1(),
        isVerified: true,
        verifiedOn: new Date(),
        provider: 'guest'
      })
      user.password = await user.generateHash('test1234')
      user.verificationToken = Auth.generateAuthToken(user._id)
      await user.save()
      let session = await Auth.createSession(user._id, false)
      let token = await Auth.addTokenPrefix(session.token)
      __.success(res, { authToken: token }, 'Successfully logged in')
    } catch (error) {
      __.error(res, error)
    }
  }

  async socialLogin(req, res) {
    const { body } = req;
    let email = body.email.trim().toLowerCase();
    let user = await User.findOne({ "email": email, isDeleted: false});
    if(!user) {
      let tempUserName = body.name ? body.name.split() : [];
      try {
        const user = new User({
          firstName: tempUserName && tempUserName.length ? tempUserName[0] : body.provider,
          lastName: tempUserName && tempUserName.length ? tempUserName[1] : uuidv1(),
          isVerified: true,
          verifiedOn: new Date(),
          email: email,
          provider: body.provider.trim().toLowerCase(),
          providerToken: body.idToken ? body.idToken : body.token ? body.token : '',
        });
        user.password = await user.generateHash('test1234')
        user.verificationToken = Auth.generateAuthToken(user._id)
        await user.save()
        let session = await Auth.createSession(user._id, false)
        let token = await Auth.addTokenPrefix(session.token)
        __.success(res, { authToken: token }, 'Successfully logged in')
      } catch (error) {
        __.error(res, error)
      }
    } else {
      this.loginHandler(req, res, 'socialLogin');
    }
    
  }

  async loginHandler(req, res, isSocial) {
    try {
      const { body } = req
      
      
      let condition = {
        email: body.email.trim().toLowerCase(),
        isDeleted: false
      }
      let user = await User.findOne(condition)
      if (!user) {
        return __.send(res, 400, 'email address not registered')
      }
      if (isSocial !== 'socialLogin') {
        validateUser(body)
        if (!user.isVerified) {
          return __.forbidden(res, 'Go to your mail and verify your user account')
        }
        let verify = user.verifyPassword(body.password)
        if (!verify) {
          return __.send(res, 401, 'Wrong Password')
        }
      }
      
      user.lastLoggedIn = new Date()
      let session = await Auth.createSession(user._id, body.rememberme)
      let token = await Auth.addTokenPrefix(session.token)
      __.success(res, { authToken: token }, 'Successfully logged in')
    } catch (error) {
      __.error(res, error)
    }
  }
  async createUserHandler(req, res) {
    try {
      const { body } = req
      let condition = {
        email: body.email.trim().toLowerCase(),
        isDeleted: false
      }
      let user = await User.findOne(condition)
      if (user) {
        return __.send(res, 409, 'This email address is already in use')
      }
      user = new User({
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim().toLowerCase()
      })
      user.password = await user.generateHash(body.password)
      const name = `${user.firstName} ${user.lastName}`
      user.verificationToken = Auth.generateAuthToken(user._id)
      await user.save()
      let mailOptions = {
        to: user.email,
        subject: 'Welcome',
        html: 'Welcome, You\'re invited by ' + name + '. Click on the link below to activate your account.<br/><br/><br/><br/> '
      }
      mailOptions.html += config.get('url') + '/v1/users/' + user.verificationToken + '/confirm'
      queue.createJob('sendMail', mailOptions)
      let userData = {
        _id: user._id,
        name: name,
        email: user.email,
        isActive: user.isActive,
        invitationStatus: user.invitationStatus
      }
      __.success(res, { user: userData }, 'User successfully created')
    } catch (error) {
      __.error(res, error)
    }
  }
  async editUserHandler(req, res) {
    try {
      const { body, params } = req
      if (!params.id || params.id.constructor !== String) {
        return __.send(res, 400, 'Please pass id')
      }
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let user = await User.findOne(condition)
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      const verify = user.verifyPassword(body.password)
      if (!verify) {
        return __.send(res, 401, 'Wrong Password')
      }
      delete body.password
      user = await User.findOneAndUpdate(condition, body, { new: true }).lean()
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      let userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: body.lastName.trim(),
        email: user.email,
        isActive: user.isActive,
        invitationStatus: user.invitationStatus
      }
      __.success(res, userData, 'User successfully updated at ')
    } catch (error) {
      console.log(error)
      __.error(res, error)
    }
  }
  async updatePasswordHandler(req, res) {
    try {
      const { params, body } = req
      if (!params.id || params.id.constructor !== String) {
        return __.send(res, 400, 'Please pass id')
      }
      let type = 'updatePassword'
      if (!validateChangePassword(body)) {
        return __.send(res, 400, 'new password and confirm password mismatch')
      }
      validateNonAdmin(body, type)
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let user = await User.findOne(condition)
      const verify = user.verifyPassword(body.password)
      if(!verify) {
        return __.send(res, 401, 'Wrong Password')
      }
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      user.password = await user.generateHash(body.newPassword)
      await user.save()
      __.send(res, 200, 'User successfully updated the password at ')
    } catch (error) {
      __.error(res, error)
    }
  }
  async deleteUserHandler(req, res) {
    try {
      const { params } = req
      if (!params.id || params.id.constructor !== String) {
        return __.success(res, 400, 'Please pass id')
      }
      let condition = {
        _id: params.id,
        isDeleted: false,
      }
      let update = {
        isDeleted: true,
        deletedOn: new Date()
      }
      let user = await User.findOneAndUpdate(condition, update)
      if (!user) {
        return __.send(res, 404, 'No User Found')
      }
      __.send(res, 200, 'User successfully deleted')
    } catch (error) {
      __.error(res, error)
    }
  }
  async getUsersHandler(req, res) {
    try {
      let selectCondition = 'email phoneNumber phoneNumberExt name invitationStatus invitedBy isDeleted'
      let users = await User.find({ isDeleted: false }).sort({ createdAt: -1 }).select(selectCondition).populate('addresses.primary addresses.secondary')
      __.success(res, users)
    } catch (error) {
      __.error(res, error)
    }
  }
  async confirmInvitationHandler(req, res) {
    try {
      const { params } = req
      if (!params || !params.token || !params.token.trim()) {
        return __.send(res, 400, 'Invalid Link')
      }
      let condtion = {
        verificationToken: params.token.trim(),
        isAdmin: false,
        isDeleted: false
      }
      let user = await User.findOne(condtion)
      if (!user) {
        return __.notFound(res, 'Invalid token')
      } else if (user.invitationStatus === 'registered') {
        return __.notFound(res, 'Account is already activated')
      }
      user.invitationStatus = 'registered'
      user.isVerified = true
      user.verifiedOn = new Date()
      user.lastLoggedIn = new Date()
      await user.save()

      let session = await Auth.createSession(user._id)
      let token = await Auth.addTokenPrefix(session.token)
      // __.success(res, { authToken: token }, 'User verified')
      res.redirect(`http://${config.get("host")}:${config.get("clientPort")}`)
    } catch (error) {
      __.error(res, error)
    }
  }
  async currentUserHandler(req, res) {
    try {
      let user = await User.findOne({ _id: req.user._id, isDeleted: false, isVerified: true }).
        select('email phoneNumber phoneNumberExt firstName lastName account isAdmin provider ').
        lean()
      if (!user) {
        return __.notFound(res, 'No user found')
      }
      return __.success(res, user)
    } catch (error) {
      __.error(res, error)
    }
  }
  async signUpHandler(req, res) {
    try {
      const { body }= req
      validateNewUser(body)
      const email = body.email.toLowerCase()
      await this.checkMailExists(email)
      let user = new User({
        email,
        name: body.name.trim(),
        isAdmin: true
      })
      user.password = await user.generateHash(body.password)
      user.verificationToken = Auth.generateAuthToken(user._id)
      await user.save()
      let mailOptions = {
        to: user.email,
        subject: 'Welcome',
        html: 'Welcome, glad you\'re here. Click on the link below to activate your account.<br/><br/><br/><br/> '
      }
      mailOptions.html += config.get('url') + '/v1/users/' + user.verificationToken + '/verify'
      queue.createJob('sendMail', mailOptions)
      __.send(res, 200, 'Successfully signed up. Please check your mail for verification link')
    } catch (error) {
      __.error(res, error)
    }
  }
  async verifyAccountHandler(req, res) {
    try {
      const { params } = req
      if (!params || !params.token || !(params.token = params.token.trim())) {
        return __.send(res, 400, 'Invalid Link')
      }
      const condtion = {
        verificationToken: params.token,
        isAdmin: true,
        isDeleted: false
      }
      const user = await User.findOne(condtion)
      if (!user) {
        return __.notFound(res, 'Invalid token')
      } else if (user.isVerified) {
        return __.notFound(res, 'Account is already activated')
      }
      const verifiedTime = new Date()
      user.isVerified = true
      user.verifiedOn = verifiedTime
      user.lastLoggedIn = verifiedTime
      await user.save()
      const session = await Auth.createSession(user._id)
      const token = await Auth.addTokenPrefix(session.token)
      __.success(res, { authToken: token }, 'User Account verified')
    } catch (error) {
      __.error(res, error)
    }
  }
}

UserController = new UserController()
module.exports = UserController

import joi from 'joi'
import db from '../config/connection.js'
import { signUpSchema } from '../model/authModel.js'

const signUpValidate = async(req, res, next) => {
  const signUpValidation = signUpSchema.validate(req.body)
  if(signUpValidation.error) return res.status(422).send(`${signUpValidation.error.message}`)
  res.locals.name = req.body.name
  res.locals.email = req.body.email
  res.locals.password = req.body.password
  console.log('oi')
  next()
}

export {
  signUpValidate
}
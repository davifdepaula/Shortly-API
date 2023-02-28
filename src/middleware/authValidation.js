import joi from 'joi'
import db from '../config/connection.js'
import { signUpSchema } from '../model/authModel.js'

const signUpValidate = async(req, res, next) => {
  const signUpValidation = signUpSchema.validate(req.body)
  if(signUpValidation.error) return res.status(422).send(`${signUpValidation.error.message}`)
  const user = await db.query(`SELECT * FROM users 
    where email = '${req.body.email}'`)
  console.log(user.rows)
  if(user.rows.length > 0) return res.sendStatus(409)
  res.locals.name = req.body.name
  res.locals.email = req.body.email
  res.locals.password = req.body.password
  next()
}

export {
  signUpValidate
}
import joi from 'joi'
import db from '../config/connection.js'
import bcrypt from 'bcrypt'
import { signUpSchema, signInSchema } from '../model/authModel.js'

const signUpValidate = async(req, res, next) => {
  const signUpValidation = signUpSchema.validate(req.body)
  if(signUpValidation.error) return res.status(422).send(`${signUpValidation.error.message}`)
  const user = await db.query(`SELECT * FROM users 
    where email = '${req.body.email}'`)
  if(user.rowCount > 0) return res.sendStatus(409)
  res.locals.name = req.body.name
  res.locals.email = req.body.email
  res.locals.password = req.body.password
  next()
}

const signInValidate = async(req, res, next) => {
  const signInValidation = signInSchema.validate(req.body)
  if(signInValidation.error) return res.status(422).send(`${signInValidation.error.message}`)
  const checkUser = await db.query(`SELECT * FROM users 
    where email = '${req.body.email}'`)
  if(checkUser.rowCount === 0) return res.sendStatus(401)
  if(!checkUser || !bcrypt.compareSync(req.body.password, checkUser.rows[0].password)){
    return res.status(401).send("Usuário ou senha inválidos")
}
res.locals.userId = checkUser.rows[0].id
next()
} 

export {
  signUpValidate,
  signInValidate
}
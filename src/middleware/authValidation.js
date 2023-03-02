import db from '../config/connection.js'
import bcrypt from 'bcrypt'
import { signUpSchema, signInSchema, urlSchema } from '../model/authUserModel.js'

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
    where email = $1`, [req.body.email])
  if(checkUser.rowCount === 0) return res.sendStatus(401)
  if(!checkUser || !bcrypt.compareSync(req.body.password, checkUser.rows[0].password)){
    return res.status(401).send("Usuário ou senha inválidos")
}
res.locals.userId = checkUser.rows[0].id
next()
} 

const tokenValidation = async(req, res, next) => {
  const {authorization} = req.headers
  const token = authorization?.replace('Bearer ', '')
  if(!token) return res.sendStatus(401)
  try{
      const session = await db.query(`SELECT * FROM sessions WHERE 
      token = $1`, [token])
      if(session.rowCount === 0) return res.sendStatus(401)
      res.locals.session = session.rows[0]
      next()
  }catch{
    return res.send(error).status(500)
  }
}

const urlValidate = async(req, res, next) => {
  try {
    const url = urlSchema.validate(req.body)
    if(url.error) return res.status(422).send(`${url.error.message}`)
    res.locals.url = url
    next()    
  } catch (error) {
    return res.send(error).status(500)
  }
}

const checkUserId = async(req, res, next) => {
  try {
    const {userId} = res.locals.session
    const checkIdUrl = await db.query(`SELECT * FROM urls WHERE
    id = $1`, [req.params.id])
    if(checkIdUrl.rowCount === 0) return res.sendStatus(404)
    if(userId !== checkIdUrl.rows[0].userId) return res.sendStatus(401)
    res.locals.urlId = req.params.id
    next()
  } catch (error) {
    return res.send(error).status(500)
  }
}


export {
  signUpValidate,
  signInValidate,
  tokenValidation,
  urlValidate,
  checkUserId
}
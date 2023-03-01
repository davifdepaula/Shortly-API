import db from "../config/connection.js"
import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

const signUp = async(req, res) => {
  try {
    const {name, email, password} = res.locals
    const passwordHash = bcrypt.hashSync(password, 10)
    await db.query(`INSERT INTO users
    (name, email, password) values ('${name}', '${email}', '${passwordHash}') 
    `)
    return res.sendStatus(201)
  }
  catch(error){
    return res.status(500).send(error)
  }
}

const signIn = async(req, res) => {
  try{
    const {userId} = res.locals
    const token = uuidV4()
    await db.query(`INSERT INTO sessions
    ("userId", token) values ('${userId}', '${token}') 
    `)
    return res.send({token: token}).status(200)
  }catch(error){
    return res.send(error).status(500)
  }
  return res.sendStatus(200)
}

export {
  signUp,
  signIn
}
import db from "../config/connection.js"
import bcrypt from 'bcrypt'

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

export {
  signUp
}
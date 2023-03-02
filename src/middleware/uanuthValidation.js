import db from "../config/connection.js"

const validateUrlId = async(req, res, next) => {
  try {
    const {id} =  req.params
    const checkId = await db.query(`SELECT * FROM urls WHERE
    id = $1`, [id])
    if (checkId.rowCount === 0) return res.sendStatus(404)
    res.locals.id = id
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

export {
  validateUrlId
}
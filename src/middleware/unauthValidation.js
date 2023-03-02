import db from "../config/connection.js"

const validateUrlId = async(req, res, next) => {
  try {
    const {id} =  req.params
    const checkId = await db.query(`SELECT * FROM urls WHERE
    id = $1`, [id])
    if (checkId.rowCount === 0) return res.sendStatus(404)
    res.locals.id = checkId.rows[0].id
    res.locals.shortUrl = checkId.rows[0].shortUrl
    if (checkId.rows[0].url.value) res.locals.url = checkId.rows[0].value.url
    else res.locals.url = checkId.rows[0].url
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

const validateShortUrlenUrlId = async(req, res, next) => {
  try {
    const {shortUrl} =  req.params
    const checkId = await db.query(`SELECT * FROM urls WHERE
    "shortUrl" = $1`, [shortUrl])
    if (checkId.rowCount === 0) return res.sendStatus(404)
    res.locals.shortUrl = shortUrl
    res.locals.url = checkId.rows[0]
    next()
  } catch (error) {
    return res.status(500).send(error)
  }
}

export {
  validateUrlId,
  validateShortUrlenUrlId
}
import db from '../config/connection.js'

const getUrlById = async(req, res) => {
  try {
    const {id, shortUrl, url} = res.locals
    return res.status(200).send(
      {
        id,
        shortUrl,
        url
     })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getShortUrl = async(req, res) => {
  try {
    const {shortUrl, url} = res.locals
    const visitCount = url.visitCount + 1
    await db.query(`UPDATE urls set 
    "visitCount" = $1 WHERE "shortUrl" = $2`, [visitCount, shortUrl])
    return res.status(302).redirect(url.url)    
  } catch (error) {
    return res.status(500).send(error)
  }
}

export {
  getUrlById,
  getShortUrl
}
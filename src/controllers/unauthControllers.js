import express from 'express'
import db from '../config/connection.js'
const getUrlById = async(req, res) => {
  try {
    const {id} = res.locals
    const url = await db.query(`SELECT * FROM urls WHERE
    id = $1`, [id])
    return res.status(200).send(
      {
        id: url.rows[0].id, 
        shortUrl: url.rows[0].shortUrl,
        url: url.rows[0].url
     })
  } catch (error) {
    return res.status(500).send(error)
  }

}

export {
  getUrlById
}
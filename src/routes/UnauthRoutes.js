import express from 'express'
import { getUrlById, getShortUrl, getRanking } from '../controllers/unauthControllers.js'
import { validateShortUrlenUrlId, validateUrlId } from '../middleware/unauthValidation.js'

const unauthRoutes = express.Router()

unauthRoutes.get('/urls/:id', validateUrlId, getUrlById)
unauthRoutes.get('/urls/open/:shortUrl', validateShortUrlenUrlId, getShortUrl)
unauthRoutes.get('/ranking', getRanking)

export default unauthRoutes
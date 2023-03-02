import express from 'express'
import { getUrlById, getShortUrl } from '../controllers/unauthControllers.js'
import { validateShortUrlenUrlId, validateUrlId } from '../middleware/uanuthValidation.js'

const unauthRoutes = express.Router()

unauthRoutes.get('/urls/:id', validateUrlId ,getUrlById)
unauthRoutes.get('/urls/open/:shortUrl', validateShortUrlenUrlId, getShortUrl)

export default unauthRoutes
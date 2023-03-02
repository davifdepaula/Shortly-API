import express from 'express'
import { getUrlById } from '../controllers/unauthControllers.js'
import { validateUrlId } from '../middleware/uanuthValidation.js'

const unauthRoutes = express.Router()

unauthRoutes.get('/urls/:id', validateUrlId ,getUrlById)

export default unauthRoutes
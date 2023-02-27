import express from 'express'
import { signUp } from '../controllers/userControllers.js'
import { signUpValidate } from '../middleware/authValidation.js'

const userRoutes = express.Router()

userRoutes.post('/signup', signUpValidate, signUp)


export default userRoutes
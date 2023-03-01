import express from 'express'
import { signIn, signUp } from '../controllers/userControllers.js'
import { signInValidate, signUpValidate } from '../middleware/authValidation.js'

const userRoutes = express.Router()

userRoutes.post('/signup', signUpValidate, signUp)
userRoutes.post('/signin', signInValidate, signIn)


export default userRoutes
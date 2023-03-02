import express from 'express'
import { signIn, signUp, urlShorten } from '../controllers/userControllers.js'
import { signInValidate, signUpValidate, tokenValidation, urlValidate } from '../middleware/authValidation.js'

const userRoutes = express.Router()

userRoutes.post('/signup', signUpValidate, signUp)
userRoutes.post('/signin', signInValidate, signIn)
userRoutes.post('/urls/shorten', tokenValidation, urlValidate, urlShorten)


export default userRoutes
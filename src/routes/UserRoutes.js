import express from 'express'
import { deleteById, signIn, signUp, urlShorten } from '../controllers/userControllers.js'
import { checkUserId, signInValidate, signUpValidate, tokenValidation, urlValidate } from '../middleware/authValidation.js'

const userRoutes = express.Router()

userRoutes.post('/signup', signUpValidate, signUp)
userRoutes.post('/signin', signInValidate, signIn)
userRoutes.post('/urls/shorten', tokenValidation, urlValidate, urlShorten)
userRoutes.delete('/urls/:id', tokenValidation, checkUserId,  deleteById)


export default userRoutes
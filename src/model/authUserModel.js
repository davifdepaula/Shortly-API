import joi from 'joi'

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required()
})

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})

const urlSchema = joi.object({
  url: joi.string().uri().required()
})


export {
  signUpSchema,
  signInSchema,
  urlSchema
}
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})
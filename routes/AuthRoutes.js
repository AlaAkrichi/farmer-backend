import express from 'express'
import{loginUser,register} from '../controllers/AuthController.js'

const authRoute = express.Router()

authRoute.post('/login',loginUser)
authRoute.post('/register',register)

export default authRoute
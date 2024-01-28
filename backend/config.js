import "dotenv/config"
import express from "express"
import passport from "passport"
import cors from "cors"
import cookieParser from "cookie-parser"
import "./auth/strategy.js"

// CONSTANT
const app = express()
const PORT = Number(process.env.PORT)
app.listen(PORT, ()=>{console.log(`Server running http://localhost:${PORT}`)})

// Middleware ----------------------------------------------------------
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200, 
  credentials: true, 
}))

app.use(cookieParser());

//------------------------------------------------------------------
// Initalized passport
app.use(passport.initialize())

export { app } 
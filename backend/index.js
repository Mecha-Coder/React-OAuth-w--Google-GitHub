import "dotenv/config"
import { app } from "./config.js"
import jwt from "jsonwebtoken"
import loginRoute from "./routes/loginRoute.js"

//Routes
app.use("/login", loginRoute)

app.get("/auth", (req,res)=>{
  const user = req.cookies.user
  jwt.verify(user, process.env.JWT_KEY, (error,decode)=>{
    if(error) {res.sendStatus(400)}
    else{res.send(decode)}
  })
})

app.get("/logout", (req,res)=>{
  res.cookie('user', "", { httpOnly: true}).redirect("http://localhost:3000/")
})



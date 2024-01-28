import "dotenv/config"
import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router();
const redirect = process.env.REDIRECT
const secret = process.env.JWT_KEY

const scope = {scope: ["profile"], session: false }
const handleRedirect = {
  failureRedirect: "/login/failed",
  session: false
}

function handle(req,res){
  const token = jwt.sign(req.user,secret,{ expiresIn: '1d' })
  res.cookie('user', token, { httpOnly: true}).redirect("http://localhost:3000/")  
}

router.get("/google",             passport.authenticate("google", scope))
router.get(`/google/${redirect}`, passport.authenticate("google", handleRedirect),handle)

router.get("/github",             passport.authenticate("github", scope))
router.get(`/github/${redirect}`, passport.authenticate("github", handleRedirect),handle)

router.get("/facebook",              passport.authenticate("facebook", scope))
router.get(`/facebook/${redirect}` , passport.authenticate("facebook", handleRedirect), handle)



router.get("/failed", (req,res)=>{
  res.redirect("http://localhost:3000/login/falied")
})



export default router
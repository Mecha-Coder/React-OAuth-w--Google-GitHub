import "dotenv/config"
import passport from "passport"
import { Strategy as GithubStrategy } from "passport-github2"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"

const redirect = process.env.REDIRECT

function Config(provider){
    const name = provider.toUpperCase()
    return{
      clientID: process.env[`${name}_ID`],
      clientSecret: process.env[`${name}_SECRET`],
      callbackURL: `http://localhost:4000/login/${provider}/${redirect}`
    }
}

passport.use(new GithubStrategy(Config("github"), 
  async (accessToken, refreshToken, profile, done) => { 
  const user = {
    name: profile.displayName,
    img: profile.photos[0].value
  }  
    
  done(null, user) }
))

passport.use(new GoogleStrategy(Config("google"), 
  async (accessToken, refreshToken, profile, done) => { 
    
    const user = {
      name: profile.displayName,
      img : profile.photos[0].value
    }
    done(null, user) 
  }
))

passport.use(new FacebookStrategy(Config("facebook"), 
  async (accessToken, refreshToken, profile, done) => { 
    done(null, profile) 
  }
))

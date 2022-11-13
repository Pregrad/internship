const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require('../models/userModel')

passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENTID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:"/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
         User.findOne({email:profile.emails[0].value}).then((data)=>{
            if(data){
              done(null,data)
              return;

            }else{
                User({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:profile.id,
                    verified:true
                    
                }).save(function(err,data){
                    if(err)
                    {
                        res.send({
                            message:"Something went Wrong"
                        })
                    }
                     done(null,data)
                     return
                })
            }
         })
          return
    }
    ))

    passport.serializeUser((user,done)=>{
        done(null,user)
    })

    passport.deserializeUser((user,done)=>{
        done(null,user)
    })
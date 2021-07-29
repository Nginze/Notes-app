// Imports 
const express = require ('express')
const ejs = require('ejs')
const Login = require('./routes/Login')
const SignUp = require('./routes/SignUp')
const Dashboard = require('./routes/Dashboard')
const connection = require('./Database')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// App initialization
app = express()
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
	saveUninitialized: false
}))



require('./passportConfig')
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(Login)
app.use(SignUp)
app.use(Dashboard)


app.listen(4000)



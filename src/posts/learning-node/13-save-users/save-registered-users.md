---
title: "Learning Node #13: Saving Registered Users to Database"
date: "2018-09-14T09:37:00.000Z"
path: "/posts/learning-node/save-registered-users"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Import model

So we already made our new User model, let's import it like we did our Store model:

```js
//import our model in `start.js`
require('./models/Store')
require('./models/User')
```

## Using [promisify](https://www.npmjs.com/package/es6-promisify) and [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)

We need to import our model into `userController`, and also Promisify, which converts callback based functions to using ES6 Promises. In this case, we are using it on another imported method, `register(user, password, callback-fn)` from passport-local-mongoose. This method will not store the user's actual password. It hashes the password, using a 'salt' value (a unqiue initializer for a hash function), and stores the salt and the password in the database. No exposed user passwords!

```js
const User = mongoose.model('User')
const promisify = require('es6-promisify')
// ...everything else...
exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next() //pass to authController.login
}
```

## Logging the user in

Now we are going to create a controller to handle all the logging in and the passport.js stuff, like password resets and email sending. Everything related to logging in and being authenticated.

First we import passport, and passport has a thing called a 'Strategy'. This is how passport is going to send data to see if a user should be logged in or not.

There could be a Facebook Strategy, to check Facebook Tokens, for example. In our case, we are going to create a 'Local Strategy', which just checks to see if the username and password have been sent in correctly.

So rather than our controller functioning on `(req, res, next)`, we are going to be using this imported passport object, and tell it which strategy to use, and pass it a config object:

```js
// authController.js
const passport = require('passport')
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!',
})
```

Import authController in `routes/index.js`, and modify the route to include our next step:

```js{1,6}
const authController = require('../controllers/authController')
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
)
```

## Passport.js configuration

In our `handlers/` directory, create `passport.js` configuration file:

```js
// passport.js
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
```

Now passport will attach a `User` object on every `req`, which it can use to pass data to itself.

Now, in our `models/User.js` we already have this line, which is where we initially tell passport where to get the data to store:

```js
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
```

In `app.js` we add this require:

```js
require('./handlers/passport')
```

And now, if we fill out the registraition form, it registers us (which we can check inside of MongoDBCompass), redirects us to the home page, and flashes us a success message. WhooHoo!!!

On to the next tutorial, [#14: Virtual Fields, Login/Logout middleware, and Protected Routes](/posts/learning-node/virtual-fields-protecting-routes)!

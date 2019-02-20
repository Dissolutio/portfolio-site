---
title: "Learning Node #12: Creating User Accounts"
date: "2018-09-13T10:00:00.000Z"
path: "/posts/learning-node/creating-user-accounts"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

<aside>This is a long and tough one. Just warning you.</aside>

## Overview of steps to create a user

We want to accomplish 3 steps when a user registers:

1.  Validate the registration
    That's what we are going to do right now; we will build middleware.

2.  Register the user
    This will be the next video, once we have validated, we will save to our database.

3.  Log them in
    Because we are kind and intelligent.

## Make the routes and views for our login and register pages

### Routes

```js
router.get('/login', userController.loginForm)
router.get('/register', userController.registerForm)
```

### Controller

We will make a new controller to hold the code for user stuff:

```js
const mongoose = require('mongoose')

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' })
}
exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}
```

### Views

#### mixin: \_loginForm.pug

```pug
mixin loginForm()
  form.form(action="/login" method="POST")
    h2 Login
    label(for="email") Email Address
    input(type="email" name="email")
    label(for="password") Password
    input(type="password" name="password")
    input.button(type="submit", value="Log In")
```

#### login.pug

```pug
extends layout

include mixins/_loginForm

block content
  .inner
    +loginForm()
```

#### register.pug

```pug
extends layout

block content
  .inner
    form.form(action="/register" method="POST")
      h2 Register
      label(for="name") Name
      input(type="text" name="name")
      label(for="email") Email
      input(type="email", name="email")
      label(for="password") Password
      input(type="password" name="password")
      label(for="password-confirm") Confirm Password
      input(type="password-confirm", name="password-confirm")
      input.button(type="submit" value="Register")
```

## Posting the registration form

The route:

```js
router.post('/register', userController.validateRegister)
```

The controller method is fairly involved:

```js
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name!').notEmpty()
  req.checkBody('email', 'That email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  })
  req.checkBody('password', 'Password cannot be blank!').notEmpty()
  req
    .checkBody('password-confirm', 'Confirmed password cannot be blank!')
    .notEmpty()
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match!')
    .equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    // must include the flashes as we send the request right back,
    // normally flashes would not fire until the next request
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    })
  }
}
```

Some explanation:

- You can see this line of code in action in `app.js` which remember is basically a flow of middleware:

  ```js
  app.use(expressValidator())
  ```

  [Express-validator](https://express-validator.github.io/docs/index.html) attaches some handy methods to the `req` which we can call upon in our `userController.validateRegister` controller export. Two we use are:

  1.  `req.checkBody(field[, message])` is a legacy method for `req.check(field[, message])`, but only checking `req.body`.

  2.  `req.sanitizeBody(field[, message])` is a legacy method `req.sanitize(field[, message])`, but only sanitizing `req.body`

- These methods are used by connecting validators or sanitizers, as you can see we did with `.notEmpty()` , `isEmail()` , `normalizeEmail()` and `equals()`. Check out the [validator.js docs](https://github.com/chriso/validator.js) to really get a feel for it.

- We set `body` to `req.body` in our `res.render()` function. This is because we do not want to clear the fields, that is so frustrating when you fill out a form, find out it's invalid, and then have to fill out the _WHOLE_ thing again.

## Our User Schema

Remember when we made a [store model in #3](/posts/learning-node/models)? Well let's make a User model:

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// the mongoose promise is broken, so they
//reccomend switching to the standard global
mongoose.Promise = global.Promise
// md5 is a popular hash function
const md5 = require('md5')
// in case our validation wasn't enough?
const validator = require('validator')
//mongoDB has standard error msgs
// that might baffle users
const mongodbErrorHandler = require('mongoose-mongodb-errors')
//passport local will let us use
// the simple 'email/pw' setup
const passportLocalMongoose = require('password-local-mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    //This is important because later, when you want to reuse the email address, you want it lowercase
    lowercase: true,
    trim: true,
    // this is our middleware, it accepts a method and an error message
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
})

userSchema.plugin(passportLocalMongoose, { userNameField: 'email' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
```

At the end, the passportLocalMongoose plugin is the one that is going to take our User object and save it to the databse with 3 fields, a username (which we designate as the email), a hashed password, and a salt. These will be explained in the next post: [#13: Saving Registered Users to Database](/posts/learning-node/save-registered-users).

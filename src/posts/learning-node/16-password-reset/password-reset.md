---
title: 'Learning Node #16: Password Reset Flow'
date: '2018-09-23T17:30:00.000Z'
path: '/posts/learning-node/password-reset'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Create a form

We make a form with one input:

```pug
//- _forgotPasswordForm.pug
mixin forgotForm()
  form.form(action="/account/forgot" method="POST")
    h2 I forgot my password
    label(for="email")
    input(type="email", name="email")
    input.button(type="submit", value="Send a Reset")
```

Then we add that to the bottom of our `/login` view.

## Add a route

```js
router.post('/account/forgot', catchErrors(authController.forgot))
```

## Add the controller method

We have 4 goals:

1. Verify email address
2. Set reset token and expiration on their account.
3. Send them that token.
4. Redirect to login page.

```js
// authController.js

// new imports
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = mongoose.model('User')

// the method
exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.flash('error', 'No account with that email exists.')
    return res.redirect('/login')
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 360000

  await user.save()

  const resetURL = `http://${req.headers.host}/account/reset/${
    user.resetPasswordToken
  }`
  req.flash(
    'success',
    `You have been emailed a password reset link. ${resetURL}`
  )
  res.redirect('/login')
}
```

`crypto` can can cook up hash browns, otherwise known as cryptographic hash functions. 
<aside>It swallowed the mongoose to swallow the User, I dunno why it swallowed a User, perhaps it'll flash error.</aside>

## Add new fields to User Model

So before, my personal user object in the databse did not have those two fields, `resetPasswordToken` and `resetPasswordExpires`.
After this method, it will (temporarily) have those two fields. But we cannot write them unless we add them to our `userSchema` object:

```js
resetPasswordToken: String,
resetPasswordExpires: Date,
```

## Retrieve token from URL

So our routes look like this:
```js
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));
```

Now the user has their token, they visit us at our friendly neighborhood `/account/reset/:token`, and get a free password reset form to fill out!

If you do not give the form element an `action` attribute, it posts to the current URL.
```pug
//- reset.pug
extends layout

block content
  .inner
    form.form(method="POST")
      h2 Reset your Password
      label(for="password") Password
      input(type="password" name="password")
      label(for="password-confirm") Confirm Password
      input(type="password" name="password-confirm")
      input(type="submit" value="Reset Password")
```



And our new `authController.js` exports look like this:

1. In `reset` note the `$gt:` mongoDB query:
```js
exports.reset = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired.');
		return res.redirect('/login');
	}
	res.render('reset', { title: 'Reset your Password' });
};
```

2.  We submit that form, and do a really weak validation:
```js
exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
		return;
	}
	req.flash('error', 'Passwords do not match');
	res.redirect('back');
};
```

3. Finally, 
```js
// import promisify
const promisify = require('es6-promisify');
// ...
exports.update = async (req, res) => {
	const user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!user) {
		req.flash('error', 'Password reset is invalid or has expired.');
		return res.redirect('/login');
	}

	const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  // mongoDB will delete undefined fields
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;
	const updatedUser = await user.save();
	await req.login(updatedUser);
	req.flash('Success', 'Your password has been reset and you are now logged in!');
	res.redirect('/');
};
```

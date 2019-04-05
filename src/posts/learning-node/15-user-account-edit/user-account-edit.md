---
title: "Learning Node #15: Creating a User Account Edit Screen"
date: "2018-09-22T06:47:00.000Z"
path: "/posts/learning-node/user-account-edit"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Make the route!

Add a route to get account page:

```js
router.get('/account', authController.isLoggedIn, userController.account)
```

Serve up a view from the userController

```js
exports.account = (req, res) => {
  res.render('account', { title: 'Edit your account' })
}
```

## Make the view

Our `account.pug` will be a simple form:

```pug
extends layout

block content
  .inner
    h2 Edit your account
    form(action="/account" method="POST")
      label(for="name") Name
      input(type="text" name="name" value=user.name)
      label(for="email") Email Address
      input(type="email" name="email" value=user.email)
      input(type="submit" value="Update My Account")
```

## Route for submitting the form

```js
router.post('/account', catchErrors(userController.updateAccount))
```

## Update the account

So here we learn a little more mongoDB magic. Note that `findOneAndUpdate()` takes three arguments:
The **query**, the **updates**, and some **options**.

```js
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    // new: return the new User, context: mongoose needs this
    { new: true, runValidators: true, context: 'query' }
  )
  // check to see it works:
  res.json(user)
  // use this once it works
  res.redirect('back')
}
```

And of course remember that if you get lost and cannot tell what's coming back, you can always do this in your pug files:

```pug
pre= h.dump(user)
```

Onwards to [Learning Node #16: Password Reset Flow](/posts/learning-node/password-reset)!

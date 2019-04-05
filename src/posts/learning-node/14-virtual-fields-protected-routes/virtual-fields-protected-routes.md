---
title: "Learning Node #14: Virtual Fields, Login/Logout Middleware and Protecting Routes"
date: "2018-09-17T09:30:00.000Z"
path: "/posts/learning-node/virtual-fields-protecting-routes"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Logout

It's super easy, add the route, and add the method. Notice how in our `layout.pug` file we have an if(user)/else navigation already built for us.

```js
// in routes/index.js
router.get('/logout', authController.logout)
```

```js
// in controllers/authController.js
exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You are now logged out!')
  res.redirect('/')
}
```

## Login

Add the route to post the login form, and it simply directs to the same login procudure as our registration form points to.

```js
router.post('/login', authController.login)
```

I ran into a little roadblock here. Because we have setup our schema and registration flow to strip down email addresses into their most basic form, but we have NOT done that with our login form. So I was trying to login with 'entity.john@gmail.com' but my database only holds 'entityjohn@gmail.com'. We will have to fix this.

## Gravatar

We add this to our `User.js` schema file. Gravatar is a service that associates your avatar picture with a hash of your email address. So we fetch the avatar from the web and display it in the app. The user's email address is not shared or allowed into the image info. It's all done with hashes.

```js
userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email)
  return `https://gravatar.com/avatar/${hash}?s=200`
})
```

This image is used in the navigation, as the link to the user's `/account` page.

## Protected Route

We will add an export to the authController:

```js
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  req.flash('error', 'Oops, you must be logged in to do that!')
  res.redirect('/login')
}
```

And we will use this export when someone wants to add a store:

```js
router.get('/add', authController.isLoggedIn, storeController.addStore)
```

In [#15: Creating a User Account Edit Screen](/posts/learning-node/user-account-edit), we are going to build our account page!

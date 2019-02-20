---
title: 'Learning Node #22: Pushing User Data to our API'
date: '2018-10-05T10:00:00.000Z'
path: '/posts/learning-node/pushing-user-data'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Updating our data

When a user clicks to 'heart' a store, we want to update the data and ajax the data back in.

We will add a property called `hearts` on the User schema, it is going to be an array of `ObjectId`s, referencing stores.

```js
hearts: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
  },
]
```

## Add the form for hearting stores

In `_storeCard.pug` we will add this section at the top of the `.store_actions` div:

```pug
//- _storeCard.pug

//- .store-actions
if user
  .store__action.store__action--heart
    form.heart(method="POST" action=`/api/stores/${store._id}/heart`)
      button.heart__button(type="submit" name="heart")
        != h.icon('heart')
//- rest of file
```

See how it takes the storeID and posts that to our API?

We will modify this a little shortly, but let's go to our storeController and handle this new post action.

## Add the route

Obviously...

```js
router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore))
```

## Handle the post action

Notice how we compute the operator, and then we use that computed operator using ES6 syntax by wrapping it in square brackets. Pretty cool!

```js
// storeController.js
// add this import
const User = mongoose.model('User')

exports.heartStore = async (req, res) => {
  // passport.js adds the user object to every request
  // mongoDB puts the toString method on objID's for us
  const hearts = req.user.hearts.map(obj => obj.toString())
  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet'
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { hearts: req.params.id } },
    { new: true }
  )
  res.json(user)
}
```

Cool, so we submit the form, it adds or subtracts the store from the user's `hearts`.

But we want to do a few things:

1. Apply some styles to hearted stores' icons.

2. Track how many stores the user has hearted

3. Apply an animation, remove it soon after.

## Client side JavaScript module

So we will Bling in this badass bit of JavaScript:

```js
// javascripts/module/heart.js
import axios from 'axios'
import { $ } from './bling'

function heartStore(e) {
  e.preventDefault()
  axios
    .post(this.action)
    .then(res => {
      const isHearted = this.heart.classList.toggle('heart__button--hearted')
      $('.heart-count').textContent = res.data.hearts.length
      if (isHearted) {
        this.heart.classList.add('heart__button--float')
        setTimeout(
          () => this.heart.classList.remove('heart__button--float'),
          2500
        )
      }
    })
    .catch(console.error)
}
export default ajaxHeart
```

We must of course call this code on our form submit,in the javascripts' index file, `delicious-app.js`:

```js
// javascripts/delicious-app.js
import ajaxHeart from './modules/heart'
// $$ = querySelectorAll
const heartForms = $$('form.heart')
heartForms.on('submit', heartStore)
```

## Query stores based on current users hearts

While we are on the subject of hearts, we have a link to `/hearts` right in our main navigation.

You know the drill. Hit a route:

```js
// routes/index.js
router.get(
  '/hearts',
  authController.isLoggedIn,
  catchErrors(storeController.getStoresByUserHearts)
)
```

Now excercise control of that route! We've displayed stores before...

```js
// storeController.js

exports.getStoresByUserHearts = async (req, res) => {
  const stores = await Store.find({
    _id: { $in: req.user.hearts },
  })
  res.render('stores', { stores, title: 'Hearted Stores' })
}
```

In the [next one, we add user reviews!](/posts/learning-node/user-reviews)

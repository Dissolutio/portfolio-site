---
title: 'Learning Node #23: Adding reviews to our app'
date: '2018-10-09T23:16:00.000Z'
path: '/posts/learning-node/user-reviews'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Define our review schema

Good relationships are founded on sound communication. Let us be honest with ourselves, with our users, and with mongoose about how we want our reviews to be saved. We will make a new model:

```js
// models/Review.js
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!',
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'You must supply a store!',
  },
  text: {
    type: String,
    required: 'Your review must have text!',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
})

module.exports = mongoose.model('Review', reviewSchema)
```

Nothing fancy in this model, really.

## Import review model into `start.js`

Let him join his brethren:

```js
// start.js
require('./models/Store')
require('./models/User')
require('./models/Review')
```

## Add a review form as a pug mixin

We can now sync up an html form to create a review that our schema accepts. We will write a pug mixin as our review form:

```pug
views/mixins/_reviewForm
mixin reviewForm(store)
  form.reviewer(action=`/reviews/${store._id}` method="POST")
    textarea(name="text" placeholder="Did you try this place? Leave a review!")
    .reviewer__meta
      .reviewer__stars
        each num in [5,4,3,2,1]
          input(type="radio" required id=`star${num}` name="rating" value=num)
          label(for=`star${num}`) #{num} Stars
      input.button(type="submit" value="Submit Review")
```

Include that in our store view:

```pug
//- views/store.pug
include mixins/_reviewForm
//- ...REST OF STORE VIEW
if user
  +reviewForm(store)
```

## Make the route

We are going to make a new controller for review related stuff. It will handle this route first:

```js
routes / index.js
const reviewController = require('../controllers/reviewController')
```

## `reviewController`

This is very straightforward. Save the review once it's tidy, flash on completion. We don't have any error handling, which is bad:

```js
// controllers/reviewController.js
const mongoose = require('mongoose')
const Review = mongoose.model('Review')

exports.addReview = async (req, res) => {
  req.body.author = req.user._id
  req.body.store = req.params.id
  const newReview = new Review(req.body)
  await newReview.save()
  req.flash('success', 'Review Saved!')
  res.redirect('back')
}
```

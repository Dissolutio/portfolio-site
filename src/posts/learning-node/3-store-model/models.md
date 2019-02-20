---
title: "Learning Node #3: Models"
date: "2018-07-16T12:28:00.000Z"
path: "/posts/learning-node/models"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Import models in start.js

In this section, we setup a store model, which is part of the database storage process.

So, if we look at our `start.js` file, it has a flow:

- Import environmental variables
- Connect to database or handle bad connections
- **Import our models**
- Start the app

So in the proper flow here, we will import our model like so:

```js
require('./models/store')
```

## Create store.js model

Then we gotta make that file, `models/store.js`. In it we require `mongoose` and `slugs`, our two helper libraries for the model.

```js
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')
```

What `model.js` is going to do for us is define the shape of our data (schema), which is a requirement of MongoDB by default (you can have a loose database if you want). So later when we make a form for someone to add a restaurant, and we ask them for a name, description, and maybe a handful of pre-defined tags (like does it have wifi, is it pet friendly, etc.), then we can be sure that nothing invalid gets put into our database.

Our schema:

```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
})
```

Because our store is going to have a name and description.

`trim: true` is to remove whitespace.

`required: true` would yield a default mongoDB error, but by passing in a string with our error message, Mongoose gives us a nicer more helpful error.

`tags: [String]` says we expect an array of strings. Easy-Peezy.

### The slug

```js
storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next() //skip it
    return //stop this function from running
  }
  this.slug = slug(this.name)
  next()
})
```

We use this handy Mongoose `.pre` function and pass in `'save'` so that it will run before saving to the database. Then, we pass in a regular function so that we can reference `this` ([why not an arrow function?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)). This functions says if the name hasn't changed, float on. If it has, then make a new slug from that name using our `slugs` import. Later, we will explore how to make sure our slugs are unique, so we don't have "Root Cellar Cafe", and "Root-Cellar Cafe" duking it out for a spot on the roster.

[In the next one](/posts/learning-node/mixins), we learn how to include one pug template, our store form, and mix it in to another template, one of our views.

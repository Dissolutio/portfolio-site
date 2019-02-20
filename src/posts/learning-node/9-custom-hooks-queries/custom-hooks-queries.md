---
title: "Learning Node #9: Custom Hooks and Queries"
date: "2018-09-12T12:36:00.000Z"
path: "/posts/learning-node/custom-hooks-queries"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Making unique slugs

First in our model `store.js`, we go to the storeSchema.pre-save function.
We make it an async function, because we're gonna query the database to see if the slug we want to use for our store is taken already. We will await the query, instead of attaching a callback to it.

We make a big bad RegExp, and query the database for a match. If there is one or more matches, we name the next slug with the next number.

The code is like so:

```js
storeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next()
  }
  this.slug = slug(this.name)
  // find stores with slug ex, ex-1, ex-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`
  }
  next()
})
```

Do take note how since in this file we don't actually create `Store` until the end, we cannot use `Store.find()`, we have to access that functionality through `this.constructor.find()`. That might have taken me a long time to figure out on my own, and is an important precedent for future Node.js endeavors.

Next in [#10: Custom Mongo DB Aggregations](/posts/learning-node/custom-mongo-aggregations) we build our tags page!

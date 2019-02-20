---
title: 'Learning Node #18: Locking down our application with User Permissions'
date: '2018-09-24T07:30:00.000Z'
path: '/posts/learning-node/user-permissions'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

We want to to able to link our stores with an author, one of the users in our database.
How to create that relationship in mongoDB?

## First

We gotta add this to our Store model:

```js
// models/store.js
author: {
  type: mongoose.Schema.ObjectId,
  ref: 'User',
  required: 'You must supply an author'
	},
```

Notice how it is not just a string type. We are telling mongoDB it's an ObjectId, and the object we are referencing is the 'User' object. MongoDB is built well, and its objects are not going to expose their internal data, they will only expose an interface for functions of that data. (Higher level stuff I suppose but I'm reading <cite>Clean Code: A Handbook of Agile Software Craftsmanship</cite> by Robert C. Martin and it is cool to see the new patterns.)

## Second

Add this line to `storeController.js` as the first line in `exports.createStore`:

```js
req.body.author = req.user._id
```

Now if we go and add a new store, we can check in our database that it was saved with an author, and that author isn't a string, it's the same `ObjectId` that my mongoDB `user._id` is.

However, if in our `store.pug` file we do a `pre= h.dump(store)`, the JSON that it spits out features a very simple

```json
"author": "5b9faf484647f83a4086fe3f",
```

So if we want to pass along the actual User data, we must go to `storeController.js` and edit the `exports.getStoreBySlug` function (or anywhere else we need the author data on a store fetch) to include this `populate` method:

```js
const store = await Store.findOne({ slug: req.params.slug }).populate('author')
```

I would not do that, however, except in development, because putting the `salt` and `hash` properties in the open does not seem wise.

## Stop people from editing stores they don't own

In `storeController.js` in between `exports.getStores` and `exports.editStore` we will add a new function:

```js
const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!')
  }
}
```

`.equals` is a mongoDB property of `ObjectId`.

Then run `confirmOwner()` inside of `exports.editStore`:

```js
exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  confirmOwner(store, req.user)
  res.render('editStore', { title: `Edit ${store.name}`, store })
}
```

You could make this functionality more versatile by giving users different access levels or names. Like editors, admins, basic-users etc.

Next in [#19 we start exploring Ajax and API operations in our app](/posts/learning-node/ajax-search-1)

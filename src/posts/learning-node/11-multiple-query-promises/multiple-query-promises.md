---
title: "Learning Node #11: Multiple Query Promises with Async/Await"
date: "2018-09-13T08:19:00.000Z"
path: "/posts/learning-node/multiple-query-promises"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Promise.all([promise1, promise2...])

In our controller method below, we will be querying the database twice. Once for our tags, and once for all the stores that included the active tag. We cannot move forward with rendering our view till they both come back, but we don't want them to be synchronous, like this:

```js
  const tags = await Store.getTagsList()
  const stores = await Store.find({ tags: tag })
```

We would rather fire them both off, and then wait for them both to come back. So we await `Promise.all`, pass that an array of promises, and destructure that array into our array of variables, `[tags, stores]`.

```js
exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag
  const tagsPromise = Store.getTagsList()
  const storesPromise = Store.find({ tags: tag })
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise])
  res.render('tags', { tags, title: 'Tags', tag, stores })
}
```

## Render the stores

We have passed our `stores` to the pug template. In our pug template, we can verify the arrival of the new data with `pre=h.dump(stores)`. This will spit out some JSON, and we can see our stores objects all with the requested tag in their tags array.

Delete that dump, and import our `storeCard` pug mixin and use it. Too easy.

```pug
include mixins/_storeCard
//- ...THE REST OF TAGS PAGE...
.stores
      each store in stores
        +storeCard(store)
```

## Initially, display all stores with a tag

We add this line to our controller method:

```js{2}
const tag = req.params.tag;
const tagQuery = tag || { $exists: true };
const storesPromise = Store.find({ tags: tagQuery })
```

This makes it so that if there is no `tag` parameter, then we are simply at the `/tags` page, so query for all stores that even have a tag, and we will filter them down from there.

Next, in [#12 we create user accounts](/posts/learning-node/creating-user-accounts)!

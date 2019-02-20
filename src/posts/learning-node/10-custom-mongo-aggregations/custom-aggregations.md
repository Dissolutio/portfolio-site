---
title: "Learning Node #10: Custom MongoDB Aggregations"
date: "2018-09-12T13:28:00.000Z"
path: "/posts/learning-node/custom-mongo-aggregations"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

## Using aggregations to make our 'Tags' page

So basically, if we had thousands of store in our database, it would not make sense to query the database for all of our stores, and then loop over all that data to find stores with only certain tags. Instead, we offload the heavy lifting of sorting data from Node onto MongoDB, because that's what databases are good at. See [the mongo aggregations docs](https://docs.mongodb.com/manual/aggregation/)!

### Make the route

Nothing fancy here, add the routes, and then we will do the thing in `store-controller`.

```js
// in routes/index.js
router.get('/tags', catchErrors(storeController.getStoresByTag))
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag))
// in storeController
// just to make sure it works
exports.getStoresByTag = async (req, res) => {
  res.send('It works!!!')
}
```

And voila, we see that clicking the 'Tags' link in our main navigation yields a plain "It works!!!" page.

### Making a static method on our storeSchema

We will make our new storeController export look like so:

```js
exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList()
  const tag = req.params.tag
  res.render('tags', { tags, title: 'Tags', tag })
}
```

But we have to go to our `Store.js` model, and create a static method on it. This static method cannot be an arrow function, it must be a proper function, because it will be bound to our Store model and we want the `this` keyword to reference the Store model.
Note that `aggregate` is a mongoDB method, like `find`. It accepts an array of possible operators.

```js
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    // Here we put a list of possible operators
  ])
}
```

### Aggregators

The [mongoDB docs on aggregations](https://docs.mongodb.com/manual/aggregation/) detail all the possible aggregators you can add to the `aggregate([])` pipeline.

In total, here is what we are putting in, then I will describe it:

```js
{ $unwind: '$tags' },
{$group: {_id: '$tags', count: { $sum: 1 } } },
{ $sort: { count: -1 } },
```

- The first aggregator we use is called `$unwind`, and we will be unwinding the `tags` field of our document (a store in this case), which we indicate with the '$' in front of 'tags'. Unwind means we get a return document per tag. So if Brew Bar has 2 tags, 'wi-fi' and 'open-late', we will get a whole store object back with `"tags": "wi-fi"` and another whole one with `"tags":"open-late"`. It will do this for all tags on all stores.

- The second aggregator we use is `$group`. We tell it to group the data that we have 'unwound' into more compact JSON objects with an \_id of the tag they have, and a count which will add one every time that tag occurs. The ouput of our previous example would look like:

  ```json
  //if we used res.json to send back our query so far:
  [{ "_id": "wi-fi", "count": 1 }, { "_id": "open-late", "count": 1 }]
  ```

- The third aggregator is `$sort`, and we want to sort based on the 'count', and we can either have the tag with the most counts first (descending order), or the tag with the least counts first (ascending order). These are denoted by either a '1' or '-1'. We want the tag with most counts first, so we use '-1'.

### Making the tags page view:

```pug
extends layout

block content
  .inner
    h2 #{tag || title}
    ul.tags
      each t in tags
        li.tag
          a.tag__link(href=`/tags/${t._id}` class=(t._id === tag ? 'tag__link--active':''))
            span.tag__text= t._id
            span.tag__count= t.count
```

Remember, `#{tag}` (the parameter from our URL), `#{title}` (which we define as a string), and `tags`(the result of our aggregation pipeline query, which is an array of objects) are all passed in by `storeController`, in the line:

```js
res.render('tags', { tags, title: 'Tags', tag })
```

So you can see how we construct a list of links, only one of which will match the URL and be 'active'. Beautiful!

Next, in [#11: Multiple Query Promises with Async/Await
](/posts/learning-node/multiple-query-promises) we want to make it so that when we click on a tag, all the stores with that tag are displayed below.

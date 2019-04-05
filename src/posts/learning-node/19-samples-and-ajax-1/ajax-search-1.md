---
title: 'Learning Node #19: Ajax REST API'
date: '2018-09-27T09:30:00.000Z'
path: '/posts/learning-node/ajax-search-1'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Loading Sample Data

We will implement the sample data loading feature that the instructor made for us. Thanks again, [Bos man](www.wesbos.com).

We can see in our package.json that he made two scripts that run `data/load-sample-data.js`, one does it to save all the sample data to the database, the other deletes it.

The scripts are `sample` and `blowitallaway`.

If we go into `load-sample-data.js` we will want to comment out the four lines having to do with reviews because we haven't built the stuff that uses them.

They look like so:

```js
// load-sample-data.js
const Review = require('../models/Review')

const reviews = JSON.parse(
  fs.readFileSync(__dirname + '/reviews.json', 'utf-8')
)

await Review.remove()

await Review.insertMany(reviews)
```

The file is not really part of the application. It loads up its own connection to the database, imports the needed models, reads and parses some data, and does its own thing.

## Indexing database

If you are going to be executing a query very often it is good to index the data so the database can process those queries faster. I do not know the gritty details of why this works, but here is how we index some of our data that we will be querying often.

We will index some text fields, and the latitude/ longitude fields on our stores.

If we load up our database GUI, we can look and see that our sample users have their `_id` and `email` indexed already, compliments of our passport plugin.

We will go to the `store.js` model, as we always index in our Schema for mongoDB.

```js
// Define our indexes
storeSchema.index({
  name: 'text',
  description: 'text',
})
```

This will let us search these two fields in one shot.

## API endpoint

In our `routes/index.js` we will group our API related routes at the bottom together; here is the route we create:

```js
router.get('/api/search'), catchErrors(storeController.searchStores)
```

We make that export here:

```js
// storeController.searchStores
exports.searchStores = async (req, res) => {
  const stores = await Store.find(
    {
      $text: {
        $search: req.query.q,
      },
    },
    {
      score: { $meta: 'textScore' },
    }
  ).sort({
    score: { $meta: 'textScore' },
  })
  res.json(stores)
}
```

Check [the docs to undersand the $text query](https://docs.mongodb.com/manual/reference/operator/query/text/).
The score is basically an invisible field on the data that corresponds to how much the query appears in the text.

Now we have a way to quickly search the stores for some text, and sort them based on how much they contain that text.
We will hookup our search input to this in [#20, so that with every input, we can query the database and get some auto-suggestions for our search bar.](/posts/learning-node/ajax-search-2).

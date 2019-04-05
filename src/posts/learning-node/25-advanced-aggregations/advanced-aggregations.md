---
title: 'Learning Node #25: Advanced Aggregations'
date: '2018-10-10T16:47:00.000Z'
path: '/posts/learning-node/advanced-aggregation'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Reinstate reviews to our sample data

Do you remember [in learning Node post #19 we edited out](/posts/learning-node/ajax-search-1) some lines of our `loadSampleData.js` because we hadn't built the stuff for reviews yet? Well, we need to go un-comment those out, so we can get some sample-data loaded with reviews!

Then, we can build out our Top Stores page. It will involve putting another static method on our `storeSchema`, to make an 'advanced aggregation'. Back-end skills, baby, be not afraid.

## Hit a route

We have a 'Top' link in our navbar, let's hook it up.

```js
// routes/index.js
router.get('/top', catchErrors(storeController.getTopStores))
```

## Handle it with the storeController

```js
// controllers/storeController.js
exports.getTopStores = async (req, res) => {
  const stores = await Store.getTopStores()
  res.render('topStores', { stores, title: '★ Top Stores' })
}
```

Cool, we have to make `getTopStores` aggregation, and then a `topStores` view!

## Aggregation

What's this? A `Store.getTopStores()` query instead of a `Store.find()`?
We aren't scared, we can [lookup mongoDB aggregation stages](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) all day! Plus we [already did one in learning Node post 10!](/posts/learning-node/custom-mongo-aggregations)

```js
storeSchema.statics.getTopStores = function() {
  return this.aggregate([
    // lookup stores and populate reviews
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'store',
        as: 'reviews',
      },
    },
    // filter for items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
      },
    },
    // sort it, highest reviews first
    { $sort: { averageRating: -1 } },
    // limit it to ten
    { $limit: 10 },
  ])
}
```

Add an `autopopulate` method and apply it liberally, if you would like the reviews to just always be returned with your stores:

```js
function autopopulate(next) {
  this.populate('reviews')
  next()
}

storeSchema.pre('find', autopopulate)
storeSchema.pre('findOne', autopopulate)
```

## Make a top stores page

```pug
extends layout

block content
  .inner
    h2 Top {stores.length} Stores
    table.table
      thead
        td photo
        td ranking
        td name
        td # of reviews
        td Average Rating
      each store, i in stores
        tr
          td
            a(href=`/stores/${store.slug}`)
              img(width=200 src=`/uploads/${store.photo || 'store.png'}` alt=store.name)
          td #{i + 1}
          td: a(href=`/stores/${store.slug}`)= store.name
          td= store.reviews.length
          td #{Math.round(store.averageRating*10)/10} /5
```

## Add icon with counter

Our stores cards can now have an icon for the reviews, since we populated that reviews field for everybody:

```pug
//- in views/mixins/_storeCard.pug
if store.reviews
  .store__action.store__action--count
    != h.icon('review')
  span= store.reviews.length
```

Whoo-Hoo! In the [next and last one, we explore pagination!](/posts/learning-node/pagination)

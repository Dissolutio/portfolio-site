---
title: "Learning Node #8: REVIEW"
date: "2018-08-06T15:49:00.000Z"
path: "/posts/learning-node/review"
tags: ['node','app', 'javascript']
category: "Learning Node"
---

# A review of material so far

[These tutorials](https://learnnode.com/) are so good, and organizing my progress into blog posts really drills the information into my head.

# Render / template store pages

Here we will go through the whole flow of creating a route, passing to the controller, using the controller in the context of the project, and finally rendering some data.

It's like the third time we do this flow in the video series, so it's a good time to review what the operation has been.

First create a route, utilizing again that handy wild card:

```js
router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug))
```

where the slug is used to lookup the store in the database. We can happily link to our stores, elsewhere in our markup, like this

```pug
`<a href="/stores/${store.slug}">View Store</a>`
```

## Data retrieval

Our `storeController` export will go like this, attempting to retrieve a store and render it with a store template.

```js
exports.getStoreBySlug = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug })
  if (!store) return next()
  res.render('store', { store, title: store.name })
}
```

## Remembering our design

Again, and this is stressed, remember that `routes`, and thus `storeController` are happening in the context of `app` and we can always call `next()` to pass along our `(req, res)` to the next middleware or error handler.

In this case, if there is no store returned, we'd rather our `errorHandler.notFound` take the wheel.

## Store Page Template

And finally, we make a template for our cute lil store, displaying it to the world in a useful and beautiful way:

```pug
extends layout

block content
  .single
    .single__hero
      img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
      h2.title.title--single
        a(href=`/stores/${store.slug}`) #{store.name}
  .single__details.inner
    img.single__map(src=h.staticMap(store.location.coordinates))
    p.single__location= store.location.address
    p= store.description

    if store.tags
      ul.tags
        each tag in store.tags
          li.tag
            a.tag__link(href=`/tags/${tag}`)
              span.tag__text #{tag}q
```

### h.staticMap

Another helper. This one generates a handy URL string for us to use and get a static image back from Google. It has to flip the order that mongoDB uses, which is longitude before latitude. Wonderful, n'est-ce pas?

```js
exports.staticMap = ([lng, lat]) =>
  `https://maps.googleapis.com/maps/api/staticmap
  ?center=${lat},${lng}
  &zoom=14
  &size=800x150&key=${process.env.MAP_KEY}
  &markers=${lat},${lng}
  &scale=2`
```

Next, in [#9: Custom Hooks and Queries](/posts/learning-node/custom-hooks-queries) we make sure the slugs for our invdividual stores are unique!

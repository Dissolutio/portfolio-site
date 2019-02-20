---
title: "Learning Node #4: Pug Mixins"
date: "2018-07-16T14:32:00.000Z"
path: "/posts/learning-node/mixins"
tags: ['node','app', 'javascript', 'pug']
category: "Learning Node"
---

## Add Store / Edit Store

Our site nav has an "Add" link where we will go to add and edit stores.

### Add the routes

First, we will add to our `routes/index.js` folder:

```js
router.get('/add', storeController.addStore)
router.post('/add', storeController.createStore)
```

We are going to use `storeController.addStore` for both adding/editing stores. Keeps our code [DRY](https://dzone.com/articles/is-your-code-dry-or-wet). We will use `storeController.createStore` to send our form to.

### Create the view

We add to our `views` folder a new pug template called `editStore.pug`:

```pug{4,9}
//- editStore.pug
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm()
```

### Create the mixin

And then in our `views/mixins` folder we can create our first mixin, whose highlighted syntax you can see pairs with that above:

```pug{1}
mixin storeForm(store = {})
  form(action="/add" method="POST" class="card")
    label(for="name") Name
    input(type="text" name="name")
    label(for="description") Description
    textarea(name="description")
    - const choices = ['Wifi', 'Open Late', 'Family Friendly', 'Vegetarian', 'Licensed']
    ul.tags
      each choice in choices
        .tag.tag__choice
          input(type="checkbox" id=choice value=choice name="tags")
          label(for=choice) #{choice}
    input(type="submit" value="Save \u{1F600}" class="button")
```

The mixin is a function of `store` which defaults to an empty object. Note, we use prior knowledge to run JavaScript inside of Pug with a `-` character.
Note also how the [iteration works in Pug](https://pugjs.org/language/iteration.html).Furthermore, we can use emoji code against all necessity, with that smiley `\u{1F600}`.

#### Form methods

Also, we are using the form method POST, which does not display the data in the URL bar. If we use GET, then it would give us a link which we could share. POST is more secure, obviously.

### The createStore controller

Over in `storeController.js` we add another export:

```js
exports.createStore = (req, res) => {
  console.log(req.body)
  res.json(req.body)
}
```

And the `console.log` will give us the data back in our terminal, the `res.json` does the same for our browser, and we get our form data shot right back to us as a JSON object. How cute!

```json
{
  "name": "Scatterbeam",
  "description":
    "Setting sail on the digital seas!
    breaking blockades! compiling to C!
    we gather to Scatter! Ho! Life on the Beam!",
  "tags": ["Wifi", "Open Late", "Vegetarian"]
}
```

Now that we have form up, [we're ready to make a flow for how to edit and create stores](/posts/learning-node/control-flow).

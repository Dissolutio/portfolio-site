---
title: 'Learning Node #20: Search Input Ajax Suggestions'
date: '2018-10-04T08:30:00.000Z'
path: '/posts/learning-node/ajax-search-2'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Client side JavaScript module

This type ahead feature will run on the client side as they type into the input. So let's make
a new file at `public/javascripts/modules/typeAhead.js`.

Import this file into `delicious-app.js`, which is our index file for our javascript modules.

```js
// public/javascripts/delicious-app.js
import typeAhead from './modules/typeAhead'

typeAhead($('.search'))
```

We select the search div with bling, and pass it to `typeAhead`.

## XSS (Cross-Site Scripting) Attacks

So in this module we will be using data that was entered from a user, taken to our database and now being pulled back out by our API request. We are going to insert this data into the DOM, which opens us up to somebody putting HTML in the `_storeForm.pug_` view that references some JavaScript they'd like to nefariously run on our site.

For example, let's say they enter this for the store name:

```html
<img src="wherever.jpg" onload="alert('You got hacked!')"/>
```

Well now if we load that up, the `onload` script runs and we could be in big trouble.
So we use the DOMpurify library to sanitize our HTML before we inject it into our site!
It is mentionable in this tutorial that if you go back and look at our code, there are spots we should be sanitizing HTML but we are not! (Remember that if you build off of this codebase, adding DOMpurify is a TODO! Lest your web app be known as 'smote upon the mountain')

## typeAhead function

First, just make sure it's hooked up right. `console.log` the data as you go so you don't get ahead of yourself!
Our dependencies are `axios`, which is an http request library using async/await. And dompurify will cleanup html before we insert it into our DOM, in case somebody did something nefarious.
Then, grab your elements and build the thing:

```js
// typeAhead.js
import axios from 'axios';
import dompurify from 'dompurify';

function typeAhead(search) {
  // console.log(search);
if (!search) return;

const searchInput = search.querySelector('input[name="search"]');
const searchResults = search.querySelector('.search__results');
searchInput.on('input', function() {
  if (!this.value) {
    searchResults.style.display = 'none';
    return;
  }
    searchResults.style.display = 'block';
  }
  axios
    .get(`/api/search?q=${this.value}`)
    .then(res => {
      if (res.data.length) {
        // console.log('Data recieved!');
        searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
        return;
      }
      // tell them nothing came back
      searchResults.innerHTML = dompurify.sanitize(
        `<div class="search__result">No results for ${this.value} found!</div>`
      );
    })
    .catch(err => {
      console.error(err);
    });
}
```

We have created a new function, `searchResultsHTML(res.data)` . It is straightforward.

We put it in the `typeAhead` file, and it goes like this:

```js
function searchResultsHTML(stores) {
  return stores
    .map(store => {
      return `
      <a href="/stores/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `
    })
    .join('')
}
```

## Building a keycode command interface

So once the user has typed a value in, and we are displaying matches, we would like the user to be able to use the up and down arrows to navigate the search results, and hit enter to go to that store.
So we are going to listen to keycode events, and create two cases each for the up and down arrow, and then one case for the enter key. Check it out:

```js
searchInput.on('keyup', e => {
  if (![38, 40, 13].includes(e.keyCode)) {
    return
  }
  const activeClass = 'search__result--active'
  const current = search.querySelector(`.${activeClass}`)
  const items = search.querySelectorAll('.search__result')
  let next
  // 40 is down arrow, 38 up arrow, 13 enter
  if (e.keyCode === 40 && current) {
    next = current.nextElementSibling || items[0]
  } else if (e.keyCode === 40) {
    // there is no current yet
    next = items[0]
  } else if (e.keyCode === 38 && current) {
    next = current.previousElementSibling || items[items.length - 1]
  } else if (e.keyCode === 38) {
    next = items[items.length - 1]
  } else if (e.keyCode === 13 && current.href) {
    window.location = current.href
    return
  }
  if (current) {
    current.classList.remove(activeClass)
  }
  next.classList.add(activeClass)
})
```

## Recap

Building this functionality involved some steps:

1. Load sample data
2. Index 2 text fields of our store objects that we intend to query heavily
3. Route our search api to our store controller
4. Query stores with our indexed text, score the stores, sort the stores, send the stores as JSON
5. Sanitize and inject some of that JSON as HTML, which with some browser JS we have given the functionality of a navigable list of suggested store links based on the current search input. And it even looks nice.

We rock! [In #21, let's build another one!](/posts/learning-node/geospatial-ajax)

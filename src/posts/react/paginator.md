---
title: 'Building a Reusable Pagination Component'
date: '2018-10-19T10:18:00.000Z'
path: '/posts/react/paginator'
tags: ['react', 'app', 'firebase', 'heroscape-armory']
category: 'React'
---

## TL;DR

This React component wraps your list component, and paginates an array of items to display into it. No dependencies, but probably a little bit of configuration to work with your code.

[Check out the code here](#items):

## The problem

In React, we are often passing an array of things and then mapping that array to some JSX. We often want to display only some discrete quantity of that array. We seek to paginate!

In my Heroscape-Armory app, I have over 200 cards for the user to browse, but I want to make sure I'm not serving up too much data at once. It slows the app down and annoys the user.

## The solution

We want a stateful component to wrap our list. It will recieve as props:

1. Items Array

2. Render prop: What to display

We can tell it either through props or manually what page to start on, and how many items to display per page.

I need methods for changing pages, and you could get creative here. You could make methods for going to the first or last page, a specific page, gluing all the odd numbered pages together, whatever.For now, I only need a forward and back button for paging through.

Last but not least, when the list of items changes, I need the component to handle that and update without changing the page we are on. I use the `ComponentDidUpdate` lifecycle method for this, and it works like a charm!

<h2 id="items">The code</h2>

<details>
<summary>
Paginator.js (click me to see code)
</summary>

```js
// Paginator.js

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Paginator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: parseInt(props.page) || 1,
      totalPages: 1,
      cardsToDisplay: [],
      limit: 10,
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.items !== this.props.items) {
      const { items } = this.props
      if (!items) {
        return
      }
      const totalPages = Math.ceil(items.length / this.state.limit) || 1
      this.setState({ totalPages }, this.update)
    }
  }

  update = () => {
    const { items } = this.props
    const { currentPage, limit } = this.state
    const firstItem = currentPage * limit - limit
    const lastItem = currentPage * limit
    const cardsToDisplay = items.slice(firstItem, lastItem)
    this.setState({ cardsToDisplay })
  }

  nextPage = () => {
    const { currentPage, totalPages } = this.state
    if (currentPage >= totalPages) {
      this.setState({ currentPage: 1 }, this.update)
    } else {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        this.update
      )
    }
  }
  prevPage = () => {
    const { currentPage, totalPages } = this.state
    if (currentPage <= 1) {
      this.setState({ currentPage: totalPages }, this.update)
    } else {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.update
      )
    }
  }

  render() {
    if (!this.props.items) {
      return (
        <div style={{ color: 'black', fontSize: '3rem' }}>LOADING ITEMS</div>
      )
    }
    const pagination = {
      cardsToDisplay: this.state.cardsToDisplay,
      currentPage: this.state.currentPage,
      totalPages: this.state.totalPages,
      nextPage: this.nextPage,
      prevPage: this.prevPage,
    }
    return this.props.render(pagination)
  }
}
```

</details>
<details>
<summary>
Gallery.js (Parent component to Paginator)
</summary>

```js
// Gallery.js

import React from 'react'
import GalleryList from './Card/GalleryList'
import Paginator from '../Utilities/Paginator'
export default props => {
  return (
    <div>
      <Paginator
        items={props.cardsToDisplay}
        render={pagination => (
          <GalleryList pagination={pagination} props={props} />
        )}
      />
    </div>
  )
}
```

</details>
<details>
<summary>
GalleryList.js (Rendered by the Paginator)
</summary>

```js
// GalleryList.js

import React from 'react'
import GalleryCard from './GalleryCard'

export default props => {
  const {
    cardsToDisplay,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
  } = props.pagination

  return (
    <div>
      <button onClick={prevPage}>Prev</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={nextPage}>Next</button>
      <ul>
        {cardsToDisplay.map(card => (
          <GalleryCard key={card.name} card={card} />
        ))}
      </ul>
    </div>
  )
}
```

</details>

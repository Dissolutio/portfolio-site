---
title: 'Learning Node #21: Geospatial Ajax'
date: '2018-10-05T09:00:00.000Z'
path: '/posts/learning-node/geospatial-ajax'
tags: ['node', 'app', 'javascript']
category: 'Learning Node'
---

## Index our data

So we will be querying the location field fairly often, when users want to see the stores on a map.
Let's index that data, and you can always [check the mongoDB docs on geospatial queries](https://docs.mongodb.com/manual/geospatial-queries/)!

```js
// models/store.js
storeSchema.index({
  location: '2dsphere',
})
```

## Create a route for our API request

```js
// routes/index.js
router.get('/api/stores/near', catchErrors(storeController.mapStores))
```

## Geospatial Query

Now when we visit `/api/stores/near` we can add queries like `?lat=43.2&lng=-79.8`. We handle this query below, but take note of two filters we apply, `select` and `limit`.
The `select()` method is pretty handy, you just enter the names of the fields you want included on your data, and scratch the rest. `limit()` obviously keeps it to ten stores.

```js
// storeController.js
exports.mapStores = async (req, res) => {
  // mongoDB wants `lng`  before `lat`
  // it wants numbers not strings
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat)
  const query = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: 10000, //10 kilometers
      },
    },
  }
  const stores = await Store.find(query)
    .select('slug name description location')
    .limit(10)
  res.json(stores)
}
```

## /map page

So in the nav of our site, we have a map icon. Let's hook it up:

```js
router.get('/map', storeController.mapPage)
```

## controller method

```js
// storeController.js
exports.mapPage = (req, res) => {
  res.render('map', { title: 'Map' })
}
```

## map.pug

Our view has a search input and a soon-to-be map.

```pug
extends layout

block content
  .inner
    h2= title
    .map
      .autocomplete
        input.autocomplete__input(type="text" placeholder="Search for Anything" name="geolocate")
      #map
        p Loading Map..
```

## built the client side JavaScript module

We will make a file at `/modules/map.js` and import it and use it in `javascripts/delicious-app.js`:

```js
// added to javascripts/delicious-app.js
import makeMap from './modules/map'
makeMap($('#map'))
```

## map module

The module will have two functions, and a default location which we place with a `mapOptions` object.
The teacher for this tutorial lives in Hamilton, Canada, so the stores and thus our default location will be there.

This module is easy to read, but if you wanted to use the knowledge I am sure you would have to [check the docs for the Google maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial).

```js
// javascripts/modules/map.js

import axios from 'axios'
import { $ } from './bling'

// default starting spot
const mapOptions = {
  center: { lat: 43.2, lng: -79.8 },
  zoom: 10,
}

function loadPlaces(map, lat = 43.2, lng = -79.8) {
  axios
    .get(`/api/stores/near?lat=${lat}&lng=${lng}`)
    .then(res => {
      const places = res.data
      if (!places.length) {
        alert('No places found!')
        return
      }
      // create a bounds for zoom level
      const bounds = new google.maps.LatLngBounds()
      // create infoWindow to inject html into when we
      // click on a marker
      const infoWindow = new google.maps.InfoWindow()
      // convert our places into google markers
      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates
        const position = { lat: placeLat, lng: placeLng }
        // update our bounds
        bounds.extend(position)
        //put the place on the map
        const marker = new google.maps.Marker({
          map: map,
          position: position,
        })
        // attach the data for use in infoWindow
        marker.place = place
        return marker
      })
      // when someone clicks marker, show details of that place
      markers.forEach(marker =>
        marker.addListener('click', function() {
          const html = `
        <div class="popup">
        <a href="/store/${this.place.slug}">
          <img src="/uploads/${this.place.photo || 'store.png'}" alt="${
            this.place.name
          }" />
          <p>${this.place.name} - ${this.place.location.address}</p>
        </a>
        </div>
        `
          infoWindow.setContent(html)
          infoWindow.open(map, this)
        })
      )

      // then zoom map to fit bounds
      map.setCenter(bounds.getCenter())
      map.fitBounds(bounds)
    })
    .catch(console.error)
}

function makeMap(mapDiv) {
  if (!mapDiv) return
  const map = new google.maps.Map(mapDiv, mapOptions)
  loadPlaces(map)
  const input = $('[name="geolocate"]')
  const autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    loadPlaces(
      map,
      place.geometry.location.lat(),
      place.geometry.location.lng()
    )
  })
}
export default makeMap
```

That was a long process, but the map we have made is super cool! And now we have experience with a truly powerful API!

So we have fetched data from our API. In the [next one, we push some data to our API when users choose to "heart" a store!](/posts/learning-node/pushing-user-data)

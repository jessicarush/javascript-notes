# Google Maps Javascript API

This API now requires that you create a billing account and obtain an API key. At the time of this writing (August 21, 2019), Google states that you can use [$200 worth of API calls per month for free](https://cloud.google.com/maps-platform/pricing/sheet/) but, they need your billing information to ensure you're not a robot.


## Table of Contents

<!-- toc -->

- [API Keys](#api-keys)
- [Script](#script)
- [Options](#options)
  * [zoom](#zoom)
  * [mapTypeId](#maptypeid)
  * [styles](#styles)
  * [controls](#controls)
- [Adding Markers](#adding-markers)
- [Resources](#resources)

<!-- tocstop -->

## API Keys

Regarding the API key, this will be included in the `<script src="">`. So basically, anyone could look at your code at copy your key. As a result, it's important to [restrict how your key can be used](https://developers.google.com/maps/api-key-best-practices). For example, in `APIs & Services` section of Google Cloud Platform, you can set:

- which APIs your key is allowed to access
- specific domains/urls that your key can be used from
- specific IP addresses that your key can be used from
- specific IOS or Android apps that your key can be used from

You can create as many keys as you need so typically you would have a different key for each project. Be sure to delete keys that are no longer in use and monitor the usage of the others.


## Script

The API script will look like this:

```html
<script src="js/scripts.js" async defer></script>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

The async attribute lets the browser render the rest of your website while the Maps JavaScript API loads. When the API is ready, it will call the function specified using the callback parameter. This should be loaded *after* the script that contains the callback.

You'll need an HTML container element:

```html
<div id="map"></div>
```

And the callback:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
  });
}
```

Another method is to put the scripts together like this:

```html
<script src="js/google-map.js" async defer></script>
```

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
  });
}

function loadGoogleAPI() {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBI6MWElC2dDGz1wZ-_HEEc_iH0DR-voSI&callback=initMap';
  document.body.appendChild(script);
}

window.onload = loadGoogleAPI;
```

## Options

The two options *center* and *zoom*, are required but there are many additional optional ones. Foe example:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
    mapTypeId: 'hybrid',
  });
}
```

### zoom

Some common zoom levels:

- 1 - World
- 5 - Landmass/continent
- 10 - City
- 15 - Streets
- 20 - Buildings

### mapTypeId

There are four options for this:

- 'roadmap' - displays the default road map view.
- 'satellite' - displays Google Earth satellite images.
- 'hybrid' - displays a mixture of normal and satellite views.
- 'terrain' - displays a physical map based on terrain information.

### styles

You can customize the presentation of Google base maps, changing the visual display of elements such as roads, parks, etc. Styling can also be applied to prevent businesses, points of interest and other features from appearing on the map. There are two ways to style maps. The first is to set the `styles` property of the map's options object. This approach changes the style of the standard map types. The other option is to create a `StyledMapType` and apply it to the map. This makes a new *map type*, which the user can select from the map type control. I'm going to focus on the first method. Here's an example:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
    mapTypeId: 'roadmap',
    styles: [
      {
        elementType: 'geometry',
        stylers: [{color: '#242f3e'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      }
    ]
  });
}
```

- **featureType (optional)** - the features to select for this style modification. Features are geographic characteristics on the map, including roads, parks, bodies of water, and more. If you don't specify a feature, all features are selected.
- **elementType (optional)** - the property of the specified feature to select. Elements are sub-parts of a feature, including labels and geometry. If you don't specify an element, all elements of the feature are selected.
- **stylers** - the rules to apply to the selected features and elements. Stylers indicate the color, visibility, and weight of the feature. You can apply one or more stylers to a feature.

For a list of all available values for featureType, elementType and stylers, see the [JSON style reference](https://developers.google.com/maps/documentation/javascript/style-reference).

### controls

Map controls can be added or removed in the map options by setting each feature as a boolean. For example:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
  });
}
```

You can also move the controls position:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    rotateControl: false,
    fullscreenControl: true
  });
}
```

The possible values for position are: `TOP_LEFT`, `TOP_CENTER`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_CENTER`, `BOTTOM_RIGHT`, `LEFT_TOP`, `LEFT_CENTER`, `LEFT_BOTTOM`, `RIGHT_TOP`, `RIGHT_CENTER`, `RIGHT_BOTTOM`. [See here for a visual aid](https://developers.google.com/maps/documentation/javascript/controls).


## Adding Markers

You can add a marker by creating a new marker object and passing it a position and map tp display it on. for example:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10
  });
  const sunsetBeach = {lat: 49.281, lng: -123.140};
  const marker = new google.maps.Marker({position: sunsetBeach, map: map});
}
```

You can add many more options such as:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10
  });
  const sunsetBeach = {lat: 49.281, lng: -123.140};
  const marker = new google.maps.Marker({
    position: sunsetBeach,
    map: map,
    icon: 'img/icon.png',
    title: 'Text that appears on hover',
  });
}
```

Note that the icon will look like shit on high res screens because it will automatically display the png at 72 ppi. To fix this, create an icon object and pass that to the icon property. In the object set the size and scaledSize to be smaller than the actual image size. For example my actual image size could be 84x40 or 168x80.

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.281, lng: -123.140},
    zoom: 10
  });
  const sunsetBeach = {lat: 49.281, lng: -123.140};
  const icon = {
    url: 'img/icon.png',
    size: new google.maps.Size(42, 20),
    scaledSize: new google.maps.Size(42, 20),
}
  const marker = new google.maps.Marker({
    position: sunsetBeach,
    map: map,
    icon: icon,
    title: 'Text that appears on hover',
  });
}
```


## Resources

[Documentation & tutorials](https://developers.google.com/maps/documentation/javascript/tutorial)  
[Style Reference](https://developers.google.com/maps/documentation/javascript/style-reference)  
[Styling Wizard](https://mapstyle.withgoogle.com/)  
[API Key best practices](https://developers.google.com/maps/api-key-best-practices)

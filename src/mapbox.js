import mapbox from 'mapbox-gl'

mapbox.accessToken = 'pk.eyJ1IjoiZXRpZW5uZWJ1cmRldCIsImEiOiJja2F4bHN2MXUwMGliMnJsN2RzNXowYzQ1In0.ju6w4WN1F_CRVNXtp5L-7w';
const key = {}

const initMap = (container) => new mapbox.Map({
  container,
  zoom: 0.3,
  center: [0, 20],
  style: 'mapbox://styles/mapbox/light-v10'
})


const setFeatures = (map) => () => {
  features = map.querySourceFeatures('earthquakes')
  console.log(features)
}

const updateFeatures = (map) => () => {
  map.on('move', setFeatures(map))
  map.on('moveend', setFeatures(map))
  setFeatures(map)
}

const addSource = (map) => () => {
  map.addSource('earthquakes', {
    'type': 'geojson',
    'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    'cluster': true,
    'clusterRadius': 10
  })
}

const addLayers = (map) => () => {

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40
      ]
    }
  })

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  })

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  })
}

export {
  key,
  initMap,
  addSource,
  addLayers
}

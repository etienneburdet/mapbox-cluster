<script>
import { getContext, onMount } from 'svelte'

const { getMap } = getContext('mapbox')
const map = getMap()

const mag1 = ['<', ['get', 'mag'], 2];
const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
const mag5 = ['>=', ['get', 'mag'], 5];
const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c']

const addSourceAndLayers = () => {
  map.addSource('earthquakes', {
    'type': 'geojson',
    'data':
    'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    'cluster': true,
    'clusterRadius': 80,
    'clusterProperties': {
      // keep separate counts for each magnitude category in a cluster
      'mag1': ['+', ['case', mag1, 1, 0]],
      'mag2': ['+', ['case', mag2, 1, 0]],
      'mag3': ['+', ['case', mag3, 1, 0]],
      'mag4': ['+', ['case', mag4, 1, 0]],
      'mag5': ['+', ['case', mag5, 1, 0]]
    }
  })

  map.addLayer({
    'id': 'earthquake_circle',
    'type': 'circle',
    'source': 'earthquakes',
    'filter': ['!=', 'cluster', true],
    'paint': {
      'circle-color': [
        'case',
        mag1,
        colors[0],
        mag2,
        colors[1],
        mag3,
        colors[2],
        mag4,
        colors[3],
        colors[4]
      ],
      'circle-opacity': 0.6,
      'circle-radius': 12
    }
  })

  map.addLayer({
    'id': 'earthquake_label',
    'type': 'symbol',
    'source': 'earthquakes',
    'filter': ['!=', 'cluster', true],
    'layout': {
      'text-field': [
        'number-format',
        ['get', 'mag'],
        { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
      ],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 10
    },
    'paint': {
      'text-color': [
      'case',
      ['<', ['get', 'mag'], 3],
      'black',
      'white'
      ]
    }
  })
}

map.on('load',addSourceAndLayers)
</script>

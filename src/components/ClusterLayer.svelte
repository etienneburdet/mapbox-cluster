<script>
import { getContext, onMount } from 'svelte'

import { expandedPoints } from '../store.js'
import { key, addLayers } from '../mapbox.js'

const { getMap } = getContext(key)
const map = getMap()

const setClusterPoints = (error, features) => {
  if (error) { console.error('Set point error', error) }
  $expandedPoints = features
  console.log($expandedPoints)
}

const getClusterPoints = (event) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['clusters']
    })

    const clusterId = features[0].properties.cluster_id
    const clusterSource = map.getSource('earthquakes')

    clusterSource.getClusterLeaves(clusterId, 10, 0, setClusterPoints)
}

map.on('load',addLayers(map))
map.on('click', 'clusters', getClusterPoints)
</script>

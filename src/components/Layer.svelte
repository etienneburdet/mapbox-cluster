<script>
import { getContext, onMount, createEventDispatcher } from 'svelte'

import { key } from '../mapbox.js'

const { getMap } = getContext(key)
const map = getMap()

const dispatch = createEventDispatcher()


export let layer

const dispatchLayerEvent = (event) => {
  const features = map
  dispatch('mapClick', {
    map: map,
    layerId: layer.id,
    mapevent: event
  })
}

map.on('load', () => {
  map.addLayer(layer)
})

map.on('click', layer.id, dispatchLayerEvent)
</script>

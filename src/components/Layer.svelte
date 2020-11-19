<script>
import { getContext, onMount, createEventDispatcher } from 'svelte'

import { key } from '../mapbox.js'

const { getMap } = getContext(key)
const map = getMap()

const dispatch = createEventDispatcher()


export let layer
export let visible

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

$: map.isStyleLoaded() && map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none')
</script>

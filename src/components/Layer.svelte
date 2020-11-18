<script>
import { getContext, onMount } from 'svelte'

import { key } from '../mapbox.js'

const { getMap } = getContext(key)
const map = getMap()

export let layer

map.on('load', () => {
  map.addLayer(layer)
})
</script>

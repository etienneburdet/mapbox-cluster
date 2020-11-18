<script>
import { getContext, onMount } from 'svelte'

import { key, addLayers } from '../mapbox.js'

const { getMap } = getContext(key)
const map = getMap()

map.on('load',addLayers(map))
</script>

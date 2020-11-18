<script>
  import { onMount, setContext } from 'svelte'
	import { mapbox, key } from './mapbox.js'
  import { handleMapClick } from './actions.js'

  import Layer from './components/Layer.svelte'
  import { layers } from './layers.js'

  let map
  let container
  let features = []

  setContext(key, {
    getMap: () => map,
  })

  onMount(() => {
  	map = new mapbox.Map({
      container,
      zoom: 0.3,
      center: [0, 20],
      style: 'mapbox://styles/mapbox/light-v10'
    })

		map.on('load', () => {
      map.addSource('earthquakes', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        'cluster': true,
        'clusterRadius': 10
      })

      map.addSource('expanded', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
    })

    // map.on('click', 'clusters', getClusterPoints(map))
  })

</script>

<div bind:this={container}>
	{#if map}
    {#each layers as layer}
      <Layer {layer} on:mapClick={handleMapClick} />
    {/each}
	{/if}
</div>

<style>
  div {
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
</style>

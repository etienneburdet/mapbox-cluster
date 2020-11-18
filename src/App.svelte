<script>
  import { onMount, setContext } from 'svelte'
	import { key, initMap, addSource } from './mapbox.js'

  import ClusterLayer from './components/ClusterLayer.svelte'
	import Marker from './components/Marker.svelte'

  let map
  let container
  let features = []

  setContext(key, {
    getMap: () => map,
  })

  onMount(() => {
  	map = initMap(container)
		map.on('load', addSource(map))
  })
</script>

<div bind:this={container}>
	{#if map}
	<ClusterLayer />
		{#each features as feature}
			{console.log(feature.properties)}
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

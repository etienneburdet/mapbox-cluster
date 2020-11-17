<script>
  import { onMount, setContext } from 'svelte'
  import mapbox from 'mapbox-gl'

  import ClusterLayer from './components/ClusterLayer.svelte'
	import Marker from './components/Marker.svelte'

  mapbox.accessToken = 'pk.eyJ1IjoiZXRpZW5uZWJ1cmRldCIsImEiOiJja2F4bHN2MXUwMGliMnJsN2RzNXowYzQ1In0.ju6w4WN1F_CRVNXtp5L-7w';

  let map
  let container
  let features = []

	const setFeatures = (map) => () => {
		features = map.querySourceFeatures('earthquakes')
	}
	const updateFeatures = (map) => () => {
		map.on('move', setFeatures(map))
		map.on('moveend', setFeatures(map))
		setFeatures(map)
	}

  setContext('mapbox', {
    mapbox: mapbox,
    getMap: () => map,
  })

  onMount(() => {
      map = new mapbox.Map({
      container,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-79.381000, 43.646000],
      zoom: 12.0
    })

		map.on('data', updateFeatures(map))
  })
</script>

<div bind:this={container}>
	{#if map}
	<ClusterLayer />
		{#each features as feature}
			{console.log(feature)}
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

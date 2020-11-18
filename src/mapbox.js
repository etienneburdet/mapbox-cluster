import mapbox from 'mapbox-gl'

mapbox.accessToken = 'pk.eyJ1IjoiZXRpZW5uZWJ1cmRldCIsImEiOiJja2F4bHN2MXUwMGliMnJsN2RzNXowYzQ1In0.ju6w4WN1F_CRVNXtp5L-7w';
const key = {}

const setClusterPoints = (error, leaves) => {
  if (error) { console.error('Set point error', error) }
  console.log(leaves)
}

const getClusterPoints = (map) => (event) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['clusters']
    })

    const clusterId = features[0].properties.cluster_id
    const clusterSource = map.getSource('earthquakes')

    clusterSource.getClusterLeaves(clusterId, 10, 0, setClusterPoints)
}

export {
  mapbox,
  key,
  getClusterPoints
}

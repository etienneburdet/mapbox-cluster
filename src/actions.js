export const handleMapClick = (event) => {
  switch (event.detail.layerId) {
    case 'clusters':
      expandCluster(event)
      break
    case 'expanded-points': 
      hideExpanded(event)
      break
  }
}

const expandCluster = (event) => {

  const map = event.detail.map
  const mapevent = event.detail.mapevent

  const features = map.queryRenderedFeatures(mapevent.point, {
    layers: ['clusters']
  })

  const clusterId = features[0].properties.cluster_id
  const clusterSource = map.getSource('earthquakes')

  clusterSource.getClusterLeaves(clusterId, 10, 0, showExpandLayer(map))
}

const showExpandLayer = (map) => (error, leaves) => {
  if (error) { console.error('Set point error', error) }

  ['clusters', 'count', 'unclustered'].forEach(layerId => {
    map.setLayoutProperty(layerId, 'visibility', 'none')
  })
  map.setLayoutProperty('expanded-points', 'visibility', 'visible')

  const expandedLeaves = leaves.map(makeCoordinates(leaves[0]))

  map.getSource('expanded').setData({
    type: 'FeatureCollection',
    features: expandedLeaves
  })
}

const makeCoordinates = (startPoint) => (leave, index) => {
  const expandedLeave = leave
  expandedLeave.geometry.coordinates[1] = startPoint.geometry.coordinates[1]
  expandedLeave.geometry.coordinates[2] = startPoint.geometry.coordinates[2] + index
  return expandedLeave
}

const hideExpanded = (event) => {
  const map = event.detail.map
  const mapevent = event.detail.mapevent

  map.setLayoutProperty('expanded-points', 'visibility', 'none')
  map.setLayoutProperty('clusters', 'visibility', 'visible')
  map.setLayoutProperty('count', 'visibility', 'visible')
  map.setLayoutProperty('unclustered', 'visibility', 'visible')
}

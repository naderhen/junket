LocationsMap = React.createClass({

    componentDidMount: function() {
        var self = this,
            mapel = React.findDOMNode(self.refs.mapContainer),
            map = L.mapbox.map(mapel, "naderhen.j1lnf104"),
            markerLayer = L.mapbox.featureLayer().addTo(map);

        self.setState({map: map, markerLayer: markerLayer});
    },

    componentDidUpdate: function() {
        var self = this,
          focused_layer;

        _.each(self.state.markerLayer._layers, function(layer) {
            self.state.markerLayer.removeLayer(layer);
        })

        _.each(self.props.locations, function(location) {
            var location_layer = L.mapbox.featureLayer({
                // this feature is in the GeoJSON format: see geojson.org
                // for the full specification
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    // coordinates here are in longitude, latitude order because
                    // x, y is the standard for GeoJSON and many formats
                    coordinates: [
                      location.geometry.location.F,
                      location.geometry.location.A 
                    ]
                },
                properties: {
                    title: location.name,
                    description: location.formatted_address,
                    'marker-size': 'medium',
                    'marker-color': location.marker_color,
                    'marker-symbol': location.map_index
                }
            })

            location_layer.addTo(self.state.markerLayer);

            if (self.props.focus && self.props.focus._id == location._id) {
              focused_layer = location_layer;
            }
        })

        if (focused_layer) {
          self.state.map.panTo(focused_layer.getBounds()._southWest)
        } else if (self.props.locations.length) {
          self.state.map.fitBounds(self.state.markerLayer.getBounds());
        }
    },

    render: function() {
      return (
        <div className="map-container" ref="mapContainer"></div>
      )
    }
});

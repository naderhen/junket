LocationsMap = React.createClass({
    mixins: [ReactMeteor.Mixin],

    // Make sure your component implements this method.
    getMeteorState: function() {
      return {
        locations: this.getLocations()
      };
    },

    getLocations: function() {
      if (FlowRouter.subsReady('locations')) {
        return Locations.find().fetch();
      } else {
        return [];
      }
    },

    componentDidMount: function() {
        var self = this,
            mapel = React.findDOMNode(self.refs.mapContainer),
            map = L.mapbox.map(mapel, "naderhen.j1lnf104"),
            markerLayer = L.mapbox.featureLayer().addTo(map);

        self.setState({map: map, markerLayer: markerLayer});
    },

    componentDidUpdate: function() {
        var self = this;

        _.each(self.state.markerLayer._layers, function(layer) {
            self.state.markerLayer.removeLayer(layer);
        })

        _.each(self.state.locations, function(location) {
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
                    description: '1718 14th St NW, Washington, DC',
                    'marker-size': 'large',
                    'marker-color': location.symbol_color,
                    'marker-symbol': location.marker_symbol
                }
            })

            location_layer.addTo(self.state.markerLayer);
        })
        
        if (self.state.locations.length) {
          self.state.map.fitBounds(self.state.markerLayer.getBounds());
        }
    },

    render: function() {
      return (
        <div className="map-container" ref="mapContainer"></div>
      )
    }
});

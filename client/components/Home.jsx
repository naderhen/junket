Home = React.createClass({
  mixins: [ReactMeteor.Mixin],

  // Make sure your component implements this method.
  getMeteorState: function() {
    return {
      locations: this.getLocations()
    };
  },

  componentDidMount: function() {
    var self = this,
        el = React.findDOMNode(self.refs.geoInput);

    autocomplete = new google.maps.places.Autocomplete(el, {
        types: ['establishment', 'geocode']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();

        if (place) {
            self.setState({editing_location: place});
        }
    });
  },

  getLocations: function() {
    if (FlowRouter.subsReady('locations')) {
      return Locations.find().fetch();
    } else {
      return [];
    }
  },

  selectMarkerSymbol: function(symbol) {
    console.log(symbol);
  },

  renderEditLocationForm: function() {
    if (!this.state.editing_location) {
      return;
    }

    return (
      <form className="ui form">
        <h4 className="ui dividing header">{this.state.editing_location.name}</h4>
        <div className="two fields">
          <div className="field">
            <label>Marker Symbol</label>

            <div className="ui button" onClick={this.selectMarkerSymbol.bind(this, 'lodging')}>
              <div className="maki-icon lodging"></div>
              Hotel
            </div>

            <div className="ui button">
              <div className="maki-icon beer"></div>
              Pub
            </div>

            <div className="ui button">
              <div className="maki-icon restaurant"></div>
              Food
            </div>

            <div className="ui button">
              <div className="maki-icon golf"></div>
              Golf
            </div>
          </div>
          <div className="field">
            <label>Marker Color</label>
          </div>
        </div>
      </form>
    )
  },

  render: function() {
    return (
      <div>
        <LocationsMap />
        <div className="ui divider"></div>
        <div className="ui fluid icon input">
          <input type="text" ref="geoInput" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
        {this.renderEditLocationForm()}
        <div className="ui divider"></div>
        <LocationsList />
      </div>
    )
  }
});

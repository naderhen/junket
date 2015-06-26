Home = React.createClass({
  mixins: [ReactMeteor.Mixin],

  // Make sure your component implements this method.
  getMeteorState: function() {
    return {
      locations: this.getLocations(),
      focus_location: Session.get('focus_location')
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

  submit: function() {
    Locations.insert(this.state.editing_location);
    this.setState({editing_location: null});
  },

  selectMarkerSymbol: function(symbol) {
    var model = this.state.editing_location;

    model.marker_symbol = symbol.symbol;
    model.marker_color = symbol.color;

    this.setState({editing_location: model});
  },

  renderSymbol: function(symbol) {
    var className = "maki-icon " + symbol.symbol,
        buttonClassName = "ui button",
        buttonStyle = {
          borderTop: "4px solid " + symbol.color
          // color: "#FFF"
        };

    if (this.state.editing_location && this.state.editing_location.marker_symbol == symbol.symbol) {
      buttonClassName += " active";
    }

    return (
      <div className={buttonClassName} style={buttonStyle} onClick={this.selectMarkerSymbol.bind(this, symbol)}>
        <div className={className}></div>
        {symbol.label}
      </div>
    )
  },

  renderEditLocationForm: function() {
    if (!this.state.editing_location) {
      return;
    }

    var symbols = [
                    {label: "Hotel", symbol: "lodging", color: "#3b83c0"},
                    {label: "Pub", symbol: "beer", color: "#f2c61f"},
                    {label: "Food", symbol: "restaurant", color: "#d95c5c"},
                    {label: "Golf", symbol: "golf", color: "#5bbd72"},
                    {label: "Other", symbol: "monument", color: "#00b5ad"}
                  ]

    return (
      <form className="ui form">
        <h4 className="ui dividing header">{this.state.editing_location.name}</h4>
        <div className="field">
          <label>Marker Symbol</label>

          {symbols.map(this.renderSymbol)}

          <div className="ui blue basic button" onClick={this.submit}>Submit</div>
        </div>
      </form>
    )
  },

  render: function() {
    var indexed_locations = _.map(this.state.locations, function(location, idx) {
      location.map_index = idx + 1;
      return location;
    });

    return (
      <div>
        <LocationsMap locations={indexed_locations} focus={this.state.focus_location} />
        <div className="ui divider"></div>
        <div className="ui fluid icon input">
          <input type="text" ref="geoInput" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
        {this.renderEditLocationForm()}
        <div className="ui divider"></div>
        <LocationsList locations={indexed_locations} focus={this.state.focus_location} />
      </div>
    )
  }
});

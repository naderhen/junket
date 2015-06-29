SemanticGoogleLocation = React.createClass({

  mixins: [Formsy.Mixin],

  componentDidMount: function() {
    var self = this,
        el = React.findDOMNode(self.refs.geoInput);

    autocomplete = new google.maps.places.Autocomplete(el, {
        types: ['establishment', 'geocode']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();

        if (place) {
            self.setValue(place);
        }
    });
  },

  render: function () {
    var className = "field";

    if (this.showRequired() || this.showError()) {
      className += " error";
    }
    
    var errorMessage = this.getErrorMessage();

    var val = this.getValue(),
        placeholder;

    if (val && val.name) {
      placeholder = val.name;
    }

    return (
      <div>
        <div className={className}>
          <label>{this.props.label}</label>
          <input type="text" placeholder={placeholder} ref="geoInput" />
          <span>{errorMessage}</span>
        </div>

        {this.getValue() ? <LocationsMap locations={[this.getValue()]} zoom="10" /> : null}
      </div>
    );
  }
});

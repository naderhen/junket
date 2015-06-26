LocationsList = React.createClass({
    mixins: [ReactMeteor.Mixin],

    // Make sure your component implements this method.
    getMeteorState: function() {
      return {
        locations: this.getLocations()
      };
    },

    getLocations: function() {
      if (FlowRouter.subsReady('locations')) {
        console.log('locations ready');
        return Locations.find().fetch();
      } else {
        console.log('locations not ready');
        return [];
      }
    },

    renderLocation: function(location) {
      return (
        <div className="item">
          <i className="map marker icon"></i>
          <div className="content">
            <a className="header">{location.name}</a>
            <div className="description">{location.formatted_address}</div>
          </div>
        </div>
      )
    },

    render: function() {

      if (!this.state.locations.length) {
        return (
          <div className="ui divided list">
            <div className="item">
              <i className="map marker icon"></i>
              <div className="content">
                <a className="header">No Locations Just Yet...</a>
                <div className="description">Please search above.</div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className="ui divided list">
            {this.state.locations.map(this.renderLocation)}
          </div>
        </div>
      )
    }
});

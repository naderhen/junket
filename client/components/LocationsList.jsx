LocationsList = React.createClass({
    focusLocation: function(location) {
      Session.set("focus_location", location)
    },

    renderLocation: function(location) {
      var className = "map marker icon";

      if (this.props.focus && this.props.focus._id == location._id) {
        className += " blue";
      }

      return (
        <div className="item">
          <i className={className}></i>
          <div className="content">
            <a onClick={this.focusLocation.bind(this, location)} className="header">{location.map_index}: {location.name}</a>
            <div className="description">{location.formatted_address}</div>
          </div>
        </div>
      )
    },

    render: function() {

      if (!this.props.locations.length) {
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
            {this.props.locations.map(this.renderLocation)}
          </div>
        </div>
      )
    }
});

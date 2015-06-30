Itinerary = React.createClass({
  mixins: [ReactMeteor.Mixin],

  // Make sure your component implements this method.
  getMeteorState: function() {
    return {
      events: this.getEvents()
    };
  },

  getEvents: function() {
    if (FlowRouter.subsReady('events')) {
      return _.map(Events.find().fetch(), function(event) {
        event.start_date = moment(event.start_date);
        event.end_date = moment(event.end_date);
        return event;
      });
    } else {
      return [];
    }
  },

  selectEvent: function(event) {
    this.setState({editing_event: event});
  },

  renderEvents: function(event) {
    var self = this;
    if (!this.state.events.length) {
      return (
        <div className="ui tall stacked segment">
          <h3>No Events Yet...</h3>
        </div>
      )
    }
    
    var events = _.sortBy(this.state.events, 'start_date');

    return (
      <div className="ui segment">
        {events.map(function(event) {
          return (
            <div key={event._id} className="ui tall stacked segment grid">
              <div className="three column row">
                <div className="two wide column">
                  <div className="ui statistic">
                    <div className="value">
                      {event.start_date.format("DD")}
                    </div>
                    <div className="label">
                      {event.start_date.format("MMM").toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="ten wide column">
                  <h3 onClick={self.selectEvent.bind(self, event)}>{event.name}</h3>
                  <p>{event.description}</p>
                </div>
                <div className="four wide column">
                {
                  event.location ? <LocationsMap height="150" locations={[event.location]} zoom="10" /> : null
                }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },

  addNewEvent: function() {
    var editing_event = {
      name: "New Event",
      description: "Enter Description Here"
    };

    this.setState({editing_event: editing_event});
  },

  submitEvent: function(model, id) {
    model.start_date = moment(model.start_date)._i;
    model.end_date = moment(model.end_date)._i;

    if (id) {
      Events.update(id, {$set: model});
    } else {
      Events.insert(model);
    }

    this.resetEvent();
  },

  resetEvent: function() {
    this.setState({editing_event: null});
  },

  resetNewEventID: function() {
    this.setState({new_event_id: undefined});
  },

  renderEventForm: function() {
    if (this.state.editing_event) {
      return (
        <div className="ui segment">
          <EventForm initial={this.state.editing_event} onSubmit={this.submitEvent} onCancel={this.resetEvent} />
        </div>
      )
    } else {
      return (
        <button className="ui submit button" onClick={this.addNewEvent}>Add New Event +</button>
      )
    }
  },

  submitKeyVal: function(model) {
    var new_event_id = this.state.new_event_id;

    var update_obj = {};
    update_obj[model.key] = model.value;

    Events.update(new_event_id, {$set: update_obj});
    this.setState({new_event_id: new_event_id});
  },

  render: function() {
    return (
      <div>
        {this.renderEvents()}
        <div className="ui divider"></div>
        {this.renderEventForm()}
      </div>
    )
  }
});

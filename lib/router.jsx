FlowRouter.route('/', {
    subscriptions: function(params) {
        console.log("subscribe and register");
        this.register('locations', Meteor.subscribe('locations'));
    },
    action: function(params) {
        console.log("subscribed");
        React.render(<App><Home/></App>, $("#yield").get(0))
    }
});

FlowRouter.route('/itinerary', {
    subscriptions: function(params) {
        console.log("subscribe and register");
        this.register('events', Meteor.subscribe('events'));
    },
    action: function(params) {
        console.log("subscribed");
        React.render(<App><Itinerary /></App>, $("#yield").get(0))
    }
});

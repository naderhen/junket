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

App = React.createClass({
  mixins: [ReactMeteor.Mixin],

  render: function() {
    return (
      <div>
        <div className="ui menu">
          <a className="item active">
            <i className="home icon"></i> Home
          </a>
        </div>
        <div className="ui segment">
          {this.props.children}
        </div>
      </div>
    )
  }
});

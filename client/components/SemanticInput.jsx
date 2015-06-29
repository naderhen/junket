SemanticInput = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var className = "field";

    if (this.showRequired() || this.showError()) {
      className += " error";
    }
    
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label>{this.props.label}</label>
        <input type="text" placeholder={this.props.placeholder} onChange={this.changeValue} value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

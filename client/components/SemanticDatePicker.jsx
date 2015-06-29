SemanticDatePicker = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue: function (date) {
    this.setValue(date);
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
        <DatePicker date={this.getValue()} onChange={this.changeValue} />
        <span>{errorMessage}</span>
      </div>
    );
  }
});

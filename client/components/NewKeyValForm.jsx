NewKeyValForm = React.createClass({
  getInitialState: function() {
    return {
      canSubmit: false
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  submit: function (model, reset) {
    this.props.onSubmit(model);
    reset();
    // someDep.saveEmail(model.email);
  },
  cancel: function() {
    this.props.onCancel();
    reset();
  },
  render: function () {
    return (
      <Formsy.Form className="ui form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <h4 className="ui dividing header">Key/Val</h4>
        <div className="two fields">
          <KeyValInput name="key" label="Key" required/>
          <KeyValInput name="value" label="Value" required/>
        </div>
        <button className="ui primary submit button" type="submit" disabled={!this.state.canSubmit}>Submit</button>
        <div className="ui button" onClick={this.cancel}>Cancel</div>
      </Formsy.Form>
    );
  }
});

EventForm = React.createClass({
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
    this.props.onSubmit(model, this.props.initial._id);
    reset();
    // someDep.saveEmail(model.email);
  },

  cancel: function() {
    this.props.onCancel();
  },

  render: function () {
    return (
      <Formsy.Form ref="form" className="ui form" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <h4 className="ui dividing header">Editing Event</h4>
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <SemanticInput name="name" value={this.props.initial.name} label="Name" placeholder="Name" required />
              <SemanticInput name="description" value={this.props.initial.description} label="Description" placeholder="Description" required />
              <SemanticDatePicker name="date" value={this.props.initial.date} label="Date" required />
            </div>

            <div className="column">
              <SemanticGoogleLocation name="location" value={this.props.initial.location} label="Location" placeholder="Location" required />
            </div>
          </div>
          <div className="row">
            <button className="ui primary submit button" type="submit" disabled={!this.state.canSubmit}>Submit</button>
            <div className="ui button" onClick={this.cancel}>Cancel</div>
          </div>
        </div>
      </Formsy.Form>
    );
  }
});

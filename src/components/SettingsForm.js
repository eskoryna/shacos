import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SettingsForm extends React.Component {
 renderInput({ input, label }) {
  return (
   <div className="field">
    <label>{label}</label>
    <input {...input} />
   </div>
  );
 }
 
 render() {
  return (
   <form className="ui form">
    <Field name="boardSize" component={this.renderInput} label="Board size" />
   </form>
  );
 }
}

export default reduxForm({
 form: 'settingsForm'
})(SettingsForm);
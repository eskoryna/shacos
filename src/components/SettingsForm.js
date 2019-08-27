import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SettingsForm extends React.Component {
 renderError({ error, touched }) {
  if (touched && error) {
   return (
    <div className="ui error message">
     <div className="header">{error}</div>
    </div>
   );
  }
 }
 
 renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
   <div className={className}>
    <label>{label}</label>
    <input {...input} type="number" min="2" max="30" autoComplete="off" style={{ width: '6rem' }} />
    {this.renderError(meta)}
   </div>
  );
 }

 onSubmit(formValues) {
  //console.log(formValues);
 }
 
 render() {
  return (
   <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
    <Field name="boardSize" component={this.renderInput} label="Board size" />
    <button className="ui button  primary">OK</button>
   </form>
  );
 }
}

const validate = (formValues) => {
 const errors = {};

 if (!formValues.boardSize) {
  errors.boardSize = 'You have to enter a board size';
 }

 if (!Number.isInteger(Number(formValues.boardSize)) || Number(formValues.boardSize) < 2 || Number(formValues.boardSize) > 30) {
  errors.boardSize = 'The board size has to be an integer between 2 and 30';
 }

 return errors;
};

export default reduxForm({
 form: 'settingsForm',
 validate
})(SettingsForm);
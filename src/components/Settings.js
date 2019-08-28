import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { changeBoardSize, startGame } from '../actions';
import SettingsForm from './SettingsForm';

class Settings extends React.Component {
 onSubmit = formValues => {
  this.props.changeBoardSize(Number(formValues.boardSize));
  this.props.startGame();
  history.push('/');
 };
 
 render() {
  return (
   <div style={{ margin: '0.5rem' }} >
    <SettingsForm initialValues={{ boardSize: this.props.boardSize }} onSubmit={this.onSubmit} />
   </div>
  );
 }
}

const mapStateToProps = state => {
 return {
  boardSize: state.game.boardSize
 };
}

export default connect(
 mapStateToProps,
 { changeBoardSize, startGame }
)(Settings);
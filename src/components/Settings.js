import React from 'react';
import { connect } from 'react-redux';
import SettingsForm from './SettingsForm';

class Settings extends React.Component {
 render() {
  return (
   <div style={{ margin: '0.5rem' }} >
    <SettingsForm initialValues={{ boardSize: this.props.boardSize }} />
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
 mapStateToProps
)(Settings);
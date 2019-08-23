import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
 renderDashboard() {
  return this.props.board.map(field => {
   return <div key={field.fieldId} style={{ display: 'inline-block' }} >
    <button>{field.fieldId}#{field.colorPoints}&{field.formPoints}</button>
   </div>
  })
 }

 render() {
  return <div>{this.renderDashboard()}</div>
 }
}

const mapStateToProps = state => {
 return {
  boardSize: state.game.boardSize,
  board: state.board
 };
}

export default connect(
 mapStateToProps
)(Dashboard);
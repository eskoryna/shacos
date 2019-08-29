import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions';
import Board from './Board';
import Stack from './Stack';

class Game extends React.Component {
 componentDidMount() {
  if (!this.props.gameDidStart) {
   this.props.startGame();
  }
 }

 render() {
  return <div style={{ margin: '0.2rem', display: 'flex', flexDirection: 'row' }}>
   <div>
    <Board />
   </div>
   <div>
    <Stack />
   </div>
  </div>
 }
}

const mapStateToProps = state => {
 return {
  gameDidStart: state.game.gameDidStart
 };
}

export default connect(
 mapStateToProps,
 { startGame }
)(Game);
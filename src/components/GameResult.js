import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import history from '../history';

class GameResult extends React.Component {
 renderContent() {
  const result = [...this.props.players];
  result.sort((a, b) => (a.score > b.score) ? -1 : 1);
  //const result = this.props.players.slice(0).sort((a, b) => (a.score > b.score) ? -1 : 1);
  return (
   <div>
    {this.renderWinner(result)}
    {this.renderScoreTable(result)}
   </div>
  );
 }
 
 renderWinner(result) {
  if (result.length > 1) {
   if (result[0].score > result[1].score) {
    return (
     <div>
      <p>{result[0].name} has won the game.</p>
      <br/>
     </div>
    );
   } else {
    return (
     <div>
      <p>The game ended in a draw.</p>
      <br/>
     </div>
    );
   }
  } else {
   return <div>There's only one player in the game.</div>
  }
 }

 renderScoreTable(result) {
  return result.map(player => {
   return <div key={player.playerId}>{player.name}: ${player.score} {result[0].score > 0 ? '(' + (player.score / result[0].score *100).toFixed(1) + '%)' : null}</div>
  })
 }
 
 renderActions() {
  return <React.Fragment>
   <button onClick={() => history.push('/')} className="ui primary button">OK</button>
  </React.Fragment>
 }

 render() {
  return (
   <div>
    <Modal 
     title="Game Result"
     content={this.renderContent()}
     actions={this.renderActions()}
    />
   </div>
  );
 }
}

const mapStateToProps = state => {
 return {
  players: state.players
 };
}

export default connect(
 mapStateToProps
)(GameResult);
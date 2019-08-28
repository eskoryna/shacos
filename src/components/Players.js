import React from 'react';
import { connect } from 'react-redux';

class Players extends React.Component {
 renderPlayers() {
  return this.props.players.map(player => {
   return <div className="ui large pink button" key={player.playerId} >
    <i className={player.playsColor ? "paint brush icon" : "star icon" } />
    {player.name}: ${player.score}
   </div>;
  });
 }

 render() {
  return <div style={{ display: 'flex', flexDirection: 'row' }} >{this.renderPlayers()}</div>;
 }
}

const mapStateToProps = state => {
 return {
  players: state.players
 };
}

export default connect(
 mapStateToProps
)(Players);
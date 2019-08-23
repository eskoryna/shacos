import React from 'react';
import { connect } from 'react-redux';

class Players extends React.Component {
 renderPlayers() {
  return this.props.players.map(player => {
   return <div className="ui big pink horizontal label" key={player.playerId} >
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
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Players from './Players';
import GoogleAuth from './GoogleAuth';
// import { initializeBoard, initializeStack, initializeScore, switchPlayer } from '../actions';
import { startGame } from '../actions';

class Header extends React.Component {
 startGame = () => {
  this.props.startGame();
  // this.props.initializeBoard();
  // this.props.initializeStack();
  // this.props.initializeScore();
  // this.props.switchPlayer();
 }
 
 renderHeader() {
  return (
   <div className="ui secondary pointing menu">
    <Link to="/" className="ui big google button">
     Shacos
    </Link>
    <Players />
    <div className="right menu">
     <button onClick={() => this.startGame()} className="ui big green google button">
      Start new game
     </button>
     <Link to="/settings" className="ui big google button">
      Settings
     </Link>
     <GoogleAuth />
    </div>
   </div>
  );
 }

 render() {
  return <div>{this.renderHeader()}</div>;
 }
}

export default connect(
 null,
 { startGame }
 // { initializeBoard, initializeStack, initializeScore, switchPlayer }
)(Header);
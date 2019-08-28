import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Players from './Players';
import GoogleAuth from './GoogleAuth';
import { startGame } from '../actions';

class Header extends React.Component {
 startGame = () => {
  this.props.startGame();
 }
 
 renderHeader() {
  return (
   <div className="ui secondary pointing menu" style={{ margin: '0.2rem' }} >
    <Link to="/" className="ui large orange button">
     Shacos
    </Link>
    <Players />
    <div className="right menu">
     <button onClick={() => this.startGame()} className="ui large green button">
     <i className="th icon" />
      New game
     </button>
     <Link to="/settings" className="ui large button">
     <i className="bars icon" />
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
)(Header);
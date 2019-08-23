import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
 componentDidMount() {
  window.gapi.load('client:auth2', () => {
   window.gapi.client.init({
    clientId: '936532000098-tt6hbtop52mjm3hksbv40jpmd7eq5a48.apps.googleusercontent.com',
    scope: 'email'
   }).then(() => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.onAuthChange(this.auth.isSignedIn.get());
    this.auth.isSignedIn.listen(this.onAuthChange);
   }); 
  });
 }

 onAuthChange = isSignedIn => {
  if (isSignedIn) {
   const userName = this.auth.currentUser.Ab.w3.ig
   this.props.signIn(userName);
  } else {
   this.props.signOut();
  }
 };

 onSignInClick = () => {
  this.auth.signIn();
 };

 onSignOutClick = () => {
  this.auth.signOut();
 };

 renderAuthButton() {
  if (this.props.isSignedIn === null) {
   return null;
  } else if (this.props.isSignedIn) {
   return (
    <button onClick={this.onSignOutClick} className="ui big red google button">
     <i className="google icon" />
     Sign out
    </button>
   );
  } else {
   return (
    <button onClick={this.onSignInClick} className="ui big blue google button">
     <i className="google icon" />
     Sign in with Google
    </button>
   );
  }
 }
 
 render() {
  return <div>{this.renderAuthButton()}</div>;
 }
}

const mapStateToProps = state => {
 return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
 mapStateToProps,
 { signIn, signOut }
)(GoogleAuth);
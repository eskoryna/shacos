import React from 'react';
import { Router, Route } from  'react-router-dom';
//import Dashboard from './Dashboard';
import Header from './Header';
import Game from './Game';
import Settings from './Settings';
import GameResult from './GameResult';
import history from '../history';

const App = () => {
 return (
  <div>
   <Router history={history}>
    <div>
     <Header />
     {/* <Dashboard /> */}
     <Route path="/" exact component={Game} />
     <Route path="/settings" exact component={Settings} />
     <Route path="/result" exact component={GameResult} />
    </div>
   </Router>
  </div>
 );
};

export default App;
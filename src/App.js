import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HiddYoutu from './components/hiddyoutu';
import IDInput from './components/id_input';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Route exact path='/' component={ IDInput } />
          <Route path='/y/:youtube_id' component={ HiddYoutu } />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CommentBox from './components/CommentBox';
import * as actions from './actions';

class App extends Component {
  render() {
    return (
      <CommentBox actions={actions}/>
    );
  }
}

export default App;

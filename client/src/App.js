import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import IssueList from './components/IssueList';
import IssueDetails from './components/IssueDetails';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark" expand="xl">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
              <Navbar.Brand as={Link} to="/">Issue Tracker</Navbar.Brand>
            </Navbar.Collapse>
          </Navbar>

          <div className="App-Container">
            <Route path="/" exact component={IssueList} />
            <Route path="/issue/:issueID" component={IssueDetails} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

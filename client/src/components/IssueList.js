import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../Config';

import Issue from './Issue';

class IssueList extends Component {

   constructor (props) {
      super(props);
      this.state = {
         loading: false,
         error: false,
         issues: []
      };
   }

   componentDidMount () {
      this.loadData(this.loaded);
   }

   loadData (callback) {
      this.setState({
         ...this.state, 
         loading: true
      });
      return fetch(`${config.apiUrl}/issue`)
      .then(response => response.json())
      .then(
         callback,       
         (error) => {
            callback(null, error);
         }
      );
   }

   loaded = (payload, error = null) => {
      if (error !== null) {
         this.setState({
            ...this.state,
            loading: false,
            error: error
         });
         return;
      }
      this.setState({
         ...this.state,
         loading: false,
         error: false,
         issues: payload
      });
   }

   render () {
      return (
         <>
         <p><Link to="/issue/new">Add New Issue</Link></p>
         <h2>Issue List</h2>
         <div className="row">
            {config.issueStates.map((state, index) => {
               return (
                  <div key={index} className="col-sm">
                  <h3 className="issueListState">{state}</h3>
                  {
                     this.state.issues
                     .filter((issue) => issue.issueState === state)
                     .map((issue, idx) => { return (<Issue data={issue} key={idx} />); })
                  }
                  </div>
               );
            })}
         </div>
         </>
      );
   }
}

export default IssueList;
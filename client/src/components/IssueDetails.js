import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import config from '../Config';

class IssueDetails extends Component {
   constructor (props) {
      super(props);
      this.state = {
         data : {
            issueID: 0,
            issueName: '',
            issueDescription: '',
            issueState: config.issueStates[0] || '',
            issueModifiedDate: ''
         },
         modified: false,
         loading: false,
         error: false,
         deleted: false,
         created: false
      };
   }

   componentDidMount () {
      if (this.props.match.params.issueID !== 'new') {
         this.loadData(this.loaded);
      }
   }

   loadData (callback) {
      this.setState({
         ...this.state, 
         loading: true
      });
      return fetch(`${config.apiUrl}/issue/${this.props.match.params.issueID}`)
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
         data: payload
      });
   }

   create = (event) => {
      event.preventDefault();

      fetch(`${config.apiUrl}/issue`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.data)
      })
      .then(response => response.json())
      .then(
         (response) => {
            alert('issue successfully created');
            debugger;
            this.setState({
               ...this.state,
               data: {
                  ...this.state.data,
                  ...response
               },
               created: true
            });
         },       
         (error) => {
            this.setState({
               ...this.state,
               error
            });
         }
      );
   }

   update = (event) => {
      event.preventDefault();

      fetch(`${config.apiUrl}/issue/${this.state.data.issueID}`, {
         method: 'PUT',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(this.state.data)
      })
      .then(response => response.json())
      .then(
         (response) => {
            alert('issue successfully saved');
            this.setState({
               ...this.state,
               data: {
                  ...this.state.data,
                  ...response
               }
            });
         },       
         (error) => {
            this.setState({
               ...this.state,
               error
            });
         }
      );
   }

   remove = (event) => {
      fetch(`${config.apiUrl}/issue/${this.state.data.issueID}`, {
         method: 'DELETE'
      })
      .then(response => response.json())
      .then(
         () => {
            alert('issue successfully deleted');
            this.setState({
               ...this.state,
               deleted: true
            });
         },       
         (error) => {
            this.setState({
               ...this.state,
               error
            });
         }
      );
   }

   changeIssueName = (event) => {
      this.setState({
         data : {
            ...this.state.data,
            issueName: event.target.value
         },
         modified: true
      });
   }

   changeIssueDescription = (event) => {
      this.setState({
         data : {
            ...this.state.data,
            issueDescription: event.target.value
         },
         modified: true
      });
   }

   changeIssueState = (event) => {
      this.setState({
         data : {
            ...this.state.data,
            issueState: event.target.value
         },
         modified: true
      });
   }

   render () {
      if (this.state.deleted || this.state.created) {
         return (<Redirect to="/" />);
      }

      const createButton = (
         <Button variant="primary" type="submit" onClick={this.create}>
            Create new issue
         </Button>
      );
      const updateButtons = (
         <>
         <Button variant="primary" type="submit" onClick={this.update}>
            Update issue
         </Button>

         <Button variant="danger" onClick={this.remove}>
            Delete issue
         </Button>
         </>
      );
      const buttons = this.props.match.params.issueID === 'new' ? createButton : updateButtons;

      return (
         <div>
            <h2 className="mt-2 mb-2">Issue Details</h2>
            <Form>
               <Form.Group>
                  <Form.Label>Issue Name</Form.Label>
                  <Form.Control 
                     type="text" 
                     onChange={this.changeIssueName} 
                     value={this.state.data.issueName} 
                     className="mb-4"
                  />

                  <Form.Label>Issue Description</Form.Label>
                  <Form.Control 
                     as="textarea" 
                     rows="3" 
                     onChange={this.changeIssueDescription} 
                     value={this.state.data.issueDescription} 
                     className="mb-4"
                  />

                  <Form.Label>Issue State</Form.Label>
                  <Form.Control 
                     as="select" 
                     onChange={this.changeIssueState} 
                     value={this.state.data.issueState} 
                     className="mb-4"
                  >
                  {config.issueStates.map((state, index) => {
                     console.log(config.issueStates);
                     const currentStateIndex = config.issueStates.indexOf(this.state.data.issueState);
                     if (index < currentStateIndex) {
                        return;
                     }
                     return (<option key={index} value={state}>{state}</option>);
                  })}
                  </Form.Control>

                  {buttons}
               </Form.Group>
            </Form>
         </div>
      );
   }
}

export default IssueDetails;
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Issue extends Component {
   render () {
      return (
         <Card className="mb-2">
            <Card.Body>
               <Card.Title>
                  <Link to={{ pathname: `/issue/${this.props.data.issueID}` }}>
                     {this.props.data.issueName}
                  </Link>
               </Card.Title>
               <Card.Text>
                  {this.props.data.issueDescription.substring(0, 120)}
                  {this.props.data.issueDescription.length > 120 ? '...' : ''}
               </Card.Text>
            </Card.Body>
         </Card>
      );
   }
}

export default Issue;
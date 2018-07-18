import React, { Component } from 'react';
import '../css/voteSection.css';
import background from '../images/rocks.jpg';

class VoteSection extends Component {
  render() {
    return (
      <div className="VoteSection">
        <div className="card mb-3">
          <img className="card-img-top" src={background} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">Make your Vote heard!</h5>
              <p className="card-text">This will be where the vote counter is.</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
        </div>
      </div>
    );
  }
}

export default VoteSection;

import React, { Component } from 'react';
import '../css/voteSection.css';
import firebase from "firebase";


class VoteSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noVotes: "",
      yesVotes: "",
      voted: false
    };
    const config = {
      apiKey: "AIzaSyBRoCF05syj98wyzInngl3ZTK3OzTgOv0M",
      authDomain: "new-island-highway.firebaseapp.com",
      databaseURL: "https://new-island-highway.firebaseio.com",
      storageBucket: "new-island-highway.appspot.com"
    };
    firebase.initializeApp(config);
    this.getVotes = this.getVotes.bind(this);

    if(localStorage.getItem('hasVoted') === null){
      localStorage.setItem('hasVoted', 'false');
    }
  }

  componentDidMount(){
    let ifVoted = localStorage.getItem('hasVoted');

    if(ifVoted === 'true'){
      document.getElementById('thanksDiv').hidden = true;
      document.getElementById('noButton').disabled = true;
      document.getElementById('yesButton').disabled = true;
      document.getElementById('alreadyDiv').hidden = false;
    }
    else{
      document.getElementById('thanksDiv').hidden = true;
      document.getElementById('alreadyDiv').hidden = true;
      document.getElementById('noButton').disabled = false;
      document.getElementById('yesButton').disabled = false;
    }
    this.getVotes()
  }

  getVotes(){
    const noRef = firebase.database().refFromURL('https://new-island-highway.firebaseio.com/no');
    const yesRef = firebase.database().refFromURL('https://new-island-highway.firebaseio.com/yes');

    noRef.once('value', (snapshot) => {
      let noVotes = snapshot.val();
      this.setState({
        noVotes: noVotes,
      });
    });

    yesRef.once('value', (snapshot) => {
      let yesVotes = snapshot.val();
      this.setState({
        yesVotes: yesVotes,
      });
    });

  }

  updateVotes(choice) {
    let ifVoted = localStorage.getItem('hasVoted');
    if(ifVoted === 'false'){
      if (this.state.noVotes !== "" || this.state.yesVotes !== ""){
        if (this.state.voted === false) {
          const noRef = firebase.database().refFromURL('https://new-island-highway.firebaseio.com/no');
          const yesRef = firebase.database().refFromURL('https://new-island-highway.firebaseio.com/yes');
          if (choice === 'no') {
            const noVotes = {
              noVotes: this.state.noVotes + 1,
            };
            this.setState({
              noVotes: this.state.noVotes + 1
            });
            noRef.set(noVotes.noVotes);
            localStorage.setItem('hasVoted', 'true')
          }
          if (choice === 'yes') {
            const yesVotes = {
              yesVotes: this.state.yesVotes + 1,
            };
            this.setState({
              yesVotes: this.state.yesVotes + 1
            });
            yesRef.set(yesVotes.yesVotes);
            localStorage.setItem('hasVoted', 'true')
          }
          this.setState({
            voted: true
          });
          document.getElementById('noButton').disabled = true;
          document.getElementById('yesButton').disabled = true;
          document.getElementById('thanksDiv').hidden = false;
        }
        else {
          document.getElementById('noButton').disabled = true;
          document.getElementById('yesButton').disabled = true;
          document.getElementById('thanksDiv').hidden = false;
        }
      }
    }
    else{
      document.getElementById('noButton').disabled = true;
      document.getElementById('yesButton').disabled = true;
      document.getElementById('alreadyDiv').hidden = false;
    }
  }

  render() {
    return (
      <div className="VoteSection" id='Vote'>
        <div className="card pt-5 pb-5">
          <i className="fas fa-user-friends fa-4x pt-4 pb-4"/>
            <div className="card-body">
              <h3 className="card-title pb-3">Make your Vote heard!</h3>
              <p className='lead questionText'>Would you support a government study on the Pat Bay and Salt Spring Island highway route to Nanaimo as an alternate route to the Malahat?</p>
                <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 fa-4x'>
                </div>
              </div>
              <div className='row p-3'>
                <div className='column col-lg-6 col-md-6 col-sm-6 col-xs-6 p-0'>
                  <h1 className='noCounter pt-5'>{this.state.noVotes}</h1>
                  <hr/>
                  <p>Votes for: "<span className='noSpan'>No</span>"</p>
                  <button type="button" id='noButton' className="btn btn-danger m-3" onClick={() => { this.updateVotes('no') }}>Vote No</button>
                </div>
                <div className='column col-lg-6 col-md-6 col-sm-6 col-xs-6 p-0'>
                  <h1 className='yesCounter pt-5'>{this.state.yesVotes}</h1>
                  <hr/>
                  <p>Votes for: "<span className='yesSpan'>Yes</span>"</p>
                  <button type="button" id='yesButton' className="btn btn-success m-3" onClick={() => { this.updateVotes('yes') }}>Vote Yes</button>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4' id='thanksDiv'>
                  <p className='lead'>Thanks for voting!</p>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4' id='alreadyDiv'>
                  <p className='lead'>You have already voted.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default VoteSection;

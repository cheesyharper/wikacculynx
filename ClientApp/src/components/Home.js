import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Stack Overflow Correct Answer Guess-o-matic!</h1>
        <p>Click on the Questions link to the left to see a list of questions.  View a question to see all the answers provided.  Try to guess which answer was accepted.</p>
       
        <p>Good Luck!</p>
      </div>
    );
  }
}

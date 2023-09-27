import React, { Component } from 'react';
import SentenceList from '../SentenceList';
import WordTypeList from '../WordTypeList'

class SentenceBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSentence: '',
    };
  }

  addWordToSentence = (word) => {
    this.setState(
      (prevState) => ({
        currentSentence: prevState.currentSentence + ' ' + word.name,
      }),
      () => {
        console.log('the value of current Sentence is', this.state.currentSentence);
      }
    );
  };

  handleWordSelect = (wordType, word) => {
    const { selectedWords } = this.state;
    selectedWords[wordType] = word;
    this.setState({ selectedWords });
  };

  clearText = () => {
    this.setState(
      (prevState) => ({
        currentSentence: '',
      }),
      () => {
        console.log('the value of current Sentence is', this.state.currentSentence);
      }
    );
  }

  handleSubmit = () => {
    fetch('https://localhost:7038/api/sentence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Text: this.state.currentSentence }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <div>
        <div class="App-header">
        <h2>Sentence Builder</h2>
        <SentenceList/>

        <h4>Build a Sentence</h4>
        {this.state.currentSentence && <><div class="sentence-builder">{this.state.currentSentence}</div>
         <br /><br /><div><button class="ClearButton" onClick={this.clearText}>Clear</button>
        &nbsp;<button class="SaveButton" onClick={this.handleSubmit}>Save</button></div></>}
        <br></br>
        <WordTypeList addWordToSentence={this.addWordToSentence}/>
      </div>
      </div>
    );
  }
}

export default SentenceBuilder;
import React, { useEffect, useState } from 'react';
import WordList from '../WordList'

function WordTypeList({ addWordToSentence }) {
  const [wordTypes, setWordType] = useState([]);
  const [selectedWordType, setSelectedWordType] = useState(null);
  const selectedButtonClass = 'selected-button';

  useEffect(() => {
    fetch('https://localhost:7038/api/WordType')
      .then((response) => response.json())
      .then((data) => {
        setWordType(data);
      })
      .catch((error) => {
        console.error('Error fetching previous sentences:', error);
      });
  }, []);

  useEffect(() => {
    console.log("Getting wordTypes", JSON.stringify(wordTypes));
  }, [wordTypes]);

  return (
    <div>
      <ul>
        {wordTypes.map((wordType, index) => (
          <li key={index}>
            <button onClick={() => setSelectedWordType(wordType.wordTypeId)}
              className={selectedWordType === wordType.wordTypeId ? selectedButtonClass : ''}
            >{wordType.name}</button>
            <br></br>
          </li>
        ))}
      </ul>
      {selectedWordType && <WordList selectedWordType={selectedWordType}  addWordToSentence={addWordToSentence}/>}
    </div>
  );
}

export default WordTypeList;
import React, { useEffect, useState } from 'react';

function WordList({ selectedWordType, addWordToSentence}) {
  const [words, setWordType] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    console.log("it entered here with useEffect");
    fetch('https://localhost:7038/api/Word?wordTypeId=' + selectedWordType)
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the word data", data);
        setWordType(data); 
      })
      .catch((error) => {
        console.error('Error fetching previous sentences:', error);
      });
  }, [selectedWordType]);

  useEffect(() => {
    console.log("Getting Words", JSON.stringify(words));
  }, [words]);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter words..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <ul>
        {words.filter((word) =>
            word.name.toLowerCase().includes(filterText.toLowerCase())
          ).map((word, index) => (
          <li key={index}>
            <button onClick={() => addWordToSentence(word)}>{word.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;
import React, { useEffect, useState } from 'react';

function SentenceList() {
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7038/api/sentence')
      .then((response) => response.json())
      .then((data) => {
        setSentences(data);
      })
      .catch((error) => {
        console.error('Error fetching previous sentences:', error);
      });
  }, []);

  useEffect(() => {
    console.log("Getting Sentences", JSON.stringify(sentences));
  }, [sentences]);

  return (
    <div>
      <h4>Previous Sentences</h4>
      <ul>
        {sentences.map((sentence) => (
          <li class="SentenceList">{sentence.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default SentenceList;





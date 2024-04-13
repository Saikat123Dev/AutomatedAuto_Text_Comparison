import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AssemblyAI } from 'assemblyai';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [text2, setText2] = useState('');

  const assemblyaiApiKey = '50efdf794b8e46b883d5978954a64357';
  const corticalApiKey = 'eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6IjBjNjdkZWJkY2ZjODQ3ZGFiNGFmZTE4Y2E4NWJiZjU2IiwiaCI6Im11cm11cjEyOCJ9';

  const assemblyaiClient = new AssemblyAI({ apiKey: assemblyaiApiKey });

  const fetchData = async () => {
    try {
      const transcript = await assemblyaiClient.transcripts.create({ audio_url: audioUrl });
      const text1 = transcript.text;

      const url = 'https://gw.cortical.io/nlp/compare';
      const requestBody = [
        { "text": text1, "language": "en" },
        { "text": text2, "language": "en" }
      ];

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': corticalApiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult((data.similarity) * 100); // Extract and format the similarity percentage
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="title"
      >
        Hi
      </motion.h1>
      <div className="form">
        <label>
          Audio URL:
          <input
            type="text"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
          />
        </label>
        <br />
        <label>
          Text 2:
          <input
            type="text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </label>
        <br />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={fetchData}
          className="button"
        >
          Fetch Data
        </motion.button>
      </div>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="result"
        >
          <h2>Similarity Percentage:</h2>
          <p>{result}%</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;

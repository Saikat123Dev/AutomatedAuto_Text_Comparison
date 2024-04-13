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

//sample audio :-https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3

// Audio-text :- Runner's knee runner's knee is a condition characterized by pain behind or around the kneecap. It is caused by overuse, muscle imbalance and inadequate stretching. Symptoms include pain under or around the kneecap, pain when walking sprained ankle one nil here in the 37th minute she is between two guatemalan defenders and then goes down and stays down and you will see why. The ligaments of the ankle holds the ankle bones and joint in position. They protect the ankle from abnormal movements such as twisting, turning and rolling of the foot. A sprained ankle happens when the foot twists, rolls or turns beyond its normal motions. If the force is too strong, the ligaments can tear. Symptoms include pain and difficulty moving the ankle, swelling around the ankle and bruising. Meniscus tear I think some of it was just being scared, but this guy doesn't like you. Want to go after Patrick each of your knees has two menisci c shaped pieces of cartilage that act like a cushion between your shin bone and your thigh bone. A meniscus tear happens when you forcibly twist or rotate your knee, especially when putting the pressure of your full weight on it, leading to a torn meniscus. Symptoms include stiffness and swelling, pain in your knee, catching or locking of your knee rotator cuff tear has a torn rotator cuff cuff go be traveling to Los Angeles today to be examined by teen doctors on the rotator cuff attaches the humerus to the shoulder blade and helps to lift and rotate your arm. A rotator cuff tear is caused by a fall onto your arm or if you lift a heavy object too fast, the tendon can partially or completely tear off of the humerus. Head symptoms include pain when lifting and lowering your arm, weakness when lifting or rotating your arm, pain when lying on the affected shoulder. ACL tear here's Rosario on the brake now and watch. Nerls go up with the left hand, block the shot, and then on landing, there came the the ACL runs diagonally in the middle of the knee and provides stability. Anterior cruciate ligament tear occurs when your foot is firmly planted on the ground and a sudden force hits your knee while your leg is straight or slightly bent. This can happen when you are changing direction rapidly, slowing down when running or landing from a jump. The ligament completely tears into two pieces, making the knee unstable. Symptoms include severe pain and tenderness in knee, loss of full range of motion, swelling around the knee.

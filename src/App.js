import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Popup from './components/Popup'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word';
import Notification from './components/Notification';
import { notificationPopup } from './components/Helpers';


const words = ['android', 'java', 'python', 'php', 'dotnet', 'javascript'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {
  const [playable, setPlayable] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])


  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(curr => [...curr, letter])
          } else {
            notificationPopup(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(curr => [...curr, letter])
          } else {
            //TODO - show notification for duplicate
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable])

  function playAgain() {
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])

    const random = Math.floor(Math.random() * words.length)
    selectedWord = words[random]
  }

  function handleGuess(e) {
    let letter = e.target.value;
    console.log(letter);
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(curr => [...curr, letter])
      } else {
        notificationPopup(setShowNotification)
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(curr => [...curr, letter])
      } else {
        //TODO - show notification for duplicate
      }
    }

  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup selectedWord={selectedWord} wrongLetters={wrongLetters} correctLetters={correctLetters} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
      <div className='buttons'>
        {"abcdefghjklmnopqrstuvwxyz".split("").map(letter => (
          <button
            className='btn'
            key={letter}
            value={letter}
            onClick={handleGuess}
          // disabled={this.state.guessed.has(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>

  );
}

export default App;

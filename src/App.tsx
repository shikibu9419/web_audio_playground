import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  var context: AudioContext;
  var buffer: AudioBuffer;

  const loadData = async (url: string) => {
    const arrayBuffer = await fetch(url).then((res: Response) => {
      console.log(res.url)
      return res.arrayBuffer();
    })
    console.log(arrayBuffer)
    buffer = await context.decodeAudioData(arrayBuffer)
    play()
  }

  const init = () => {
    context = new AudioContext();
    loadData('https://maoudamashii.jokersounds.com/music/se/wav/se_maoudamashii_instruments_drum2_bassdrum.wav')
  }

  const play = () => {
    const startTime = context.currentTime + 0.1
    const tempo = 80
    const eightNoteTime = (60 / tempo) / 2

    const i = 0
    const time = startTime + i * 8 * eightNoteTime
    playSound(buffer, time)
  }

  const playSound = (buffer: AudioBuffer, time: number) => {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="drums">
        <button onClick={init}>init</button>
        <button onClick={play}>click</button>
      </div>
    </div>
  );
}

export default App;

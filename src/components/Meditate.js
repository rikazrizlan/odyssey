import React, {useState} from 'react';
// import PlayBtn from '../svg/play.svg';
// import PauseBtn from '../svg/pause.svg';
// import MovingOutline from '../svg/moving-outline.svg';
// import TrackOutline from '../svg/track-outline.svg';
import Beach from '../svg/beach.svg';
import Rain from '../svg/rain.svg';
import RainVideo from '../videos/rain.mp4';
import BeachVideo from '../videos/beach.mp4';
import RainSound from '../sounds/rain.mp3';
import BeachSound from '../sounds/beach.mp3';
import './Meditate.css';

const Meditate = () => {
    const [theme, setTheme] = useState(true);

    return (
        <div className="meditate-container">
            <div className="video-container">
                <video autoPlay loop>
                    <source play="true" src={theme === true? BeachVideo : RainVideo} type="video/mp4" />
                </video>
                <audio controls>
                    <source play="true" src={theme === true? BeachSound : RainSound} type="audio/mp3" />
                </audio>
            </div>

            <div className="sound-picker">
                <button onClick={() => setTheme(false)}>
                    <img src={Rain} alt="rain" />
                </button>
                <button onClick={() => setTheme(true)}>
                    <img src={Beach} alt="beach" />
                </button>
            </div>

            <div className="time-select">
                <button data-time="120">2</button>
                <button data-time="300">5</button>
                <button data-time="600">10</button>
            </div>

        </div>
    )
}

export default Meditate;

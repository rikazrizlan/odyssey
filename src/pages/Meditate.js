import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Beach from '../svg/beach.svg';
import Rain from '../svg/rain.svg';
import { ArrowBack } from '@material-ui/icons';
import './Meditate.css';

const Meditate = () => {
    const [theme, setTheme] = useState(false);

    return (
        <div className="meditate-container">
            <Link to="/home"><ArrowBack className="arrow-left"/></Link>
            <div className="video-container">
                <video autoPlay loop>
                    <source play="true" src={theme?"https://firebasestorage.googleapis.com/v0/b/odyssey-77723.appspot.com/o/videos%2Fbeach.mp4?alt=media&token=d83498b2-a5ff-4c1c-afa3-337ca6a31e9c":"https://firebasestorage.googleapis.com/v0/b/odyssey-77723.appspot.com/o/videos%2Frain.mp4?alt=media&token=14c76749-161c-43cf-87eb-531990ac37da"} type="video/mp4" />
                </video>
                <audio controls>
                    <source play="true" src={theme === true? "https://firebasestorage.googleapis.com/v0/b/odyssey-77723.appspot.com/o/sounds%2Fbeach.mp3?alt=media&token=86ce88c1-9265-4fca-9706-e30ec42718fd" :"https://firebasestorage.googleapis.com/v0/b/odyssey-77723.appspot.com/o/sounds%2Frain.mp3?alt=media&token=d1900903-4645-427a-9563-9106cbbe682f"} type="audio/mp3" />
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

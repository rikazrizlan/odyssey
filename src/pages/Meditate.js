import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import Meditation from '../images/meditationsection.png';
import './Meditate.css';

const Meditate = () => {
    return (
        <div className="meditate-container">
            <Link to="/home"><ArrowBack className="arrow-left"/></Link>
            <img src={Meditation} alt="Meditating" />
        </div>
    )
}

export default Meditate;

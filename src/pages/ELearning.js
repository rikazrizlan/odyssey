import React from 'react';
import {ArrowBack} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import LearningComponent from '../components/ELearning/ELearning';

const ELearning = () => {
    return (
        <div className="learning-container">
            <Link to="/home"><ArrowBack className="arrow-left"/></Link>
            <LearningComponent />
            <img src="https://firebasestorage.googleapis.com/v0/b/odyssey-77723.appspot.com/o/images%2Fe-learning.png?alt=media&token=e0bf652a-0207-440a-a522-c6ed06f03d23" alt="Learning" />
        </div>
    )
}

export default ELearning;

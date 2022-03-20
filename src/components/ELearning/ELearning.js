import { InfoOutlined } from '@material-ui/icons';
import React, {useState} from 'react';
import './ELearning.css';

const ELearning = ()  => {
    const [index, setIndex] = useState(1);

    return (
        <div className="e-learning-container">
            <div className="tabs">
                <div onClick={() => setIndex(1)} className={index === 1 ?"single-tab selected":"single-tab"}>E Books</div>
                <div onClick={() => setIndex(2)} className={index === 2 ?"single-tab selected":"single-tab"}>Podcasts</div>
            </div>
            <div className="e-learning-main">
                {
                    index === 1 &&
                    <div className="ebook-section">
                        <div className="ebook-container">
                            <a href="https://www.robinsharmanation.com/world-changers-manifesto-free-book#open-popup">The World Changer's Manifesto</a>
                        </div>
                    </div>
                }
                {
                    index === 2 &&
                    <div className="podcast-section">
                        <div className="text-bx">
                            <InfoOutlined />
                            <p>This feature will be coming soon...</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ELearning

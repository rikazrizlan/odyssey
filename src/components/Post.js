import React from 'react';
import {Avatar} from '@material-ui/core';
// import {db} from '../firebase';
// import PostImg from '../images/homebg.jpg';

function Post({username, image, caption, profileImage }) {
    return (
        <div className="post-container">
            <div className="post-header">
                <Avatar src={profileImage && profileImage} className="post-avatar" alt="Avatar" />
                <h3>{username}</h3>
            </div>
            <img className="post-img" src={image} alt="Posts" />
            <h4 className="post-text"><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post

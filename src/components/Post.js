import React from 'react';
import {Avatar} from '@material-ui/core';

function Post({username, caption, profileImage }) {
    return (
        <div className="post-container">
            <div className="post-header">
                <Avatar src={profileImage && profileImage} className="post-avatar" alt="Avatar" />
                <h4>@{username}</h4>
            </div>
            <p className="post-text">{caption}</p>
        </div>
    )
}

export default Post

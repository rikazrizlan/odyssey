import React from 'react';
import { db } from '../firebase';
import {Avatar} from '@material-ui/core';
import {DeleteOutlineOutlined} from '@material-ui/icons';
import { useAuth } from '../contexts/AuthContext';

function Post({id, username, caption, profileImage }) {
    const { currentUser } = useAuth();
    const deletePost = async () => {
        const res = await db.collection('posts').doc(`${id}`).delete();
        console.log(res);
        console.log(currentUser);
    }

    return (
        <div className="post-container">
            <div className="post-header">
                <Avatar src={profileImage && profileImage} className="post-avatar" alt="Avatar" />
                <h4>{username}</h4>
            </div>
            <p className="post-text">{caption}</p>
            {
                currentUser?.displayName === username &&
                <DeleteOutlineOutlined onClick={deletePost} />
            }
        </div>
    )
}

export default Post

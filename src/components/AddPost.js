import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

function AddPost() {
    const [caption, setCaption] = useState("");
    const [profileImage, setProfileImage] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
            setProfileImage(doc?.data()?.profileImage);
        })
    });

    const handleUpload = (e) => {
        e.preventDefault();
        //post text into db
        caption &&
        db.collection("posts").add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            username: currentUser?.displayName,
            profileImage: profileImage
        });
        setCaption("");
    }


    return (
        <div className="post-upload">
            <center>Share your thoughts</center>
                <div className="post-form">
                    <div className="form-group">
                        <textarea className="txt-area" onChange={event => setCaption(event.target.value)} value={caption}></textarea>
                    </div>
                    <div className="btn-container">
                        <button className="cancel-btn" onClick={() => setCaption("")}>Cancel</button>
                        <button className="input-btn btn-2" onClick={e => handleUpload(e)}>Post</button>
                        </div>
                </div>
        </div>
    )
}

export default AddPost

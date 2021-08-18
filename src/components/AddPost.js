import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { storage, db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';
import { Link } from 'react-router-dom';

function AddPost({ setOpen }) {
    const [caption, setCaption] = useState("");
    const [profileImage, setProfileImage] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
            setProfileImage(doc?.data()?.profileImage);
        })
    }, []);

    const handleUpload = () => {
        //post text into db
        db.collection("posts").add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            username: currentUser?.displayName,
            profileImage: profileImage
        });
        setCaption("");
        setOpen(false);
    }


    return (
        <div className="post-upload">
            {
                profileImage ?
                    <>
                        <center>Share your thoughts?</center>
                        <form className="post-form">
                            <div className="form-group">
                                <label htmlFor="caption">Say something...</label>
                                <textarea onChange={event => setCaption(event.target.value)} value={caption}></textarea>
                            </div>
                            <div className="btn-container">
                                <Button onClick={() => setOpen(false)} variant="contained" color="primary">Cancel</Button>
                                <Button className="btn-2" variant="contained" color="secondary" onClick={handleUpload}>Go!</Button>
                            </div>
                        </form>
                    </> :
                    <>
                        <center>To start posting you need a profile picture</center>
                        <Link style={{ textDecoration: "none", marginLeft: 70 }} to="/profile"><Button variant="contained" color="primary">Profile</Button></Link>
                    </>
            }
        </div>
    )
}

export default AddPost

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
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
            setProfileImage(doc?.data()?.profileImage);
        })
    }, []);

    const handleChange = (e) => {
        console.log(e.target.files)
        console.log(currentUser);
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const imageId = Math.random();

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${imageId+image.name}`).put(image);
        console.log(image);

        uploadTask.on("state_changed", (snapshot) => {
            //progress logic
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, (error) => {
            console.log(error);
        }, () => {
            storage
                .ref("images")
                .child(imageId+image.name)
                .getDownloadURL()
                .then(url => {
                    //post image inside db
                    db.collection("posts").add({
                        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        image: url,
                        username: currentUser?.displayName,
                        profileImage: profileImage
                    });
                    setProgress(0);
                    setImage(null);
                    setCaption("");
                    setOpen(false);
                })
        })
    }


    return (
        <div className="post-upload">
            {
                profileImage ?
                    <>
                        <center>Where were you?</center>
                        <progress className="progress-bar" value={progress} max="100" />
                        <form className="post-form">
                            <div className="form-group">
                                <label htmlFor="choose-image">Choose image</label>
                                <input type="file" onChange={handleChange} required />
                            </div>
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
                    <Link style={{textDecoration: "none", marginLeft: 70}} to="/profile"><Button variant="contained" color="primary">Profile</Button></Link>
                    </>
            }
        </div>
    )
}

export default AddPost

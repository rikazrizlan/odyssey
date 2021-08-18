import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {storage, db} from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';

function UploadProfilePicture({setOpen}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const {currentUser} = useAuth();

    const handleChange = (e) => {
        console.log(e.target.files)
        console.log(currentUser);
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on("state_changed", (snapshot) => {
            //progress logic
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, (error) => {
            console.log(error);
        }, () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                //post image inside db
                db.collection('users').doc(currentUser?.uid).set({
                    profileImage: url
                });
                setProgress(0);
                setImage(null);
                setOpen(false);
            })
        })
    }


    return (
        <div className="post-upload">
            <center>Upload a profile picture</center>  
            <progress className="progress-bar" value={progress} max="100" />
            <form className="post-form">
              <div className="form-group">
                  <label htmlFor="choose-image">Choose Image</label>
                  <input type="file" onChange={handleChange} required/>
              </div>
              <div className="btn-container">
                <Button  onClick={()=> setOpen(false)}  variant="contained" color="primary">Cancel</Button>
                <Button className="btn-2" variant="contained" color="secondary" onClick={handleUpload}>Go!</Button>
              </div>
            </form>
        </div>
    )
}

export default UploadProfilePicture
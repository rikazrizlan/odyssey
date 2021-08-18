import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useState } from 'react';
import firebase from 'firebase/app';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import BucketList from './BucketList';
import '../App.css';

function AddBucketList({ setOpen, open }) {
    const [bucketList, setBucketList] = useState("");
    const { currentUser } = useAuth();

    const handleUpload = () => {
        db.collection('bucketList').add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            bucketItem: bucketList,
            username: currentUser?.displayName,
        });
        setBucketList("");
    }

    return (
        <div className={open ? "bucket-list-main" : "bucket-list-hide"}>
            <ArrowBack style={{margin: 10}} onClick={() => setOpen(false)} />
            <center>Your Goals?</center>
            <form className="bucket-form">
                <div className="bucket-input">
                    <input onChange={event => setBucketList(event.target.value)} value={bucketList} />
                </div>
                <div className="btn-container">
                    <Button onClick={() => setOpen(false)} variant="contained" color="primary">Cancel</Button>
                    <Button className="btn-2" variant="contained" color="secondary" onClick={handleUpload}>+</Button>
                </div>
            </form>
            <BucketList />
        </div>
    )
}

export default AddBucketList
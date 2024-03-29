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

    const handleUpload = (e) => {
        e.preventDefault();
        db.collection('bucketList').add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            bucketItem: bucketList,
            username: currentUser?.displayName,
        });
        setBucketList("");
    }

    return (
        <div className={open ? "bucket-list-main" : "bucket-list-hide"}>
            <div className="bucket-wrapper">
                <ArrowBack className="arrow-left" onClick={() => setOpen(false)} />
                <center>Your Goals?</center>
                <form className="bucket-form">
                    <div className="bucket-input">
                        <input onChange={event => setBucketList(event.target.value)} value={bucketList} />
                        <span className="input-btn" onClick={e => handleUpload(e)}>+</span>
                    </div>
                </form>
                <BucketList />
            </div>
        </div>
    )
}

export default AddBucketList
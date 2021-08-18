import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { Avatar, Button, makeStyles, Modal } from '@material-ui/core';
import UploadProfilePicture from './UploadProfilePicture';
import AddBucketList from '../AddBucketList';
import '../../App.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 400,
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4,
    overflow: "scroll"
  },
}));

function ProfileHeader() {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
      setProfileImage(doc?.data()?.profileImage);
    })
  }, [currentUser]);

  const setToggle = (num) => {
    if (num !== index) {
      setIndex(num);
    } else {
      setIndex(0);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="profile-header-section">
        <div className="user-details">
          <Avatar src={profileImage ? profileImage : ""} onClick={() => setToggle(1)} style={{ width: 80, height: 80, cursor: "pointer" }} />
          <h2 className="profile-name">@{currentUser?.displayName}</h2>
        </div>
        <div className="profile-btn-container">
          <Button onClick={() => setOpen(true)} style={{ height: 30, margin: 10 }} variant="outlined">Goals</Button>
          <Button style={{ height: 30, margin: 10 }} variant="outlined">Edit Profile</Button>
          <Button style={{ height: 30 }} variant="outlined">Settings</Button>
        </div>
        <AddBucketList open={open} setOpen={setOpen} />
      </div>
      {
        index === 1 &&
        <Modal
          open={index === 1}
          onClose={() => setToggle(1)}
        >
          <div style={modalStyle} className={classes.paper}>
            <UploadProfilePicture setOpen={setOpen} />
          </div>
        </Modal>
      }
    </>
  )
}

export default ProfileHeader
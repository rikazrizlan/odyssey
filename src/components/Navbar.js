import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { Button, makeStyles, Modal } from '@material-ui/core';
import Logo from '../images/logo.png';
import { Avatar } from '@material-ui/core';
import '../App.css';
import AddPost from '../components/AddPost';
import { Add } from '@material-ui/icons'
import Meditate from './Meditate';

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
        borderRadius: 6
    },
}));

function Navbar() {

    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const [profileImage, setProfileImage] = useState();
    const [openNav, setOpenNav] = useState(false);
    const history = useHistory();

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/app");
        } catch {
            setError("Logout failed")
        }
    }

    useEffect(() => {
        db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
            setProfileImage(doc?.data()?.profileImage);
        })
    }, []);

    return (
        <div>
            <div className="home-header">
                <Link to="/home"><img className="logo" src={Logo} alt="Nomads" /></Link>
                <div className="home-header-left">
                    <button className="add-post-btn" onClick={() => setIndex(1)}><Add /></button>
                    <Avatar src={profileImage ? profileImage : ""} style={{ cursor: "pointer" }} onClick={() => setOpenNav(!openNav)} />
                    {
                        openNav && (
                            <div className="home-navigation">
                                <span className="close-icon" onClick={() => setOpenNav(!openNav)}>X</span>
                                <ul className="nav-items">
                                    <Link style={{ textDecoration: "none"}} onClick={() => setOpenNav(!openNav)} to="/home"><Button className="navBtn" >Home</Button> </Link>
                                    <Link style={{ textDecoration: "none" }} onClick={() => setOpenNav(!openNav)} to="/profile"><Button className="navBtn">Profile</Button></Link>
                                    <Button onClick={() => setIndex(2)} className="navBtn">Meditate</Button>
                                    <Button className="navBtn" color="secondary" onClick={handleLogout}>Log Out</Button>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>

            <Modal
                open={index !== 0}
                onClose={() => setIndex(0)}
            >
                <div style={modalStyle} className={classes.paper}>
                    {
                        index === 1 ? <AddPost setOpen={setOpen} /> : <Meditate />
                    }
                    
                </div>
            </Modal>
        </div>
    )
}

export default Navbar

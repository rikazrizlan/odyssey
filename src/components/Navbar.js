import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { Button } from '@material-ui/core';
import Logo from '../images/logo.png';
import { Avatar } from '@material-ui/core';
import '../App.css';


function Navbar() {

    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const [profileImage, setProfileImage] = useState();
    const [openNav, setOpenNav] = useState(false);
    const history = useHistory();

    useEffect(() => {
        db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
            setProfileImage(doc?.data()?.profileImage);
        })
    });

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/app");
        } catch {
            setError("Logout failed")
        }
    }

    return (
        <div>
            <h5>{error}</h5>
            <div className="home-header">
                <Link to="/home"><img className="logo" src={Logo} alt="Nomads" /></Link>
                <div className="home-header-left">
                    <Avatar src={profileImage ? profileImage : ""} style={{ cursor: "pointer" }} onClick={() => setOpenNav(!openNav)} />
                    {
                        openNav && (
                            <div className="home-navigation">
                                <span className="close-icon" onClick={() => setOpenNav(!openNav)}>X</span>
                                <ul className="nav-items">
                                    <Link style={{ textDecoration: "none"}} onClick={() => setOpenNav(!openNav)} to="/home"><Button className="navBtn" >Home</Button> </Link>
                                    <Link style={{ textDecoration: "none" }} onClick={() => setOpenNav(!openNav)} to="/profile"><Button className="navBtn">Profile</Button></Link>
                                    <Link style={{ textDecoration: "none" }} onClick={() => setOpenNav(!openNav)} to="/learn"><Button className="navBtn">E-Learning</Button></Link>
                                    <Link style={{ textDecoration: "none" }} onClick={() => setOpenNav(!openNav)} to="/meditate"><Button className="navBtn">Meditate</Button></Link>
                                    <Button className="navBtn" color="secondary" onClick={handleLogout}>Log Out</Button>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar

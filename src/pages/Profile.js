import React from 'react';
import PostsGrid from '../components/ProfileComponents/PostsGrid';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader';
import Navbar from '../components/Navbar';
import '../App.css';

function Profile() {
  return (
    <>
      <Navbar />
      <div className="profile-section">
        <ProfileHeader />
        <hr></hr>
        <PostsGrid />
      </div>
    </>
  )
}

export default Profile

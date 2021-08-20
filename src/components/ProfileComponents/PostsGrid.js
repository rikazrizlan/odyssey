import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './PostsGrid.css';
import Post from '../Post';

export default function PostsGrid({ setSelectedImg }) {
  const [posts, setPosts] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const { currentUser } = useAuth();

  const getPosts = () => {
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc?.id,
        post: doc?.data()
      })));
    })
  }

  const getProfileImage = () => {
    db.collection('users').doc(currentUser?.uid).onSnapshot((doc) => {
      setProfileImage(doc?.data()?.profileImage);
    })
  }

  useEffect(() => {
    getPosts();
    getProfileImage();
   });


  const userPosts = posts.filter(({ post }) => post?.username === currentUser?.displayName);
  return (
    <div className="profile-post-section">
      <div className="img-grid">
        {userPosts && userPosts?.map(({ id, post }) => (
          <div className="img-wrap" key={id}>
            <Post username={post?.username} profileImage={profileImage} caption={post?.caption} />
          </div>
        ))}
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import AddPost from '../components/AddPost';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

function Home() {
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
   }, []);
 

  return (
    <div className="home">
      <Navbar />
      <div className="home-posts">
      <AddPost />
        {
          posts.map(({ id, post }) => (
            <Post id={id} username={post?.username} key={id} profileImage={currentUser?.displayName !== post?.username ? post?.profileImage : profileImage} caption={post?.caption} />
          ))
        }
      </div>
    </div>
  )
}

export default Home

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import '../App.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  console.log(posts);

  return (
    <div className="home">
      <Navbar />
      <div className="home-posts">
        {
          posts.map(({ id, post }) => (
            <Post username={post?.username} key={id} profileImage={post?.profileImage} caption={post?.caption} />
          ))
        }
      </div>
    </div>
  )
}

export default Home

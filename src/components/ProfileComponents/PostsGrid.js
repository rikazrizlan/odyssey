import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './PostsGrid.css';

export default function PostsGrid({ setSelectedImg }) {
  const [posts, setPosts] = useState([]);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc?.id,
        post: doc?.data()
      })));
    })
  }, []);

  const userPosts = posts.filter(({ post }) => post?.username === currentUser?.displayName);

  return (
    <div className="profile-post-section">
      <div className="img-grid">
        {userPosts && userPosts?.map(({ id, post }) => (
          <div className="img-wrap" key={id}
            onClick={() => setSelectedImg(post?.image)}
          >
            <img src={post?.image} alt="Posts" />
          </div>
        ))}
      </div>
    </div>
  )
}
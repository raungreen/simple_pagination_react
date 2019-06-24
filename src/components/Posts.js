import React from 'react';

const Post = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="List-group mb-4">
      {posts.map(posts => (
        <li key={posts.id} className="list-group-item">
          {posts.title}
        </li>
      ))}
    </ul>
  );
};

export default Post;

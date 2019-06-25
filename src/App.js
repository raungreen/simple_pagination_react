import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const url = `https://jsonplaceholder.typicode.com/posts`;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(url);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, [url]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Request per page
  const handleRequest = e => {
    e.preventDefault();
    setPostsPerPage(e.target.value);
  };

  // console.log(posts.length);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Home</h1>
      <div className="form-group">
        <div className="float-right" />
        <label htmlFor="exampleFormControlSelect1">Posts per page</label>
        <select
          className="form-control col-1 float-right"
          id="exampleFormControlSelect1"
          value={postsPerPage}
          onChange={handleRequest}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;

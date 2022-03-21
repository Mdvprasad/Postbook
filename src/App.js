import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Comments from './components/Comments/Comments';
import Todos from './components/Todos/Todos';
import NavHeader from './components/Navigation/NavHeader';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <Router>
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home posts={posts} setPosts={setPosts} comments={comments} setComments={setComments} todos={todos} setTodos={setTodos} />} />
          <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts} />} />
          <Route path="/comments" element={<Comments comments={comments} />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

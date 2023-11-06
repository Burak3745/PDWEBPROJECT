import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login'
import Signup from './screens/Signup'
import Browser from './screens/Browser'
import Protected from './components/Protected';
import DetectAuth from './components/DetectAuth';
import Details from "./components/Details";
import FetchVideo from './components/FetchVideo';
import Player from './components/Player';
import AddMovie from "./Admin Panel/AddMovie";
import MovieList from "./Admin Panel/MovieList";
import UserList from "./Admin Panel/UserList";
import UpdateMovie from "./Admin Panel/UpdateMovieScreen"
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Container } from "react-bootstrap";

import Header from './components/Header'
import { FaRegCopyright } from 'react-icons/fa';
import './App.css';
import Films from "./screens/Films";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <main className="py-1">
        <Container>
          <Routes>
            <Route path="/" element={<DetectAuth user={user} setUser={setUser} />} exact />
            <Route path="/login" element={<Login setUser={setUser} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/browse" element={<Browser user={user} />}></Route>
            <Route path="/details/:id" element={<Protected><Details /></Protected>} user={user}></Route>
            <Route path="/play/:id" element={<FetchVideo user={user}/>}> </Route>
            <Route path="/addmovie" element={<AddMovie user={user} setUser={setUser} />} exact />
            <Route path="/movielist" element={<MovieList user={user} setUser={setUser} />} exact />
            <Route path="/userlist" element={<UserList user={user} setUser={setUser} />} exact />
            <Route path="/filmler/:search" element={<Films user={user} setUser={setUser} />} exact />
            <Route path="/updatemovie/:id" element={<UpdateMovie user={user} setUser={setUser} />} />
          </Routes>
        </Container>
      </main>
      
      
      <Toaster position="top-center" toastOptions={{ duration: 2750 }} />
    </Router>
  );
}

export default App;
/*
<footer>
        <FaRegCopyright /> KnowledgeHut. All rights reserved.
      </footer>
      */
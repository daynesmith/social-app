import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/createpost';
import Post from './pages/post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth',{headers: {
      accessToken: localStorage.getItem("accessToken"),
    }}).then((response) => {
      if(response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    })
  }, [])

  return(
  <div className = "App">
    <AuthContext.Provider value = {{authState, setAuthState}}>
    <Router>
      <div className = "navbar">
      <Link to ='/'>Home Page</Link>
      <Link to ='/createpost'>Create A Post</Link>
      {!authState && (
        <>
          <Link to ='/login'>Login</Link>
          <Link to ='/registration'>Registration</Link>
        </>
      )} 
      </div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/createpost" element = {<CreatePost/>}/>
        <Route path = "/post/:id" element = {<Post/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/registration" element = {<Registration/>}/>
      </Routes>
    </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App

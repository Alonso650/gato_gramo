import './App.css';
import Home from './components/Home';
import CreateGram from './components/CreateGram';
import Gram from './components/Gram';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import EditGram from './components/EditGram';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext'
import {useState, useEffect} from "react"
import Profile from "./components/Profile"
import ChangePassword from './components/ChangePassword';
import axios from 'axios';

function App() {
  let navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false
  });

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { 
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    // if there is an error, setting the authorizing state to false,
    // otherwise set the logged in person to the authorized person 
    // with the username, id
    .then((response) => {
      if(response.data.error){
        setAuthState({...authState, status: false});
      } else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };

  function dropDownFunct(){
    document.getElementById("myDropDown").classList.toggle("show");
  }

  // if dropdown menu is visible then clicking anywhere on the window
  // will make the dropdown menu disappear
  window.onclick = function(e){
    if(!e.target.matches('.dropbtn')){
      let myDropDown = document.getElementById("myDropDown");
      if(myDropDown.classList.contains('show')){
        myDropDown.classList.remove('show');
      }
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <div className="navbar">
        <div className="links">
          
          {!authState.status ? (
            <>
              <Link to='/login'> Login</Link>
              <Link to="/registration">Registration</Link>
            </>
          ) : (
            <>
              <Link to="/"> Home Page</Link>
              <Link to="/creategram">Create a Gram</Link>
            </>
          )}
        </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={dropDownFunct}>
              {authState.username}
            </button>
              <div className="dropdown-content" id="myDropDown">
                <a href={`/profile/${authState.id}`}>Profile</a>
                <a href="#" onClick={logout}>Logout</a>
              </div>
            </div>
      </div>
      
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path='/creategram' element={<CreateGram/>}/>
          <Route exact path='/gram/:id'element={<Gram/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/profile/:id' element={<Profile/>}/>
          <Route exact path='/changepassword' element={<ChangePassword/>}/>
          <Route exact path='/registration' element={<Registration/>}/>
          <Route exact path='/editGram/:id' element={<EditGram/>}/>
          <Route exact path="*" element={<PageNotFound />}/>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

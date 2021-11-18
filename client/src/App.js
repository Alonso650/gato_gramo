import React from 'react';
// this will be used for switching different routes
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateGram from './components/Gram/CreateGram';
import User from './components/User/User';
import Home from './components/Home/Home';


const App = () => {


    return(
        <>
            {/* Everything must be inside a router to be able to swtich to 
            different routes */}
            <Router>
                <Home/>
                <div>
                <Routes>
                    
                      {/* Still debating if the home component should be the landing
                      page where users can sign in or the index showcasing entries */}
                    
                    {/* <Route path='/' element={<Home/>}></Route> */}
                    <Route path='/user'  element={<User/>}></Route>
                    <Route path='/gram' element={<CreateGram/>}></Route>
                </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
import React from 'react';
// this will be used for switching different routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGram from './components/Gram/CreateGram';
import CreateUser from './components/CreateUser/CreateUser';

import ViewGram from './components/Gram/ViewGram';
import Home from './components/Home/Home';


const App = () => {

    return(
        <>
            {/* Everything must be inside a router to be able to swtich to 
            different routes */}
            <Router>
                <div>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    {/* <Route path='/CreateUser'  element={<CreateUser/>}></Route> */}
                    <Route path='/CreateGram' element={<CreateGram/>}></Route>
                    <Route path='/ViewGram' element={<ViewGram/>}></Route>
                </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
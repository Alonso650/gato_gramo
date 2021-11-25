import React, { useState } from 'react';
// this will be used for switching different routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGram from './components/Gram/CreateGram';
import UserForm from './components/UserForm/UserForm';
import User from './components/User/User';

import ViewGram from './components/Gram/ViewGram';
import Home from './components/Home/Home';


const App = () => {
    const [currentId, setCurrentId] = useState('');
    return(
        <>
            {/* Everything must be inside a router to be able to swtich to 
            different routes */}
            <Router>
                <div>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/UserForm'  element={<UserForm currentId={currentId} setCurrentId={setCurrentId}/>}></Route>
                    <Route path='/CreateGram' element={<CreateGram/>}></Route>
                    <Route path='/ViewGram' element={<ViewGram/>}></Route>
                    <Route path='/User' element={<User setCurrentId={setCurrentId}/>}></Route>
                </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
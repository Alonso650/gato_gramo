import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [click, setClick] = useState(false);

    const closeSignInMenu = () => setClick(false);

    return(
        <div>
            
            <div>
            <h1>Welcome to Gato Gramo</h1>
                <form>
                    <div>
                        <input type= "text" id= "signIn" placeholder="email"/>
                    </div>
                    <div>
                        <input type= "password" id= "password_signIn" placeholder="password"/>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <div onClick={closeSignInMenu}>
                    <p>Don't have an account? Create one! <Link to='/user'>Create User Profile</Link></p>
                </div>
                <div>
                    <p>View some of our cutest more adorbs gram posts here!<Link to="/gram">Meow!</Link></p>
                </div>
            </div>
        </div>
    )
};

export default Home;
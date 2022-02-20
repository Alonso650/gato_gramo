import { Link, renderMatches } from 'react-router-dom';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// checkButton is used to verify if the form validation is successfull or not
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.services";

const required = (value) => {
    if(!value){
        // return(
        //     <div>
        //         This field is required!
        //     </div>
        // );
        return 'require';
    }
};

const email = (value) => {
    if(!validator.isEmail(value)){
        return `${value} is not a valid email.`
    }
};


const Login = (props) => {
    // need to check what useRef does
    const form = useRef();
    const checkBtn = useRef();

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const[message, setMessage] = useState("");
    
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogic = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        // need to check what is current.context._errors.length
        if(checkBtn.current.context._errors.length === 0){
            AuthService.login(username, password).then(
                ()=> {
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                         error.response.data &&
                         error.response.data.message) ||
                        error.message ||
                        error.toString();
                        setLoading(false);
                        setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    return(
        <div>
            <div>
                <Form onSubmit={handleLogic} ref={form}>
                    <div className="form-group">
                        <label htmlFor = "username">Username</label>
                    </div>
                </Form>
            </div>
        </div>
    )
}
// const Home = () => {

//     return(
//         <div>
            
//             <div>
//             <h1>Welcome to Gato Gramo</h1>
//                 <form>
//                     <div>
//                         <input type= "text" id= "signIn" placeholder="email"/>
//                     </div>
//                     <div>
//                         <input type= "password" id= "password_signIn" placeholder="password"/>
//                     </div>
//                     <button type="submit">Log In</button>
//                 </form>
//                 <div>
//                     <p>Don't have an account? Create one! <Link to='/add'>Create User Profile</Link></p>
//                 </div>
//                 <div>
//                     <p>View some of our cutest more adorbs gram posts here!<Link to="/CreateGram">Meow!</Link></p>
//                 </div>
//                 <div>
//                     <p>View the profile created here <Link to='/users'>user Profile info</Link></p>
//                 </div>
                
//             </div>
//         </div>
//     )
// };

// export default Home;
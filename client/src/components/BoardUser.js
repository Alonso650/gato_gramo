import React, {useState, useEffect} from "react";
import userService from "../services/user.service";
import NavBar from "./NavBar/NavBar";

const BoardUser = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        userService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = 
                (error.response &&
                 error.respone.data &&
                 error.response.data.message) ||
                 error.message ||
                 error.toString();
                 setContent(_content);
            }
        );
    }, []);
    return(
        <div className="container">
            <NavBar/>
            <header className="jumobtron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};
export default BoardUser;
import React, {useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import authService from "../../services/auth.service";
import GramDataService from "../../services/gram.service";

const required = (value) => {
    if(!value){
        return 'require';
    }
}

const CreateGram = (userId) => {
    const currentUser = authService.getCurrentUser();

    userId = currentUser.id;
    const form = useRef();
    const checkBtn = useRef();
    
    let navigate = useNavigate();

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[message, setMessage] = useState("");
    const[successful, setSuccessFul] = useState(false);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const handleGramCreate = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessFul(false);
        form.current.validateAll();
        if(checkBtn.current.context._errors.length === 0){
            GramDataService.createGram(title, description, userId).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessFul(true);
                },
                (error) => {
                    const resMessage =
                     (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                      error.message ||
                      error.toString();
                    setMessage(resMessage);
                    setSuccessFul(false);
                }
            );
        }
    };

    return(
        <div>
            <div>
                <Form onSubmit={handleGramCreate} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={title}
                                    onChange={onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="paragraph"
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <button>Post Gram</button>
                            </div>
                        </div>
                    )}
                    { message &&(
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );

};

export default CreateGram;
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { data, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';



function CreatePost() {
    let navigate = useNavigate();

   const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({       //client side validation, make sure input values are valid.
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(25).required(),
    });

   const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            navigate("/")
        });
    };
    
    


    return (
        <div className='createPostPage'>
            <Formik initialValues ={initialValues} onSubmit ={onSubmit} validationSchema = {validationSchema}>
                <Form>
                    <label>Title: </label>
                    <ErrorMessage name = "title" component = "span"/>
                    <Field 
                        id="inputCreatePost" 
                        name="title" 
                        placeholder="(Title)" 
                    />
                    <label>Post: </label>
                    <ErrorMessage name = "postText" component = "span"/>
                    <Field 
                        id="inputCreatePost" 
                        name="postText" 
                        placeholder="(your post)" 
                    />
                    <label>Username: </label>
                    <ErrorMessage name = "username" component = "span"/>
                    <Field 
                        id="inputCreatePost" 
                        name="username" 
                        placeholder="(your name)" 
                    />
                    <button type = "submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;

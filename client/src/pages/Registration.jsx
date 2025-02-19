import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration(){

    const initialValues = {
            username: "",
            password: "",
        };
    
    const validationSchema = Yup.object().shape({       //client side validation, make sure input values are valid.
            username: Yup.string().min(3).max(25).required(),
            password: Yup.string().min(4).max(25).required(),
        });

    const onSubmit = (data) =>{
        axios.post('http://localhost:3001/auth', data).then(()=>{
            console.log(data)
        })
    };

    return(
        <div>
            <Formik 
            initialValues ={initialValues} 
            onSubmit ={onSubmit} 
            validationSchema = {validationSchema}>
                <Form>
                    <label>Username: </label>
                    <ErrorMessage name = "username" component = "span"/>
                    <Field 
                        id="inputCreatePost" 
                        name="username" 
                        placeholder="(your username)" 
                    />
                    <label>Password: </label>
                    <ErrorMessage name = "password" component = "span"/>
                    <Field 
                        id="inputCreatePost" 
                        type = "password"
                        name="password" 
                        placeholder="(your password)" 
                    />
                    <button type = "submit">Register Now</button>
                </Form>
             </Formik>
        </div>
    )
}

export default Registration

import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function RegisterForm() {
    const [formData, setFormData] = useState({
        userName: '',
        userPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        axios
            .post('/tb/user/registration', undefined,
                {
                    params: {
                        userName: formData.userName,
                        userPassword: formData.userPassword
                    }
                })
            .then((response) => {
                console.log(response.data);
            })
            .then(()=>{navigate('/login')})
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">
                    Enter Username:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="userPassword">
                    Enter Password:
                    <input
                        type="password"
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegisterForm;

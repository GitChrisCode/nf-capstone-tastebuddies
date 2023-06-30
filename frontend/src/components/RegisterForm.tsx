import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // Hier können Sie die Passwortvalidierung implementieren
        if (formData.password !== formData.confirmPassword) {
            alert('Die eingegebenen Passwörter stimmen nicht überein.');
            return;
        }

        axios
            .post(
                '/tb/user/registration',
                undefined,
                {
                    params: {
                        userName: formData.userName,
                        userPassword: formData.password,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
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
                <label htmlFor="password">
                    Enter Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="confirmPassword">
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegisterForm;

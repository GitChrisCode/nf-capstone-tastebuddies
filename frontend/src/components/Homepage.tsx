import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <div>
            <p>If you are already registed, please Login:</p>
            <button onClick={goToLogin}>Go to Login</button>
            <p>Otherwise please register:</p>
            <button onClick={goToRegister}> Go to Register</button>
        </div>
    );
}

export default Homepage;
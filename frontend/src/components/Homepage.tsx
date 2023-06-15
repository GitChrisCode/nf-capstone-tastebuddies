import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to REACT hell ...</h1>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    );
}

export default Homepage;
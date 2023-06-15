import React, { FormEvent, useState } from 'react';
import {useNavigate} from "react-router-dom";

type Props = {
    login: (username: string, password: string) => Promise<void>
}
function LoginPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username,password).then(()=>{
            navigate('/recipesearch');
        })
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={loginOnSubmit}>
                <p>Enter Username:</p>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <p>Enter Password:</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>LOGIN</button> {/** type="submit" ist default */}
            </form>
        </div>
    );
}

export default LoginPage;
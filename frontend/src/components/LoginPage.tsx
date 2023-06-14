import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function LoginPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate()

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // verhindert das neurendern der Seite
        // wir schicken über den Header unsere Authorisierung mit, der Body ist undefined
        axios.post("/user/login", undefined, {auth: {username, password}})
            .then((r) => console.log(r.data))
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={loginOnSubmit}>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>LOGIN</button> {/** type="submit" ist default */}
            </form>
        </div>
    );
}

export default LoginPage;
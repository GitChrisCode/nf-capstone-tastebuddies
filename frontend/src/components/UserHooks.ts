import {useState} from "react";
import axios from "axios";

export default function useUser() {

    const [user, setUser] = useState<string>()

    function login(username: string, password: string) {
        // Rückgabewert ist ein Promise weil die Funktion asynchron ist
        return axios.post("/user/login", undefined, {auth: {username, password}})
            .then((r) => setUser(r.data))
    }

    return {login, user}

}
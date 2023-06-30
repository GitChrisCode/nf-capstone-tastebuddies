import {useState} from "react";
import axios from "axios";

export default function useUser() {

    const [user, setUser] = useState<string|undefined>()

    function login(username: string, password: string) {
        // Rückgabewert ist ein Promise weil die Funktion asynchron ist
        return axios.post("/tb/user/login", undefined, {auth: {username, password}})
            .then((r) => setUser(r.data))
    }
    console.log("login wurde ausgeführt ... ", user)
    return {login, user}
}
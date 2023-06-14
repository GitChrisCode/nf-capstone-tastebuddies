import React from "react";
import {Navigate} from "react-router-dom";

type Props = {
    user: string | undefined
}

function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user !== "anyonymousUser"

    return (
        authenticated ? <Navigate to={"/recipesearch"}/> : <Navigate to={"/login"}/>
    );
}

export default ProtectedRoutes;
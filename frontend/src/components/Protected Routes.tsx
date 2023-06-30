import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user: string | undefined;
}

function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user !== "anonymousUser"
    useEffect(()=> {
        console.log("protectedRoutes: Current user:", props.user);
    },[props.user]);
    return (
        authenticated ? <Outlet/> : <Navigate to={"/"}/>
    );
}

export default ProtectedRoutes;
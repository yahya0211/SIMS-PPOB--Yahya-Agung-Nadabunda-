import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps{
    element:JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({element}) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />
}

export default PrivateRoute
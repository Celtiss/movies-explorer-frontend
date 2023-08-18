import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({element: Component, ...props} ) {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return (
        storedLoggedIn ? <Component {...props} /> : <Navigate to="/" replace/>
    )
}

export default ProtectedRoute;
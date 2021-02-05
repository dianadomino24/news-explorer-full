import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, component: Component, ...props }) => (
    <Route exact path="/saved-news">
        {() => (isLoggedIn === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/sign-up"/>
        ))
        }
    </Route>
);

export default ProtectedRoute;

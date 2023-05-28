import React from 'react';

import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export interface PrivateRouteProps {
    component: PropTypes.ReactComponentLike,
    path: string,
    exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useSelector((state: RootState) => state.login)
    console.log("Private Route", isAuthenticated)
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Component {...props} />;
            }
            return <Redirect to={{pathname: '/login'}}/>
        }}/>
    );

}
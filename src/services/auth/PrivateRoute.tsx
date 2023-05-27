import React from 'react';

import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

export interface PrivateRouteProps {
    component: PropTypes.ReactComponentLike,
    path: string,
    exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();
    // Preferences.get({key: "token"}).then(result => {
    //     if (result.value) {
    //         dispatch(loginReduce({
    //             token: result.value
    //         }))
    //     }
    // })

    const {isAuthenticated} = useSelector((state: RootState) => state.login)
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Component {...props} />;
            }
            return <Redirect to={{pathname: '/login'}}/>
        }}/>
    );

}
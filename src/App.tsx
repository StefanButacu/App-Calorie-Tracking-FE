import {Redirect, Route} from 'react-router-dom';

import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ListingFoodPage from "./pages/ListingFoodPage";
import DiaryPage from "./pages/Diary";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import {PrivateRoute} from "./services/auth/PrivateRoute";
import AddFoodPage from "./pages/AddFoodPage";
import EditFoodPage from "./pages/EditFoodPage";
import React from "react";
import {RegisterPage} from "./pages/RegisterPage";
import {useSelector} from "react-redux";
import {RootState} from "./store";

setupIonicReact();

const App: React.FC = () => {

    const {isAuthenticated} = useSelector((state: RootState) => state.login)
    console.log("Is authenticated", isAuthenticated)
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/*<PrivateRoute exact path="/add-food/:diaryDay/:mealId" component={ListingFoodPage}/>*/}
                    {/*<PrivateRoute exact path="/diary" component={DiaryPage}/>*/}
                    {/*<PrivateRoute exact path="/user" component={UserPage}/>*/}

                    <Route
                        exact
                        path="/add-food/:diaryDay/:mealId"
                        render={(props) => {
                            return isAuthenticated ? <ListingFoodPage/> : <Redirect to={"/login"}/>;
                        }}
                    />


                    <Route
                        exact
                        path="/diary"
                        render={(props) => {
                            return isAuthenticated ? <DiaryPage/> : <Redirect to={"/login"}/>;
                        }}
                    />


                    <Route
                        exact
                        path="/user"
                        render={(props) => {
                            return isAuthenticated ? <UserPage/> : <Redirect to={"/login"}/>;
                        }}
                    />


                    {/*<PrivateRoute exact path={'/add-food/:diaryDay/:mealId/:foodId'} component={AddFoodPage}/>*/}
                    {/*<PrivateRoute exact path={'/edit-food/:diaryDay/:mealId/:foodId'} component={EditFoodPage}/>*/}
                    <Route
                        exact
                        path="/add-food/:diaryDay/:mealId/:foodId"
                        render={(props) => {
                            return isAuthenticated ? <AddFoodPage/> : <Redirect to={"/login"}/>;
                        }}
                    />


                    <Route
                        exact
                        path="/edit-food/:diaryDay/:mealId/:foodId"
                        render={(props) => {
                            return isAuthenticated ? <EditFoodPage/> : <Redirect to={"/login"}/>;
                        }}
                    />

                    <Route exact path="/register" component={RegisterPage}/>
                    {/*<RegisterPage/>*/}
                    {/*</Route>*/}
                    <Route exact path="/">
                        <Redirect to="/diary"/>
                    </Route>
                    <Route exact path="/login" component={LoginPage}/>


                    <Route render={() => <Redirect to={'/diary'}/>}/>

                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>)
};

export default App;

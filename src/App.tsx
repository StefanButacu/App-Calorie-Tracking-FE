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

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <PrivateRoute exact={true} path="/add-food/:diaryDay/:mealId" component={ListingFoodPage}/>
                <PrivateRoute exact={true} path="/diary" component={DiaryPage}/>
                <PrivateRoute exact={true} path="/user" component={UserPage}/>

                <Route exact path={'/add-food/:diaryDay/:mealId/:foodId'} component={AddFoodPage}/>
                <Route exact path={'/edit-food/:diaryDay/:mealId/:foodId'} component={EditFoodPage}/>

                <Route exact path="/">
                    <Redirect to="/diary"/>
                </Route>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;

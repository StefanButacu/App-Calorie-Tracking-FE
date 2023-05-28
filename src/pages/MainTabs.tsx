import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import DiaryPage from "./Diary";
import UserPage from "./UserPage";
import {bookOutline, personOutline} from "ionicons/icons";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import "../assets/styles/globals.scss"

const MainTabs: React.FC = () => {
    const {isAuthenticated} = useSelector((state: RootState) => state.login)

    return (
        <IonTabs>
            <IonRouterOutlet>
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

                <Redirect exact path='/' to={'/diary'}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/diary">
                    <IonIcon icon={bookOutline}/>
                    <IonLabel>Diary</IonLabel>
                </IonTabButton>

                <IonTabButton tab="radio" href="/user">
                    <IonIcon icon={personOutline}/>
                    <IonLabel>Me</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )

}

export default MainTabs;
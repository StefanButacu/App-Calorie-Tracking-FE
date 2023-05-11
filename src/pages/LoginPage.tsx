import React, {useState} from "react";
import {IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {loginReduce, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {requestLogin} from "../services/actions/loginAction";
import {Redirect} from "react-router-dom";

interface LoginState {
    username?: string;
    password?: string;
}

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<LoginState>({});
    const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated)

    const {username, password} = state;
    const handleLogin = () => {
        console.log('handleLogin...');
        requestLogin(username!, password!).then(response => {
            console.log("Token", response.data);
            dispatch(loginReduce({
                token: response.data
            }))
        });
    }
    if (isAuthenticated) {
        return <Redirect to={{pathname: '/'}}/>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <IonInput placeholder="Username"
                          value={username}
                          onIonChange={e => setState({...state, username: e.detail.value || ''})}
                />
                <IonInput placeholder="Password"
                          value={password}
                          onIonChange={e => setState({...state, password: e.detail.value || ''})}
                />
                <IonButton onClick={handleLogin}>Login</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage;
import React, {useState} from "react";
import {IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {loadingReduce, loginReduce, RootState} from "../store";
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
    const isLoading = useSelector((state: RootState) => state.loading).isLoading

    const {username, password} = state;
    const handleLogin = () => {
        dispatch(loadingReduce({isLoading: true}))
        requestLogin(username!, password!).then(response => {
            dispatch(loginReduce({
                token: response.data
            }))
        })
                .catch(err => console.log(err, err))
            .finally(() => dispatch(loadingReduce({isLoading: false})));
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
            <IonLoading isOpen={isLoading} message="Loading..." spinner="circles"/>
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
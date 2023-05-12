import React, {useState} from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {loadingReduce, loginReduce, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {requestLogin} from "../services/actions/loginAction";
import {Redirect} from "react-router-dom";
import '../assets/styles/login.scss';

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
                    <IonTitle>Welcome!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading isOpen={isLoading} message="Loading..." spinner="circles"/>
            <IonContent class="ion-padding">
                <div className="login-content">
                    <img src={require('../assets/images/burger.png')} alt="burgerLogo" style={{width: "64px", height: "64px"}}/>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop: "50px"}}>
                        <div className={"detail"}>
                            <p className="left">Username</p>
                            <IonInput className="right" placeholder="John Doe"
                                      value={username}
                                      onIonChange={e => setState({...state, username: e.detail.value || ''})}
                            />
                        </div>
                        <div className={"detail"} style={{paddingBottom: "20px", marginBlock:"20px"}}>
                            <p className="left">Password</p>
                            <IonInput className="right" placeholder="*********"
                                      value={password}
                                      type="password"
                                      onIonChange={e => setState({...state, password: e.detail.value || ''})}
                            />
                        </div>
                        <IonButton onClick={handleLogin} style={{width: "100%", marginBottom:"15px"}}>Login</IonButton>
                        <div>Register</div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage;
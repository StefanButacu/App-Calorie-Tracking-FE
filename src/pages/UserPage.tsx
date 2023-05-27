import React, {useEffect, useRef, useState} from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonPage,
    IonPopover,
    IonTitle,
    IonToolbar,
    ToastOptions,
    useIonToast
} from "@ionic/react";
import Footer from "../components/Footer";
import {useHistory} from "react-router-dom";
import {UserDetails} from "../types/User.types";
import {requestGetUserDetails, requestUpdateUserCurrentWeight} from "../services/actions/userAction";
import {useDispatch, useSelector} from "react-redux";
import {logoutReduce, RootState} from "../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/user.scss'
import WeightProgressBar from "../components/WeightProgressBar";
import {checkmarkOutline, exitOutline, scaleOutline} from "ionicons/icons";
import {Preferences} from '@capacitor/preferences';
import {UserUpdateWeight} from "../services/toastOptions";

const UserPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentIcon] = useState("user")

    const handleDiaryClick = () => {
        history.push("/diary");
    };
    const handleUserClick = () => {
    };
    const {token} = useSelector((state: RootState) => state.login)
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [currentWeight, setCurrentWeight] = useState<number>(0);
    const [progressBarWeight, setProgressBarWeight] = useState<number>(0);
    const [present] = useIonToast();
    const presentToast = (options: ToastOptions) => {
        present(options).then();
    };

    useEffect(() => {
        requestGetUserDetails(token).then(response => {
            console.log(response.data)
            setUserDetails(response.data);
        })
    }, [])

    const handleLogout = () => {
        Preferences.remove({key: "token"}).then(() => {
                dispatch(logoutReduce())
                history.push('/login')
            }
        )
    }

    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const openPopover = (e: any) => {
        popover.current!.event = e;
        setPopoverOpen(true);
    };


    useEffect(() => {
        if (userDetails) {
            setCurrentWeight(userDetails.currentWeight)
            setProgressBarWeight(userDetails.currentWeight);
        }
    }, [userDetails])


    const handleCurrentWeightChanged = (event: CustomEvent) => {
        const currentWeight = parseFloat(event.detail.value);
        setCurrentWeight(currentWeight);
    };

    const handleUserDetailsChanged = () => {
        requestUpdateUserCurrentWeight(userDetails!.currentWeight, token).then(response => {
            presentToast(UserUpdateWeight);
        })

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonIcon size="large" className="flip-icon" icon={exitOutline} onClick={handleLogout}></IonIcon>
                    </IonButtons>
                    <IonTitle> {userDetails && capitalize(userDetails.username)}</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon icon={checkmarkOutline} size="large" onClick={handleUserDetailsChanged}></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div>
                    {userDetails &&
                        <div>
                            <p className="info-name">Progress</p>
                            <WeightProgressBar startWeight={userDetails.startWeight} goalWeight={userDetails.goalWeight}
                                               currentWeight={progressBarWeight}/>
                        </div>
                    }
                </div>
                <div>
                    {userDetails &&
                        <div>
                            <div className="user-detail">
                                <p className="info-name left">Calorie Goal</p>
                                <div className="right">{userDetails.calorieGoal} Kcal</div>
                            </div>
                            <div className="user-detail">
                                <p className="left">Proteins</p>
                                <div className="right">{userDetails.proteinGoal} g</div>
                            </div>
                            <div className="user-detail">
                                <p className="left">Carbohydrates</p>
                                <div className="right">{userDetails.carbohydrateGoal} g</div>
                            </div>
                            <div className="user-detail">
                                <p className=" left">Lipids</p>
                                <div className="right">{userDetails.lipidGoal} g</div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {userDetails &&
                        <div>
                            <p className="info-name">Measurements</p>
                            <div className="user-detail">
                                <p className={"left"}>Weight</p>
                                <p className={"right"}>{userDetails.currentWeight}</p>
                            </div>
                            <div className="user-detail">
                                <p className={"left"}>Height</p>
                                <p className={"right"}>{userDetails.height}</p>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {userDetails &&
                        <div>
                            <p className="info-name">Diet</p>
                            <div className="user-detail">
                                <p className={"left"}>Activity Level</p>
                                <p className={"right"}>{userDetails.activityLevel.text}</p>
                            </div>
                            <div className="user-detail">
                                <p className={"left"}>Weight Goal</p>
                                <p className={"right"}>{userDetails.weightGoal.text}</p>
                            </div>
                            <div style={{textAlign: "center", marginTop: "25px"}}>
                                <IonIcon size="large" className="flip-icon" icon={scaleOutline}
                                         style={{width: "125px", "height": "125px"}}></IonIcon>

                                <IonLabel onClick={openPopover} className="add-food-label">
                                    <p style={{}}>Update your weight</p>
                                </IonLabel>
                                <IonPopover ref={popover} isOpen={popoverOpen}
                                            onDidDismiss={() => {
                                                setPopoverOpen(false)
                                                setUserDetails({...userDetails, currentWeight})
                                            }}
                                            size="cover"
                                >
                                    <IonInput className={"right"}
                                              type="number"
                                              min={1}
                                              value={currentWeight}
                                              placeholder="Weight (Kg)"
                                              onIonChange={handleCurrentWeightChanged}
                                              style={{textAlign: "center"}}
                                    />
                                </IonPopover>
                            </div>

                        </div>


                    }
                </div>

            </IonContent>
            <Footer activeIcon={currentIcon} handleOnDiaryClick={handleDiaryClick} handleUserClick={handleUserClick}/>

        </IonPage>

    )
}

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)

export default UserPage;
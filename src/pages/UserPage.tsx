import React, {useEffect, useState} from "react";
import {IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Footer from "../components/Footer";
import {useHistory} from "react-router-dom";
import {UserDetails} from "../types/User.types";
import {requestGetUserDetails} from "../services/actions/userAction";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/user.scss'
import WeightProgressBar from "../components/WeightProgressBar";
import {checkmarkOutline} from "ionicons/icons";

const UserPage: React.FC = () => {
    const history = useHistory();
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
    // const [protein, setProtein] = useState<number>(0);
    // const [carbohydrate, setCarbohydrate] = useState<number>(0);
    // const [lipid, setLipids] = useState<number>(0);


    useEffect(() => {
        requestGetUserDetails(token).then(response => {
            setUserDetails(response.data);
        })
    }, [])

    useEffect(() => {
        if (userDetails) {
            setCurrentWeight(userDetails.currentWeight)
            setProgressBarWeight(userDetails.currentWeight);
            // setProtein(userDetails.currentWeight);
            // setCarbohydrate(userDetails.currentWeight);
            // setLipids(userDetails.currentWeight);
        }
    }, [userDetails])


    const handleCurrentWeightChanged = (event: CustomEvent) => {
        const currentWeight = parseFloat(event.detail.value);
        setCurrentWeight(currentWeight);
    };

    const handleUserDetailsChanged = () => {
        setProgressBarWeight(currentWeight);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
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
                                <IonInput className={"right"}
                                          type="number"
                                          min={1}
                                          value={currentWeight}
                                          placeholder="Weight (Kg)"
                                          onIonChange={handleCurrentWeightChanged}
                                />
                            </div>
                            <div className="user-detail">
                                <p className={"left"}>Height</p>
                                <p className={"right"}>{userDetails.height}</p>
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
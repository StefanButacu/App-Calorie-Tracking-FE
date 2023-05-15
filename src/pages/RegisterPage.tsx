import React, {useEffect, useState} from "react";
import {
    InputCustomEvent,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    SelectCustomEvent,
    ToastOptions,
    useIonToast
} from "@ionic/react";
import {caretBack} from "ionicons/icons";
import {ActivityLevel, DietType, Gender, UserRegisterRequest, WeightGoal} from "../types/User.types";
import {
    requestGetActivityLevels,
    requestGetDietTypes,
    requestGetGenders,
    requestGetWeightGoals,
    requestRegister
} from "../services/actions/userAction";
import {registerFailedOptions, registerSuccessfullyOptions} from "../services/toastOptions";
import {useHistory} from "react-router";

export const RegisterPage: React.FC = () => {
    const [present] = useIonToast();
    const history = useHistory();
    const presentToast = (options: ToastOptions) => {
        present(options);
    };

    const [activityLevelOptions, setActivityLevelOptions] = useState<ActivityLevel[]>([])
    const [dietTypeOptions, setDietTypeOptions] = useState<DietType[]>([])
    const [genderOptions, setGenderOptions] = useState<Gender[]>([])
    const [weightGoalOptions, setWeightGoalOptions] = useState<WeightGoal[]>([])

    useEffect(() => {
        requestGetActivityLevels().then(response => setActivityLevelOptions(response.data))
        requestGetDietTypes().then(response => setDietTypeOptions(response.data))
        requestGetGenders().then(response=> setGenderOptions(response.data))
        requestGetWeightGoals().then(response => setWeightGoalOptions(response.data))
    },[])

    const [userRegisterRequest, setUserRegisterRequest] = useState<UserRegisterRequest>({});
    const handleFitnessInputChange = (event: SelectCustomEvent) => {
        const name = event.target.name
        const value = event.detail.value || ""
        setUserRegisterRequest((prevState) => ({
            ...prevState,
            userFitnessRequest: {...prevState?.userFitnessRequest, [name]: value}
        }));
    };

    const handleRegisterInputChange = (event: InputCustomEvent) => {
        const name = event.target.name
        const value = event.detail.value || ''
        if(name == 'age' || name == 'height') {
            setUserRegisterRequest((prevState) => ({
                ...prevState,
                userFitnessRequest: {...prevState?.userFitnessRequest, [name]: parseInt(value)}
            }));
        }
        if(name == 'startWeight') {
            setUserRegisterRequest((prevState) => ({
                ...prevState,
                userFitnessRequest: {...prevState?.userFitnessRequest, 'weight' : parseInt(value)}
            }));
        }

        setUserRegisterRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleRegisterClick = () => {
        requestRegister(userRegisterRequest).then(response => {
                console.log(response)
                presentToast(registerSuccessfullyOptions)
                history.push('/login')
            }
        ).catch(err => {
            console.log(err)
            presentToast(registerFailedOptions)
        })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={caretBack}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{width: "85%", margin: "5px auto"}}>

                    <IonLabel position="stacked">Username</IonLabel>
                    <IonItem fill="solid">
                        <IonInput id="username" class="custom" name="username"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Password</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" name="password" type="password" onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Age</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={0} max={100} name="age"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Current Weight</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={40} max={160} name="startWeight"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Height</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={130} max={230} name="height"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Goal Weight</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={0} name="goalWeight"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonSelect placeholder="Select Gender" name="gender" onIonChange={handleFitnessInputChange}>
                        {genderOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select activity level" name="activityLevel"
                               onIonChange={handleFitnessInputChange}>
                        {activityLevelOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select Weight Goal" name="weightGoal"
                               onIonChange={handleFitnessInputChange}>
                        {weightGoalOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select Diet Type" name="dietType"
                               onIonChange={handleFitnessInputChange    }
                    >
                        {dietTypeOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
                <IonButton onClick={handleRegisterClick}></IonButton>
            </IonContent>

        </IonPage>
    )
}
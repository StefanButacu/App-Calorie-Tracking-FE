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
import {
    customAlertActivityLevel,
    customAlertDietType,
    customAlertGender,
    customAlertWeightGoal
} from "../services/selectOptions";

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
        requestGetGenders().then(response => setGenderOptions(response.data))
        requestGetWeightGoals().then(response => setWeightGoalOptions(response.data))
    }, [])

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
        if (name == 'age' || name == 'height') {
            setUserRegisterRequest((prevState) => ({
                ...prevState,
                userFitnessRequest: {...prevState?.userFitnessRequest, [name]: parseInt(value)}
            }));
        }
        if (name == 'startWeight') {
            setUserRegisterRequest((prevState) => ({
                ...prevState,
                userFitnessRequest: {...prevState?.userFitnessRequest, 'weight': parseInt(value)}
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
    console.log("Render Register Page")

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
                        <IonInput id="username" class="custom" name="username" placeholder="John Doe"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Password</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" name="password" type="password" placeholder="******"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Age</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={18} max={100} name="age" placeholder="18-65"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Current Weight</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={40} max={160} name="startWeight"
                                  placeholder="40-160 kg"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Height</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={130} max={230} name="height"
                                  placeholder="130 - 230 cm"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonLabel position="stacked">Goal Weight</IonLabel>
                    <IonItem fill="solid">
                        <IonInput class="custom" type="number" min={0} name="goalWeight" placeholder="80 kg"
                                  onIonChange={handleRegisterInputChange}></IonInput>
                    </IonItem>

                    <IonSelect placeholder="Select Gender" name="gender"
                               interfaceOptions={customAlertGender}
                               onIonChange={handleFitnessInputChange}>
                        {genderOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select Activity Level" name="activityLevel"
                               interfaceOptions={customAlertActivityLevel}
                               onIonChange={handleFitnessInputChange}>
                        {activityLevelOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select Weight Goal" name="weightGoal"
                               interfaceOptions={customAlertWeightGoal}
                               onIonChange={handleFitnessInputChange}>
                        {weightGoalOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>

                    <IonSelect placeholder="Select Diet Type" name="dietType"
                               interfaceOptions={customAlertDietType}
                               onIonChange={handleFitnessInputChange}
                    >
                        {dietTypeOptions.map((option) => (
                            <IonSelectOption key={option.key} value={option.key}>
                                {option.text}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </div>
                <div style={{width: "100%", display: "flex"}}>
                    <IonButton onClick={handleRegisterClick} style={{margin: "5px auto"}}>Register</IonButton>
                </div>
            </IonContent>

        </IonPage>
    )
}
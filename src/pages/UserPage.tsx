import React, {useState} from "react";
import {IonContent, IonHeader, IonPage, IonToolbar} from "@ionic/react";
import Footer from "../components/Footer";
import {useHistory} from "react-router-dom";


const UserPage: React.FC = () => {

    const [currentIcon, setCurrentIcon] = useState("user")

    const history = useHistory();

    const handleDiaryClick = () => {
        history.push("/diary");
    };

    const handleUserClick = () => {

    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>

                </IonToolbar>
            </IonHeader>
            <IonContent>
                User details
            </IonContent>
            <Footer activeIcon={currentIcon} handleOnDiaryClick={handleDiaryClick} handleUserClick={handleUserClick}/>

        </IonPage>

    )
}

export default UserPage;
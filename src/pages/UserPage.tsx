import React, {useEffect, useState} from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Footer from "../components/Footer";
import {useHistory} from "react-router-dom";
import {UserDetails} from "../types/User.types";
import {requestGetUserDetails} from "../services/actions/userAction";
import {useSelector} from "react-redux";
import {RootState} from "../store";


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
    useEffect(() => {
        requestGetUserDetails(token).then(response => {
            setUserDetails(response.data);
        })

    }, [])

    const capitalize = (s:string) => s && s[0].toUpperCase() + s.slice(1)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle> {userDetails && capitalize(userDetails.username)}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                    {/*{userDetails && userDetails.username}*/}
                </div>

                <div>
                    {userDetails &&
                        <div>Progress
                            <div> Current weight {userDetails.weight} </div>
                            <div>Goal weight {userDetails.weightGoal} </div>
                        </div>
                    }
                </div>

                <div>
                    {userDetails &&
                        <div>
                            <div>Current weight {userDetails.weight} </div>
                            <div>Current Height {userDetails.height} </div>
                        </div>


                    }


                </div>
            </IonContent>
            <Footer activeIcon={currentIcon} handleOnDiaryClick={handleDiaryClick} handleUserClick={handleUserClick}/>

        </IonPage>

    )
}

export default UserPage;
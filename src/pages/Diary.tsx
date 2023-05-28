import DiaryMealComponent from "../components/DiaryMealComponent";
import {
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonPage,
    IonRippleEffect,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {requestGetDiaryDayMeals} from "../services/actions/diaryDayAction";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {diaryDayReduce, RootState} from "../store";
import {addDays, format, subDays} from 'date-fns';
import "../assets/styles/diary-page.scss"
import CalorieGoalComponent from "../components/CalorieGoalComponent";
import Footer from "../components/Footer";
import '../assets/styles/footer.scss'

import {useHistory} from "react-router-dom";
import {
    bookOutline,
    bookSharp,
    caretBackCircleSharp,
    caretForwardCircleSharp,
    personOutline,
    personSharp
} from "ionicons/icons";

const DiaryPage: React.FC = () => {
    const dispatch = useDispatch();
    const diaryDay = useSelector((state: RootState) => state.diaryDay);
    const {token} = useSelector((state: RootState) => state.login)
    const [currentDay, setCurrentDay] = useState(new Date());
    useEffect(() => {
        // Set the initial day to the current date when the component mounts
        setCurrentDay(new Date());
    }, []);

    const handlePreviousDayClick = () => {
        // Go back one day
        setCurrentDay(subDays(currentDay, 1));
    };

    const handleNextDayClick = () => {
        // Go forward one day
        setCurrentDay(addDays(currentDay, 1));
    };

    // const handleGetDiaryDayMeals = async (diaryDayDate: string, token: string) => {
    //     return await requestGetDiaryDayMeals(diaryDayDate, token);
    // }

    useEffect(() => {
        requestGetDiaryDayMeals(currentDay.toISOString().slice(0, 10), token)
            .then((r) => {
                if (r.data) {
                    dispatch(diaryDayReduce(r.data))
                }
            })
            .catch(err => console.log("Error" + err))

    }, [currentDay])
    const history = useHistory();

    const handleUserClick = () => {
        console.log("Diary handle user click")
        history.push("/user");
    };

    console.log("Render diary page")

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="day-scrolling">
                    <IonButtons slot="start">
                        <IonIcon icon={caretBackCircleSharp} size="large" onClick={handlePreviousDayClick}></IonIcon>
                    </IonButtons>
                    <IonTitle className="center-toolbar-title">{format(currentDay, 'EEEE,  MMMM d')}</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon icon={caretForwardCircleSharp} size="large" onClick={handleNextDayClick}></IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CalorieGoalComponent/>
                <div>
                    {
                        diaryDay ?
                            (<>
                                </>
                            ) :
                            <p>Loading Diary Page</p>
                    }
                    {
                        diaryDay ?
                            diaryDay.mealDTOList.map(mealFoodProps =>
                                <DiaryMealComponent key={mealFoodProps.mealId}
                                                    mealId={mealFoodProps.mealId}
                                                    mealName={mealFoodProps.mealName}
                                                    foodList={mealFoodProps.foodList}
                                                    diaryDay={currentDay.toISOString().slice(0, 10)}
                                />
                            ) :
                            <p>Loading Meals Page</p>
                    }

                </div>
            </IonContent>
            {/*<Footer activeIcon={currentIcon} handleOnDiaryClick={() => {}} handleUserClick={handleUserClick}/>*/}
            <IonFooter>
                <IonToolbar>
                    <div className="footer">
                        <div onClick={() => {
                        }} className="footer-nav ion-activatable ripple-parent">
                            <IonIcon icon={bookSharp}/>
                            <span>Diary</span>
                            <IonRippleEffect/>

                        </div>
                        <div onClick={handleUserClick} className="footer-nav ion-activatable ripple-parent">
                            <IonIcon icon={personOutline}/>
                            <span>Me</span>
                            <IonRippleEffect/>
                        </div>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default DiaryPage;
import DiaryMealComponent from "../components/DiaryMealComponent";
import {IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {requestGetDiaryDayMeals} from "../services/actions/diaryDayAction";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {diaryDayReduce, RootState} from "../store";
import {format, addDays, subDays} from 'date-fns';
import "../assets/styles/diary-page.scss"

const DiaryPage: React.FC = () => {
    const dispatch = useDispatch();
    const diaryDay = useSelector((state: RootState) => state.diaryDay);

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

    const handleGetDiaryDayMeals = async (diaryDayDate: string) => {
        return await requestGetDiaryDayMeals(diaryDayDate);
    }

    useEffect(() => {
        handleGetDiaryDayMeals(currentDay.toISOString().slice(0, 10))
            .then((r) => {
                if (r.data) {
                    console.log(r.data)
                    dispatch(diaryDayReduce(r.data))
                }
            })
            .catch(err => console.log("Error" + err))

    }, [currentDay])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar  className = "day-scrolling">
                    <IonButtons slot="start">
                        <IonButton onClick={handlePreviousDayClick}>Previous</IonButton>
                    </IonButtons>
                    <IonTitle className = "center-toolbar-title">{format(currentDay, 'EEEE,  MMMM d')}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleNextDayClick}>Next</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                                                    foodList={mealFoodProps.foodList}/>
                            ) :
                            <p>Loading Meals Page</p>
                    }

                </div>
            </IonContent>
        </IonPage>
    );
};

export default DiaryPage;
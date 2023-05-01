import MealComponent from "../components/MealComponent";
import {IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {DiaryDayMealFood, MealFood} from "./MealFood.types";
import {requestGetDiaryDayMeals} from "../services/actions/diaryDayAction";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {diaryDayReduce, RootState} from "../store";
import {format, addDays, subDays} from 'date-fns';


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

    const handleGetDiaryDayMealsHandle = async (diaryDayDate: string) => {
        return await requestGetDiaryDayMeals(diaryDayDate);
    }

    useEffect(() => {
        handleGetDiaryDayMealsHandle(currentDay.toISOString().slice(0, 10))
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
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={handlePreviousDayClick}>Previous Day</IonButton>
                    </IonButtons>
                    <IonTitle>{format(currentDay, 'EEEE, MMMM d, yyyy')}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleNextDayClick}>Next Day</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>
                    <h1>Diary Page</h1>
                    {
                        diaryDay ?
                            (<>
                                    <p> {diaryDay.diaryDayId} </p>
                                    {/*<p> {diaryDay.} </p>*/}
                                </>

                            ) :
                            <p>Loading Diary Page</p>
                    }
                    <h2>Today's Meals</h2>
                    {
                        diaryDay ?
                            diaryDay.mealDTOList.map(mealFoodProps =>
                                <MealComponent key={mealFoodProps.mealId}
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
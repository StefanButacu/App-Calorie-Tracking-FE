import MealComponent from "../components/MealComponent";
import {IonPage} from "@ionic/react";
import {DiaryDayMealFood, MealFood} from "./MealFood.types";
import {getDiaryDayMeals} from "../services/actions/diaryDayAction";
import React, {useEffect, useState} from "react";


const DiaryPage: React.FC = () => {

    console.log("diary page");
    const [diaryDay, setDiaryDay] = useState<DiaryDayMealFood>();

    const handleGetDiaryDayMealsHandle = async (diaryDayDate: string) => {
        return await getDiaryDayMeals(diaryDayDate);
    }
    const day = '2011-12-03'

    useEffect(() => {
        handleGetDiaryDayMealsHandle(day)
            .then((r) => {
                console.log("diary-day", r.data)
                setDiaryDay(r.data)
            })
            .catch(err => console.log("Error" + err))

    }, [])

    return (
        <IonPage>
            <div>
                <h1>Diary Page</h1>
                {
                    diaryDay ?
                        (<>
                                <p> {diaryDay.diaryDayId} </p>
                                <p> {diaryDay.diaryDayDate} </p>
                            </>

                        ) :
                        <p>Loading Diary Page</p>
                }
                <h2>Today's Meals</h2>
                {
                    diaryDay ?
                        diaryDay.mealDTOList.map(mealFoodProps =>
                            <MealComponent key={mealFoodProps.mealId}
                                           mealId = {mealFoodProps.mealId}
                                           mealName={mealFoodProps.mealName}
                                           foodList={mealFoodProps.foodList}/>
                        ) :
                        <p>Loading Meals Page</p>
                }

            </div>
        </IonPage>
    );
};

export default DiaryPage;
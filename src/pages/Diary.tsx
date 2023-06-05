import DiaryMealComponent from "../components/DiaryMealComponent";
import {IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/react";
import {requestGetDiaryDayMeals} from "../services/actions/diaryDayAction";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {diaryDateAdd, diaryDateSub, diaryDayReduce, RootState} from "../store";
import {addDays, format, subDays} from 'date-fns';
import "../assets/styles/diary-page.scss"
import CalorieGoalComponent from "../components/CalorieGoalComponent";
import '../assets/styles/footer.scss'
import {caretBackCircleSharp, caretForwardCircleSharp} from "ionicons/icons";

const DiaryPage: React.FC = () => {
    const dispatch = useDispatch();
    const diaryDay = useSelector((state: RootState) => state.diaryDay);
    const date = useSelector((state: RootState) => state.diaryDay.date);
    const {token} = useSelector((state: RootState) => state.login)
    // useEffect(() => {
    //     // Set the initial day to the current date when the component mounts
    //     setCurrentDay(new Date());
    // }, []);

    const handlePreviousDayClick = () => {
        // Go back one day
        // setCurrentDay(subDays(currentDay, 1));
        const newDate = subDays(new Date(date), 1).toISOString().slice(0, 10)
        console.log("PrevClick" + newDate)
        dispatch(diaryDateSub({date: newDate}))
        handleGetDiaryDayMeals(newDate, token)
    };

    const handleNextDayClick = () => {
        // Go forward one day
        // setCurrentDay(addDays(currentDay, 1));
        const newDate = addDays(new Date(date), 1).toISOString().slice(0, 10)
        dispatch(diaryDateAdd({date: newDate}));
        handleGetDiaryDayMeals(newDate, token)
    };

    const handleGetDiaryDayMeals = (date: string, token: string) => {
        requestGetDiaryDayMeals(date, token)
            .then((r) => {
                if (r.data) {
                    dispatch(diaryDayReduce(r.data))
                }
            })
            .catch(err => console.log("Error" + err))
    }

    useEffect(() => {
        handleGetDiaryDayMeals(date, token);
    }, [])

    return (
        <>
            <IonHeader>
                <IonToolbar className="day-scrolling">
                    <IonButtons slot="start">
                        <IonIcon icon={caretBackCircleSharp} size="large" onClick={handlePreviousDayClick}></IonIcon>
                    </IonButtons>
                    <IonTitle className="center-toolbar-title">{format(new Date(date), 'EEEE,  MMMM d')}</IonTitle>
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
                                                    diaryDay={date}
                                />
                            ) :
                            <p>Loading Meals Page</p>
                    }

                </div>
            </IonContent>
        </>
    );
};

export default DiaryPage;
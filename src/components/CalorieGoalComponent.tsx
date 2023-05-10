import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {UserDetails} from "../types/User.types";
import {requestGetUserDetails} from "../services/actions/userAction";
import "../assets/styles/calorie-goal.scss"
import {IonProgressBar} from "@ionic/react";


const CalorieGoalComponent: React.FC = () => {

    const diaryDay = useSelector((state: RootState) => state.diaryDay);
    const loginState = useSelector((state: RootState) => state.login);
    const token = loginState.token;
    const [progress, setProgress] = useState(0);
    const [userDetails, setUserDetails] = useState<UserDetails>();


    useEffect(() => {
        requestGetUserDetails(token).then(response => {
            setUserDetails(response.data);
        })

    }, [])


    const totalEatenCalories = diaryDay.mealDTOList.reduce(
        (acc, mealFood) =>
            acc +
            mealFood.foodList.reduce((acc2, food) => {
                return acc2 + food.calories;
            }, 0),
        0
    );
    useEffect( () => {
        if(userDetails) {
            setProgress(totalEatenCalories / userDetails!.calorieGoal);
        }
    }, [userDetails, totalEatenCalories])
    return (<>
        {userDetails ?
            (<div style={{marginTop: "15px", marginRight:"30px"}}>
                <div className={"calorie-remain"}>
                    Calories Remaining
                    <IonProgressBar type="determinate" value={progress} style={{ '--ion-color-custom': '#FF0000' }} className={"calorie-progressbar"} />

                </div>
                <div className={"calorie-goal"}>
                    <div className={"user-calorie"}>
                        {userDetails?.calorieGoal}
                        <p className={"number-type"}>Goal</p>
                    </div>
                    <p> - </p>
                    <div className={"user-calorie"}>
                        {totalEatenCalories}
                        <p className={"number-type"}>Food</p>
                    </div>
                    <p> = </p>
                    <div className={"user-calorie"}>
                        <p className={"number"}> {userDetails?.calorieGoal - totalEatenCalories} </p>
                        <p className={"number-type"}>Remaining</p>
                    </div>
                </div>
            </div>)
            : <></>
        }

    </>)
}

export default CalorieGoalComponent;
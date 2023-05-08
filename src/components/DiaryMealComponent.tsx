import MealItemComponent from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";
import {MealProps} from "../types/MealFood.types";
import React from "react";
import '../assets/styles/meal.scss'

const DiaryMealComponent: React.FC<MealProps> = ({mealName, mealId, foodList, diaryDay}) => {

    const history = useHistory();
    const handleAddFoodClick = () => {
        history.push(`/add-food/${diaryDay}/${mealId}`);
    };
    const totalCalories = foodList.reduce((acc, food) => acc + food.calories, 0);

    return (
        <div className="meals-container">
            <div className="meal">
                <div className="meal-header">
                    <div className="meal-name">{mealName}</div>
                    <div className="meal-calorie"> {totalCalories}</div>
                </div>
                <div>
                    {foodList.map((foodWithCalorie, index) => (
                        <MealItemComponent
                            key={index} {...foodWithCalorie}/>
                    ))}
                </div>
            </div>
            <div style={{display: "flex", alignItems:"center"}}>
                <IonLabel onClick={handleAddFoodClick} className="add-food-label">
                    Add food
                </IonLabel>
            </div>
        </div>
    );
};

export default DiaryMealComponent;
import MealItemComponent from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";
import {MealProps} from "../types/MealFood.types";
import React from "react";
import '../assets/styles/meal.scss'

const DiaryMealComponent: React.FC<MealProps> = ({mealName, mealId, foodList, diaryDay}) => {

    const history = useHistory();
    const showListingFoodPage = () => {
        history.push(`/add-food/${diaryDay}/${mealId}`);
    };
    const totalCalories = foodList.reduce((acc, food) => acc + food.calories, 0);

    const showEditFoodPage = (foodId: number) => {
        history.push(`/edit-food/${diaryDay}/${mealId}/${foodId}`);
    }

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
                            key={index} {...foodWithCalorie}
                            handleAction={(foodId) => {
                                console.log("Diary meal click", foodId)
                            }}
                        />
                    ))}
                </div>
            </div>
            <IonLabel onClick={showListingFoodPage} className="add-food-label">
                <p> Add food </p>
            </IonLabel>
        </div>
    );
};

export default DiaryMealComponent;
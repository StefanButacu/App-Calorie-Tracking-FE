import '../assets/styles/meal-item.scss'
import {FoodWithCalorie} from "../types/MealFood.types";
import React from "react";
import TransparentButton from "./TransparentButton";

const MealItemComponent: React.FC<FoodWithCalorie> = ({id, name, quantity, calories}) => {

    // TODO - handle here on click in order
    //  - but have to change the meal item from the diary meal
    // hanlde on mealItemClick
    // from diaryDay -> update or remove
    // from avaialbeFood -> add

    return (
        <div className="meal-item-container">
            <div style={{display: "flex", alignItems:"center"}}>
                <div >
                    <TransparentButton/>
                </div>
                <div>
                    <p className="meal-item-title food-name">{name}</p>
                    <p className="meal-item-subtitle">{quantity} g</p>
                </div>
            </div>
            <div>
                <span className="meal-item-calorie">{calories}</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
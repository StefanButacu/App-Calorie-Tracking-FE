import '../assets/styles/meal-item.scss'
import {FoodWithCalorie} from "../types/MealFood.types";
import React from "react";

const MealItemComponent: React.FC<FoodWithCalorie> = ({id, name, quantity, calories }) => {

    return (
        <div className="meal-item-container">
            <div>
                <p className="meal-item-title food-name">{name}</p>
                <p className="meal-item-subtitle">{quantity} g</p>
            </div>
            <div>
                <span className="meal-item-calorie">{calories}</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
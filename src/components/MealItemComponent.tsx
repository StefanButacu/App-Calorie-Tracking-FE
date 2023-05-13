import '../assets/styles/meal-item.scss'
import {FoodWithCalorie} from "../types/MealFood.types";
import React from "react";

const MealItemComponent: React.FC<FoodWithCalorie> = ({id, name, quantity, calories, handleAction}) => {
    return (
        <div className="meal-item-container" onClick={() => {
            if (handleAction)
                handleAction(id)
        }
        }>
            <div style={{display: "flex", alignItems: "center"}}>
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
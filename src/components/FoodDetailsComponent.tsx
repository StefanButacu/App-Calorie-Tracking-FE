import React, {useState} from "react";
import {FoodDetailsProps} from "../types/FoodDetails.types";
import '../assets/styles/food.scss'
import {Food} from "../types/MealFood.types";

const FoodDetailsComponent: React.FC<Food> = ({ id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {
    return (
        <>
            <div>
                <div className="food-name">{name}</div>
                </div>
        </>
    )


}

export default FoodDetailsComponent;
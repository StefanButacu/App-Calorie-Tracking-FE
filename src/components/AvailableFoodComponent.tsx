import {Food} from "../types/MealFood.types";
import MealItemComponent from "./MealItemComponent";
import {calculateCaloriesForQuantity} from "../services/utils";
import React from "react";

const AvailableFoodComponent: React.FC<Food> = ({id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {
    const quantity = 100.0;
    return (
        <>
            <MealItemComponent id={id} handleAction={(foodId) => {
                console.log("available food" + foodId)
                // history.push(`/add-food/${diaryDay}/${mealId}/${foodId}`)
            }}
                               name={name}
                               quantity={quantity}
                               calories={calculateCaloriesForQuantity(protein, carbohydrate, lipid, quantity)}/>
        </>
    )
}

export default AvailableFoodComponent;
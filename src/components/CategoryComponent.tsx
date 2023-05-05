import React, {useEffect, useState} from "react";
import {getCategory} from "../services/actions/categoryAction";
import {Food} from "../types/MealFood.types";
import {requestGetFoodDetails} from "../services/actions/foodAction";
import {CategoryComponentProps} from "../types/Category.types";
import AvailableFoodComponent from "./AvailableFoodComponent";
import "../assets/styles/food.scss"

// TODO - replace category_id with food_id
const CategoryComponent: React.FC<CategoryComponentProps> = ({
                                                                 mealId,
                                                                 category_id,
                                                                 category_color,
                                                                 onAddFoodToMealClick
                                                             }) => {
    let [food, setFood] = useState<Food>();

    const getCategoryHandle = async (category_id: number) => {
        return await getCategory(category_id)
    }

    const getFoodHandle = async (food_id: number) => {
        return await requestGetFoodDetails(food_id)
    }

    const handleAddToMealClick = (selectedQuantity: number) => {
        if (onAddFoodToMealClick) {
            onAddFoodToMealClick(category_id, selectedQuantity);
        }
    };


    useEffect(() => {
        getCategoryHandle(category_id)
            .then((r) => {
                getFoodHandle(category_id).then((foodResponse) => {
                    if (foodResponse.status === 200) {
                        setFood({...foodResponse.data, onAddFoodToMealClick: handleAddToMealClick})
                    } else {
                        console.log("Error response")
                    }
                }).catch(err => console.log("Food handle err", err))
            })
            .catch(err => console.log("Error" + err))
    }, []);

    const rgbColor = `rgb(${category_color[0]}, ${category_color[1]}, ${category_color[2]})`;
    return (

        <>{
            food ?
                (<div style={{display: "flex", alignItems: "center"}}>
                    <div
                        style={{
                            backgroundColor: rgbColor,
                            borderRadius: "50%",
                            height: "1rem",
                            width: "1rem",
                            marginRight: "0.5rem",
                        }}
                    ></div>
                    <AvailableFoodComponent {...food!} />
                </div>)
                : <></>
        }
        </>
    )
}

export default CategoryComponent;
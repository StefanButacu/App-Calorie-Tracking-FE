import React, {useEffect, useState} from "react";
import {getCategory} from "../services/actions/categoryAction";
import {Food} from "../types/MealFood.types";
import {requestGetFoodDetails} from "../services/actions/foodAction";
import {CategoryComponentProps} from "../types/Category.types";
import "../assets/styles/food.scss"
import MealItemComponent from "./MealItemComponent";
import {calculateCaloriesForQuantity} from "../services/utils";
import {useHistory, useParams} from "react-router";
import {RouteParams} from "../pages/ListingFoodPage";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const CategoryComponent: React.FC<CategoryComponentProps> = ({
                                                                 mealId,
                                                                 categoryId,
                                                                 categoryColor,
                                                                 onAddFoodToMealClick
                                                             }) => {
    const {diaryDay} = useParams<RouteParams>()
    const quantity = 100.0;
    const history = useHistory();
    const loginState = useSelector((state: RootState) => state.login);
    const token = loginState.token;
    let [food, setFood] = useState<Food>();

    const getCategoryHandle = async (categoryId: number) => {
        return await getCategory(categoryId)
    }

    const getFoodHandle = async (food_id: number) => {
        return await requestGetFoodDetails(food_id, token)
    }

    const handleAddToMealClick = (selectedQuantity: number) => {
        if (onAddFoodToMealClick) {
            onAddFoodToMealClick(categoryId, selectedQuantity);
        }
    };


    useEffect(() => {
        getCategoryHandle(categoryId)
            .then((r) => {
                getFoodHandle(categoryId).then((foodResponse) => {
                    if (foodResponse.status === 200) {
                        setFood({...foodResponse.data, onAddFoodToMealClick: handleAddToMealClick})
                    } else {
                        console.log("Error response")
                    }
                }).catch(err => console.log("Food handle err", err))
            })
            .catch(err => console.log("Error" + err))
    }, []);

    const rgbColor = `rgb(${categoryColor[0]}, ${categoryColor[1]}, ${categoryColor[2]})`;
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
                    <div style={{width: "100%"}}>
                        <MealItemComponent key={food!.id}
                                           id={food!.id}
                                           handleAction={(foodId) => {
                            history.push(`/add-food/${diaryDay}/${mealId}/${foodId}`)
                        }}
                                           name={food.name}
                                           quantity={quantity}
                                           calories={calculateCaloriesForQuantity(food.protein, food.carbohydrate, food.lipid, quantity)}/>


                    </div>
                </div>)
                : <></>
        }
        </>
    )
}

export default CategoryComponent;
import axios from "axios";
import {FoodQuantity} from "../../pages/MealFood.types";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestPostFoodToMeal = (mealId: string, foodId: number, quantity: number) => {
    const foodQuantity: FoodQuantity = {
        foodId,
        quantity
    }
    return axios.post(baseURL + `/api/diary/meal/${mealId}/food`, foodQuantity)
}

export const postFoodToMeal = (mealId: string, foodId: number, quantity: number) => {
    return function (dispatch: any) {
        return requestPostFoodToMeal(mealId, foodId, quantity).then(response => dispatch(successPostFoodToMeal(response)))
    }
}


export function successPostFoodToMeal(response: any) {
    if(response.status === 201 || response.status === 200) {
        return {
            type: "foodAddedToMeal"
        }
    }else {
        console.log("ERROR POST FOOD TO MEAL");
        return {type: "ERROR"}
    }

}

export const requestGetDiaryDayMeals = (diaryDayDate: string) => {
    return axios.get(baseURL + `/api/diary/${diaryDayDate}`)
}

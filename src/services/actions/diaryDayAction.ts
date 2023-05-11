import axios from "axios";
import {FoodQuantity} from "../../types/MealFood.types";
import {authConfig} from "./index";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestPostFoodToMeal = (date: string, mealId: string, foodId: number, quantity: number, token: string) => {
    quantity = Math.floor(quantity * 100) / 100;
    const foodQuantity: FoodQuantity = {
        foodId,
        quantity,
    }
    return axios.post(baseURL + `/api/diary/${date}/meal/${mealId}/food`, foodQuantity, authConfig(token))
}
//
// export const postFoodToMeal = (date: string, mealId: string, foodId: number, quantity: number) => {
//     return function (dispatch: any) {
//         return requestPostFoodToMeal(date, mealId, foodId, quantity).then(response => dispatch(successPostFoodToMeal(response)))
//     }
// }


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

export const requestGetDiaryDayMeals = (diaryDayDate: string, token: string) => {
    return axios.get(baseURL + `/api/diary/${diaryDayDate}`, authConfig(token))
}

import axios from "axios";
import {FoodQuantity} from "../../pages/MealFood.types";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const postFoodToMeal = ( mealId: string, foodId: number, quantity: number) => {
    const foodQuantity: FoodQuantity = {
        foodId,
        quantity
    }
    return axios.post(baseURL + `/api/diary/meal/${mealId}/food`, foodQuantity)
}


export const getDiaryDayMeals = (diaryDayDate: string) => {
    return axios.get(baseURL + `/api/diary/${diaryDayDate}`)
}

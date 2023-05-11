import axios from "axios";
import {FoodQuantity} from "../../types/MealFood.types";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestGetFoodDetails = (foodId: number) => {
    return axios.get(baseURL + `/api/food/${foodId}`)
}

export const requestGetAvailableFoods = (page: number) => {
    return axios.get(baseURL + `/api/food/foods?page=${page}`)
}

export const requestGetFoodsByName = (searchFoodName: string) => {
    return axios.get(baseURL + `/api/food/foods/search?name=${searchFoodName}`)
}

export const requestDeleteFoodFormMeal = (diaryDay: string, mealId: string, foodId: string, token: string) => {
    const params = {date: diaryDay, meal: mealId, food: foodId};
    return axios.delete(baseURL + `/api/diary/food`, {
        headers: {
            Authorization: `${token}`,
        },
        params: params,
    })
}

export const requestGetFoodFromMeal = (diaryDay: string, mealId: string, foodId: string, token: string) => {
    const params = {date: diaryDay, meal: mealId, food: foodId};
    return axios.get(baseURL + `/api/diary/food`, {
        headers: {
            Authorization: `${token}`,
        },
        params: params,
    })
}

export const requestUpdateFoodFromMeal = (diaryDay: string, mealId: string, foodId: number, quantity: number, token: string) => {
    quantity = Math.floor(quantity * 100) / 100;

    const params = {date: diaryDay, meal: mealId, food: foodId};
    const foodQuantity: FoodQuantity = {
        foodId,
        quantity
    }
    return axios.put(baseURL + `/api/diary/food`, foodQuantity,{
        headers: {
            Authorization: `${token}`,
        },
        params: params,
    })
}

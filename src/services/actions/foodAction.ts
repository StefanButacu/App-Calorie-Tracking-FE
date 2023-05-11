import axios from "axios";
import {authConfig} from "./index";
import {diarySlice} from "../../store";

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


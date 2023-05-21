import axios from "axios";
import {FoodQuantity} from "../../types/MealFood.types";
import {authConfig, baseURL} from "./index";


export const requestGetFoodDetails = (foodId: number, token: string) => {
    return axios.get(baseURL + `/api/food/${foodId}`, authConfig(token))
}

export const requestGetAvailableFoods = (page: number, token:string) => {
    return axios.get(baseURL + `/api/food/foods?page=${page}`, authConfig(token))
}

export const requestGetFoodsByName = (searchFoodName: string, token:string) => {
    return axios.get(baseURL + `/api/food/foods/search?name=${searchFoodName}`, authConfig(token))
}

export const requestDeleteFoodFormMeal = (diaryDay: string, mealId: string, foodId: string, token: string) => {
    const params = {date: diaryDay, meal: mealId, food: foodId};
    return axios.delete(baseURL + `/api/diary/food`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params,
    })
}

export const requestGetFoodFromMeal = (diaryDay: string, mealId: string, foodId: string, token: string) => {
    const params = {date: diaryDay, meal: mealId, food: foodId};
    return axios.get(baseURL + `/api/diary/food`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
    return axios.put(baseURL + `/api/diary/food`, foodQuantity, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params,
    })
}

export const requestPostFood = (name: string, protein: number, carbohydrate: number, lipid: number, token: string) => {
    const params = {name: name, protein: protein, carbohydrate: carbohydrate, lipid: lipid};
    return axios.post(baseURL + `/api/food`, params, authConfig(token));

}

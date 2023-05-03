import axios from "axios";

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
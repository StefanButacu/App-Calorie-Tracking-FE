import axios from "axios";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestGetMeal = (mealId: string) => {
    return axios.get(baseURL + `/api/meal/${mealId}`)
}

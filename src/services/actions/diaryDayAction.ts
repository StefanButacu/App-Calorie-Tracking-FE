import axios from "axios";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

// TODO - diaryDay might not be needed.
export const addFoodToDiaryDayMeal = (diaryDayId: number, mealId: number, foodId: number) => {
    return axios.post(baseURL + `/api/diary/${diaryDayId}/meal/{mealId}/food/{foodId}`)
}


export const getDiaryDayMeals = (diaryDayDate: string) => {
    return axios.get(baseURL + `/api/diary/${diaryDayDate}`)
}

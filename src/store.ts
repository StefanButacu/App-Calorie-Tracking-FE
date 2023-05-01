import { configureStore } from '@reduxjs/toolkit'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DiaryDayMealFood, Food, FoodWithCalorie, MealFood} from "./pages/MealFood.types";
import { loggingMiddleware} from "./reducers/loggingMiddleware";

interface State {
    isLoading: boolean,
    diaryDayId: number,
    mealDTOList: MealFood[];
}


const initialState: State = {
    isLoading: false,
    diaryDayId: 0,
    mealDTOList: []
}


export const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        diaryDayReduce: (state, action: PayloadAction<DiaryDayMealFood>) => {
            return  {...action.payload, isLoading: false}

        },
        addFoodReduce: (state, action: PayloadAction<{ mealId: number, food: FoodWithCalorie }>) => {
            const { mealId, food } = action.payload;

            // Find the meal in the mealDTOList array
            const mealIndex = state.mealDTOList.findIndex(m => m.mealId === mealId);

            if (mealIndex === -1) {
                // If the meal doesn't exist, create a new MealFood object and add it to the mealDTOList array
                state.mealDTOList.push({ mealId, mealName: '', foodList: [food] });
            } else {
                // If the meal exists, add the food to its foodList array
                state.mealDTOList[mealIndex].foodList.push(food);
            }
        },

    },


})
export const {diaryDayReduce, addFoodReduce} = diarySlice.actions

export const store = configureStore({
    reducer: {
        diaryDay: diarySlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;

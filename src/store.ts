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
            // Find the index of the meal in mealDTOList based on mealId
            const mealIndex = state.mealDTOList.findIndex(m => m.mealId === mealId);
            if (mealIndex !== -1) {
                // Find the index of the food in foodList based on id
                const foodIndex = state.mealDTOList[mealIndex].foodList.findIndex(f => f.id === food.id);
                if (foodIndex !== -1) {
                    // Update the quantity and calories of the existing food
                    const existingFood = state.mealDTOList[mealIndex].foodList[foodIndex];
                    existingFood.quantity += food.quantity;
                    existingFood.calories += food.calories;
                } else {
                    // Add the new food to the meal
                    const foodWithCalorie: FoodWithCalorie = {
                        id: food.id,
                        name: food.name,
                        quantity: food.quantity,
                        calories: food.calories
                    };
                    state.mealDTOList[mealIndex].foodList.push(foodWithCalorie);
                }
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

import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DiaryDayMealFood, FoodWithCalorie, MealFood} from "./types/MealFood.types";
import {loggingMiddleware} from "./reducers/loggingMiddleware";

interface State {
    isLoading: boolean,
    mealDTOList: MealFood[]
    token: string
    isAuthenticated: boolean,
    date: string,
}
const today = new Date().toISOString().slice(0, 10)
const initialState: State = {
    isLoading: false,
    mealDTOList: [],
    token: '',
    isAuthenticated: false,
    date: today,
}


export const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        diaryDateSub: (state, action: PayloadAction<{ date:string }>) => {
            state.date = action.payload.date;
        },
        diaryDateAdd: (state, action: PayloadAction<{ date:string }>) => {
            state.date = action.payload.date;
        },
        diaryDayReduce: (state, action: PayloadAction<DiaryDayMealFood>) => {
            state.date = action.payload.diaryDay;
            state.mealDTOList = action.payload.mealDTOList;
        },
        addFoodReduce: (state, action: PayloadAction<{ mealId: number, food: FoodWithCalorie }>) => {
            const {mealId, food} = action.payload;
            // Find the index of the meal in mealDTOList based on mealId
            const mealIndex = state.mealDTOList.findIndex(m => m.mealId === mealId);
            if (mealIndex !== -1) {
                // Find the index of the food in foodList based on id
                const foodIndex = state.mealDTOList[mealIndex].foodList.findIndex(f => f.id === food.id);
                if (foodIndex !== -1) {
                    // Update the quantity and calories of the existing food
                    const existingFood = state.mealDTOList[mealIndex].foodList[foodIndex];
                    existingFood.quantity = Math.floor(existingFood.quantity + food.quantity);
                    existingFood.calories += food.calories;
                } else {
                    // Add the new food to the meal
                    const foodWithCalorie: FoodWithCalorie = {
                        id: food.id,
                        name: food.name,
                        quantity: Math.floor(food.quantity),
                        calories: food.calories
                    };
                    state.mealDTOList[mealIndex].foodList.push(foodWithCalorie);
                }
            }
        },
        removeFoodReduce: (state, action: PayloadAction<{ mealId: number, foodId: number }>) => {
            state.mealDTOList = state.mealDTOList.map(meal => {
                if (meal.mealId === action.payload.mealId) {
                    // Remove the food with the given foodId
                    const updatedFoodList = meal.foodList.filter(food => food.id !== action.payload.foodId);
                    // Return the updated meal with the filtered food list
                    return {...meal, foodList: updatedFoodList};
                }
                // Return the unchanged meal
                return meal;
            })
        },
        updateFoodFromMealReduce: (state, action: PayloadAction<{ mealId: number, foodId: number, quantity: number, calories: number }>) => {
            // Find the meal in mealDTOList based on mealId
            const {mealId, foodId, quantity, calories} = action.payload;
            const meal = state.mealDTOList.find(m => m.mealId === mealId);
            if (meal) {
                // Find the food item in foodList based on foodId
                const foodItem = meal.foodList.find(f => f.id === foodId);
                if (foodItem) {
                    // Update the calories of the food item to the given calorie parameter
                    foodItem.calories = calories;
                    foodItem.quantity = quantity;
                }
            }
        }
    },
})
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginReduce: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logoutReduce: (state) => {
            state.token = '';
            state.isAuthenticated = false;
        }
    }
})


export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingReduce: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading;
        },

    }
})

export const {
    diaryDateAdd,
    diaryDateSub,
    diaryDayReduce,
    addFoodReduce,
    removeFoodReduce,
    updateFoodFromMealReduce
} = diarySlice.actions;
export const {loginReduce, logoutReduce} = loginSlice.actions;
export const {loadingReduce} = loadingSlice.actions;


export const store = configureStore({
    reducer: {
        diaryDay: diarySlice.reducer,
        login: loginSlice.reducer,
        loading: loadingSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;

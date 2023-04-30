export interface DiaryDayMealFood {
    diaryDayId: number,
    diaryDayDate: string,
    mealDTOList: MealFood[];
}

export interface MealFood {
    mealId: number,
    mealName: string;
    foodList: Food[]
}

export interface Food {
    id: number,
    name: string,
    protein: number,
    carbohydrate: number,
    lipid: number,
    onAddFoodToMealClick?: (foodId: number, quantity:number) => any;
}


export interface FoodQuantity {
    foodId: number;
    quantity: number;
}
// FoodDetails with nutrition values for 100 grams
// FoodFromMeal - to display name and total calories FoodDetail.proteine * 100 / Quantity


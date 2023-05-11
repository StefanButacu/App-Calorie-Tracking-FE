export interface DiaryDayMealFood {
    diaryDayDate: string,
    mealDTOList: MealFood[];
}

export interface MealFood {
    mealId: number,
    mealName: string;
    foodList: FoodWithCalorie[]
}
export interface MealProps {
    diaryDay: string,
    mealName: string,
    mealId: number,
    foodList: FoodWithCalorie[];
}

export interface MealDetailsProps {
    id: string,
    name: number,
}

export interface Food {
    id: number,
    name: string,
    protein: number,
    carbohydrate: number,
    lipid: number,
    onAddFoodToMealClick?: (diaryDayDate: string, mealId: string, foodId: number, quantityId: number, token: string) => any;
}


export interface FoodWithCalorie {
    id: number,
    name: string,
    quantity: number,
    calories: number,
    handleAction?: (foodId: number) => void
}


export interface FoodQuantity {
    foodId: number;
    quantity: number;
}

export interface FoodUpdate {
    id?: number,
    name?:string,
    proteinPerCent?: number,
    carbohydratePerCent?: number,
    lipidPerCent?: number,
    quantity?: number,
}

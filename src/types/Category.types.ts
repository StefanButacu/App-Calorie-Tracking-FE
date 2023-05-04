export interface CategoryProps {
    category_id: number
    category_color: number[]
    onAddFoodToMealClick?: (foodId: number, quantity: number) => any;
}

export interface CategoryComponentProps extends CategoryProps {
    mealId: number;
}
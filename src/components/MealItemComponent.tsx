import '../assets/styles/meal-item.css'
import {FoodWithCalorie} from "../pages/MealFood.types";

const MealItemComponent: React.FC<FoodWithCalorie> = ({id, name, quantity, calories }) => {

    return (
        <div className="meal-item-container">
            <div>
                <p className="meal-item-title">{id}</p>
                <p className="meal-item-subtitle">{name}</p>
                <p className="meal-item-subtitle">{quantity} g</p>
            </div>
            <div>
                <span className="meal-item-calorie">{calories }</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
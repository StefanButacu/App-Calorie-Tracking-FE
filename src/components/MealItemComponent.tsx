import '../assets/styles/meal-item.css'
import {Food} from "../pages/MealFood.types";

// TODO
//   - difference between MealItem (foodName, servingSize, calories)
//   - FoodItem (name, prot, carbo, lipid, chooseQuantity)
const MealItemComponent: React.FC<Food> = ({id, name, protein, carbohydrate,lipid }) => {

    return (
        <div className="meal-item-container">
            <div>
                <p className="meal-item-title">{id}</p>
                <p className="meal-item-subtitle">{name}</p>
            </div>
            <div>
                <span className="meal-item-calorie">{protein * 4 + carbohydrate * 4 + lipid * 9 }</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
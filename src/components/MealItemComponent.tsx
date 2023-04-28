import '../assets/styles/meal-item.css'
import {Food} from "../pages/MealFood.types";


const MealItemComponent: React.FC<Food> = ({foodId, name, protein, carbohydrate,lipid }) => {

    return (
        <div className="meal-item-container">
            <div>
                <p className="meal-item-title">{foodId}</p>
                <p className="meal-item-subtitle">{name}</p>
            </div>
            <div>
                <span className="meal-item-calorie">{protein * 4 + carbohydrate * 4 + lipid * 9 }</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
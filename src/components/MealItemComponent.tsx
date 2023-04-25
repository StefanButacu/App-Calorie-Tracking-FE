import '../assets/styles/meal-item.css'

export interface MealItemProps {
    name: string
    serving_size: string
    calories: number
}


const MealItemComponent: React.FC<MealItemProps> = ({name, serving_size, calories}) => {

    return (
        <div className="meal-item-container">
            <div>
                <p className="meal-item-title">{name}</p>
                <p className="meal-item-subtitle">{serving_size}</p>
            </div>
            <div>
                <span className="meal-item-calorie">{calories}</span>
            </div>
        </div>
    )
}
export default MealItemComponent;
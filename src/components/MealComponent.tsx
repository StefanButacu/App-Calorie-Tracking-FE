import MealItemComponent from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";
import {Food} from "../pages/MealFood.types";

export interface MealProps {
    mealName: string,
    mealId: number,
    foodList: Food[];
}


const MealComponent: React.FC<MealProps> = ({mealName,mealId, foodList}) => {

    const history = useHistory();

    const handleAddFoodClick = () => {
        console.log("History push")
        history.push(`/add-food/${mealId}`);
    };

    return (
        <div>
            <h2>{mealName}</h2>
            <div>
                {foodList.map((food, index) => (
                    <MealItemComponent
                        key={index} name={food.name}
                        carbohydrate={food.carbohydrate} id={food.id} lipid={food.lipid}
                        protein={food.protein}/>
                ))}
            </div>
            <IonLabel onClick={handleAddFoodClick} style={{cursor: 'pointer', textDecoration: 'underline'}}>
                +Add food
            </IonLabel>
        </div>
    );
};

export default MealComponent;
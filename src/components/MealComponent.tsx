import MealItemComponent from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";
import {Food} from "../pages/MealFood.types";

export interface MealProps {
    title: string;
    foodList: Food[];
}


const MealComponent: React.FC<MealProps> = ({title, foodList}) => {

    const history = useHistory();

    const handleAddFoodClick = () => {
        console.log("History push")
        history.push('/add-food');
    };

    return (
        <div>
            <h2>{title}</h2>
            <div>
                {foodList.map((food, index) => (
                    <MealItemComponent
                        key={index} name={food.name}
                        carbohydrate={food.carbohydrate} foodId={food.foodId} lipid={food.lipid}
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
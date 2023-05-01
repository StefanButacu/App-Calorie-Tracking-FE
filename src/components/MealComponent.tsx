import MealItemComponent from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";
import {Food, MealProps} from "../pages/MealFood.types";
import React from "react";




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
                {foodList.map((foodWithCalorie, index) => (
                    <MealItemComponent
                        key={index} {...foodWithCalorie}/>
                ))}
            </div>
            <IonLabel onClick={handleAddFoodClick} style={{cursor: 'pointer', textDecoration: 'underline'}}>
                +Add food
            </IonLabel>
        </div>
    );
};

export default MealComponent;
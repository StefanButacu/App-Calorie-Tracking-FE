import React, {useState} from "react";
import {IonFabButton, IonIcon, IonInput} from "@ionic/react";
import {addCircleOutline, addSharp, car, settings} from "ionicons/icons";
import {useDispatch} from "react-redux";
import {addFoodReduce} from "../store";
import {FoodDetailsProps} from "./FoodDetails.types";
import '../assets/styles/food.scss'

const FoodDetailsComponent: React.FC<FoodDetailsProps> = ({mealId, id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {


    return (
        <>
            <div>FoodDetails</div>
            <div>
                <div className="food-name">{name}</div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <p style={{textAlign: "left"}}>
                        Serving size
                    </p>
                    {/*something to change the number of servings */}

                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <p style={{textAlign: "left"}}>
                        Number of servings
                    </p>
                </div>
            </div>
        </>
    )


}

export default FoodDetailsComponent;
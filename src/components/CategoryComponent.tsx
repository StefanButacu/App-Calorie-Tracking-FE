import React, {useEffect, useState} from "react";
import {getCategory} from "../services/actions/categoryAction";
import {IonFabButton, IonIcon, IonModal} from "@ionic/react";
import {addCircleOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import FoodDetailsComponent from "./FoodDetailsComponent";
import {Food} from "../pages/MealFood.types";
import {requestGetFoodDetails} from "../services/actions/foodAction";


export interface CategoryProps {
    category_id: number
    category_color: number[]
    onAddFoodToMealClick?: (foodId: number, quantity: number) => any;
}

interface CategoryComponentProps extends CategoryProps {
    mealId: number;
}


// TODO - replace category_id with food_id
const CategoryComponent: React.FC<CategoryComponentProps> = ({
                                                                 mealId,
                                                                 category_id,
                                                                 category_color,
                                                                 onAddFoodToMealClick
                                                             }) => {
    let [food, setFood] = useState<Food>();
    let [categoryName, setCategoryName] = useState();
    const [showModal, setShowModal] = useState(false);


    const handleModalClick = () => {
        setShowModal((prevState) => !prevState);
    };


    const getCategoryHandle = async (category_id: number) => {
        return await getCategory(category_id)
    }

    const getFoodHandle = async (food_id: number) => {
        return await requestGetFoodDetails(food_id)
    }


    useEffect(() => {
        getCategoryHandle(category_id)
            .then((r) => {
                setCategoryName(r.data.category)
                getFoodHandle(category_id).then((foodResponse) => {
                    if (foodResponse.status === 200) {
                        setFood(foodResponse.data)
                    } else {
                        console.log("Error reponse")
                    }
                })
            })
            .catch(err => console.log("Error" + err))

    }, [])


    const rgbColor = `rgb(${category_color[0]}, ${category_color[1]}, ${category_color[2]})`;
    return (
        <>
            <IonModal isOpen={showModal}>
                <FoodDetailsComponent mealId={mealId} {...food as Food} onAddFoodToMealClick={(...args) => {
                    if (onAddFoodToMealClick) {
                        onAddFoodToMealClick(...args);
                    }
                    setShowModal(false);
                }}/>
                <IonFabButton onClick={handleModalClick}>
                    <IonIcon icon={addCircleOutline}></IonIcon>
                </IonFabButton>
            </IonModal>
            <div style={{backgroundColor: rgbColor, width: '100px', height: '100px'}}>
                {category_id}
                {
                    categoryName ?
                        (<p>
                            {categoryName}
                            <IonFabButton onClick={handleModalClick}>
                                <IonIcon icon={addCircleOutline}></IonIcon>
                            </IonFabButton>
                        </p>) :
                        <></>
                }

            </div>
        </>
    )
}
export default CategoryComponent;
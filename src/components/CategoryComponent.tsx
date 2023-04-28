import React, {useEffect, useState} from "react";
import {getCategory} from "../services/actions/categoryAction";
import {IonFabButton, IonIcon} from "@ionic/react";
import {addCircleOutline} from "ionicons/icons";


export interface CategoryProps {
    category_id: number
    category_color: number[]
    onAddFoodToMealClick?: (foodId: number) => any;
}

const CategoryComponent: React.FC<CategoryProps> = ({category_id, category_color, onAddFoodToMealClick}) => {
    let [categoryName, setCategoryName] = useState();

    const handleClick = () => {

        if (onAddFoodToMealClick) {
            onAddFoodToMealClick(category_id);
        }
    }
    const getCategoryHandle = async (category_id: number) =>{
        return await getCategory(category_id)
    }

    useEffect(() => {
        getCategoryHandle(category_id)
            .then((r) => {
                setCategoryName(r.data.category)
            })
            .catch(err => console.log("Error" + err))

    }, [])


    const rgbColor = `rgb(${category_color[0]}, ${category_color[1]}, ${category_color[2]})`;
    return (
        <div style={{backgroundColor: rgbColor, width: '100px', height: '100px'}}>
            {category_id}
            {
                categoryName ?
                    (<p>
                        {categoryName}
                        <IonFabButton onClick = {handleClick} >
                            <IonIcon icon={addCircleOutline}></IonIcon>
                        </IonFabButton>
                    </p>) :
                    <></>
            }

        </div>
    )
}
export default CategoryComponent;
import MealItemComponent, {MealItemProps} from "./MealItemComponent";
import {useHistory} from "react-router";
import {IonLabel} from "@ionic/react";

export interface MealProps {
    title: string;
    menuItems: MealItemProps[];
}


const MealComponent: React.FC<MealProps> = ({title, menuItems}) => {

    const history = useHistory();

    const handleAddFoodClick = () => {
        console.log("History push")
        history.push('/add-food');
    };

    return (
        <div>
            <h2>{title}</h2>
            <div>
                {menuItems.map((menuItem, index) => (
                    <MealItemComponent
                        key={index} name={menuItem.name}
                        serving_size={menuItem.serving_size}
                        calories={menuItem.calories}
                    />
                ))}
            </div>
            <IonLabel onClick={handleAddFoodClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                +Add food
            </IonLabel>
        </div>
    );
};

export default MealComponent;
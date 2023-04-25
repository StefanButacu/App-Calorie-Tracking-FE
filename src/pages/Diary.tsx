import {MealItemProps} from "../components/MealItemComponent";
import MealComponent from "../components/MealComponent";
import {IonPage} from "@ionic/react";

const DiaryPage: React.FC = () => {
    const breakfastItems: MealItemProps[] = [
        {name: 'Pancakes', serving_size: 'Delicious pancakes', calories: 1},
        {name: 'Scrambled Eggs', serving_size: 'Fluffy scrambled eggs', calories: 2},
    ];

    const lunchItems: MealItemProps[] = [
        {name: 'BLT Sandwich', serving_size: 'Classic sandwich', calories: 3},
        {name: 'Grilled Chicken Salad', serving_size: 'Healthy choice', calories: 4},
    ];

    const dinnerItems: MealItemProps[] = [
        {name: 'Grilled Salmon', serving_size: 'Tasty salmon fillet', calories: 5},
        {name: 'Steak', serving_size: 'Juicy sirloin steak', calories: 6},
    ];

    return (
        <IonPage>
            <div>
                <h1>Diary Page</h1>
                <h2>Today's Meals</h2>
                <MealComponent title="Breakfast" menuItems={breakfastItems}/>
                <MealComponent title="Lunch" menuItems={lunchItems}/>
                <MealComponent title="Dinner" menuItems={dinnerItems}/>
            </div>
        </IonPage>
    );
};

export default DiaryPage;
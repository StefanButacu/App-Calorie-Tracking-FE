import {Food} from "../pages/MealFood.types";

const AvailableFoodComponent: React.FC<Food> = ({id, name}) => {

    return (
        <div>
            <div style={{margin: "50px"}}>Id: {id} || Name: {name}</div>
        </div>
    )
}
export default AvailableFoodComponent;
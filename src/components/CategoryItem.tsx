import React, {useEffect, useState} from "react";
import axios from "axios";


export interface CategoryProps {
    category_label: number
    category_pixels: number[]
}

let baseURL = "http://localhost:5000"
const CategoryItem: React.FC<CategoryProps> = ({category_label, category_pixels}) => {

    let [categoryName, setCategoryName] = useState();

    useEffect(() => {
        axios.get(baseURL + `/category/${category_label}`).then((response) => {
                setCategoryName(response.data.category)
            }
        )
    }, [])

    const [base64Image, setBase64Image] = useState('');
    const rgbColor = `rgb(${category_pixels[0]}, ${category_pixels[1]}, ${category_pixels[2]})`;
    return (
        <div style={{backgroundColor: rgbColor, width: '100px', height: '100px'}}>
            {category_label}
            {
                categoryName ?
                    (<p>
                        {categoryName}

                    </p>) :
                    <p></p>
            }

        </div>
    )
}
export default CategoryItem;
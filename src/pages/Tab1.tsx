// import {IonContent, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
// import './Tab1.css';
// import {useState} from "react";
// import axios from "axios";
// import {add} from "ionicons/icons";
// import CategoryComponent, {CategoryProps} from "../components/CategoryComponent";
// import DiaryPage from "./Diary";
//
// const baseURL = "http://localhost:8080";
//
//
// const Tab1: React.FC = () => {
//
//     let [selectedImage, setSelectedImage] = useState(new Blob());
//     let [base64Image, setBase64Image] = useState('');
//     let [categoryResult, setCategoryResult] = useState<CategoryProps[]>();
//
//     return (
//         <IonPage>
//             <IonHeader>
//                 <IonToolbar>
//                     <IonTitle>Tab 1</IonTitle>
//                 </IonToolbar>
//             </IonHeader>
//             <IonContent fullscreen>
//                 <IonHeader collapse="condense">
//                     <IonToolbar>
//                         <IonTitle size="large">Tab 1</IonTitle>
//                     </IonToolbar>
//                 </IonHeader>
//               <DiaryPage />
//                 <div>
//                     <h1>Upload and Display Image usign React Hook's</h1>
//                     {selectedImage && (
//                         <div>
//                             <img
//                                 alt="not found"
//                                 width={"250px"}
//                                 src={URL.createObjectURL(selectedImage)}
//                             />
//                             <br />
//                         </div>
//                     )}
//
//                     <input
//                         type="file"
//                         name="myImage"
//                         onChange={(event) => {
//                             // @ts-ignore
//                             console.log(event.target.files[0]);
//                             // @ts-ignore
//                             setSelectedImage(event.target.files[0]);
//                         }}
//                     />
//                 </div>
//                 <IonFabButton onClick={() => {
//                     let formData = new FormData();
//                     formData.append('image', selectedImage);
//                     axios.post(baseURL + '/image', Object.fromEntries(formData), {
//                         headers: {
//                             'Content-type': 'multipart/form-data'
//                         }
//                     }).then(r => {
//                         console.log(r)
//                         let result_category_data = r.data.category;
//                         let categoryList: CategoryProps[] = [];
//                         for (const key in result_category_data) {
//                             const category_id = parseInt(key);
//                             const category_color = result_category_data[key];
//                             categoryList.push({
//                                 category_id,
//                                 category_color,
//                             });
//                         }
//                         setCategoryResult(categoryList)
//                         const base64ImageString = r.data.overlay;
//                         setBase64Image(base64ImageString);
//
//
//                     }).catch(err => console.log(err))
//                 }}>
//                     <IonIcon icon={add}/>
//                 </IonFabButton>
//
//
//                 <div>
//                     {base64Image ? (
//                         <div>
//                             <img src={`data:image/png;base64,${base64Image}`} alt="Rendered Image"/>
//                             {
//                                 categoryResult ?
//                                     categoryResult.map(categoryProps =>
//                                         <CategoryComponent key={categoryProps.category_id}
//                                                                category_id={categoryProps.category_id}
//                                                                category_color={categoryProps.category_color}/>
//                                     ) :
//                                     <p>Loading categories</p>
//                             }
//
//                         </div>
//
//                     ) : (
//                         <p>Loading image...</p>
//                     )}
//
//
//                 </div>
//             </IonContent>
//         </IonPage>
//     );
// };
//
// export default Tab1;

export {}
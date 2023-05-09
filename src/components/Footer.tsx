import {IonFooter, IonIcon, IonToolbar} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {bookOutline, bookSharp, personOutline, personSharp} from 'ionicons/icons';
import "../assets/styles/footer.scss"
import React, {useState} from "react";



export interface FooterProps {
    activeIcon: string
    handleOnDiaryClick: () => void
    handleUserClick: () => void
}


const Footer:React.FC<FooterProps> = ({activeIcon, handleOnDiaryClick, handleUserClick}) => {

    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer">
                    <div onClick={handleOnDiaryClick} className="footer-nav">
                        {activeIcon === "diary" ? (
                            <IonIcon icon={bookSharp}/>
                        ) : (
                            <IonIcon icon={bookOutline}/>
                        )}
                        <span>Diary</span>
                    </div>
                    <div onClick={handleUserClick} className="footer-nav">
                        {activeIcon === "user" ? (
                            <IonIcon icon={personSharp}/>
                        ) : (
                            <IonIcon icon={personOutline}/>
                        )}
                        <span>Me</span>
                    </div>
                </div>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;

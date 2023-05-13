import {IonFooter, IonIcon, IonRippleEffect, IonToolbar} from '@ionic/react';
import {bookOutline, bookSharp, personOutline, personSharp} from 'ionicons/icons';
import "../assets/styles/footer.scss"
import React from "react";


export interface FooterProps {
    activeIcon: string
    handleOnDiaryClick: () => void
    handleUserClick: () => void
}


const Footer: React.FC<FooterProps> = ({activeIcon, handleOnDiaryClick, handleUserClick}) => {

    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer">
                    <div onClick={handleOnDiaryClick} className="footer-nav ion-activatable ripple-parent">
                        {activeIcon === "diary" ? (
                            <IonIcon icon={bookSharp}/>
                        ) : (
                            <IonIcon icon={bookOutline}/>
                        )}
                        <span>Diary</span>
                        <IonRippleEffect/>

                    </div>
                    <div onClick={handleUserClick} className="footer-nav ion-activatable ripple-parent">
                        {activeIcon === "user" ? (
                            <IonIcon icon={personSharp}/>
                        ) : (
                            <IonIcon icon={personOutline}/>
                        )}
                        <span>Me</span>
                        <IonRippleEffect/>
                    </div>
                </div>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;

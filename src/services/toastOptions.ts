import {ToastButton, ToastOptions} from "@ionic/react";
import {checkmarkOutline, closeOutline, warningSharp} from "ionicons/icons";

const cancelToastButton: ToastButton = {
    icon: closeOutline,
    side: 'end',
    role: "cancel"
}

export const deleteOptions: ToastOptions = {
    message: 'Deleted successfully!',
    duration: 2000,
    position: 'top',
    icon: checkmarkOutline,
    color: "success",
    buttons: [cancelToastButton]
}

export const addOptions: ToastOptions = {
    message: 'Added successfully!',
    duration: 1000,
    position: 'top',
    icon: checkmarkOutline,
    color: "success",
    buttons: [cancelToastButton]

}

export const updateOptions: ToastOptions = {
    message: 'Update successfully!',
    duration: 2000,
    position: 'top',
    icon: checkmarkOutline,
    color: "success",
    buttons: [cancelToastButton]
}

export const loginOptions: ToastOptions = {
    message: 'Username or password incorrect!',
    duration: 3000,
    position: 'top',
    icon: warningSharp,
    color: "danger",
    buttons: [cancelToastButton]
}
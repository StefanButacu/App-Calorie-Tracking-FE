import {ToastButton, ToastOptions} from "@ionic/react";
import {checkmarkOutline, closeOutline, thumbsUpSharp, warningSharp} from "ionicons/icons";

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

export const registerSuccessfullyOptions: ToastOptions = {
    message: 'Register Successfully!',
    duration: 3000,
    position: 'top',
    icon: checkmarkOutline,
    color: "success",
    buttons: [cancelToastButton]
}

export const registerFailedOptions: ToastOptions = {
    message: 'Register Failed!',
    duration: 3000,
    position: 'top',
    icon: warningSharp,
    color: "danger",
    buttons: [cancelToastButton]
}
export const UserUpdateWeight: ToastOptions = {
    message: 'Congratulations for your progress!',
    duration: 3000,
    position: 'top',
    icon: thumbsUpSharp,
    color: "success",
    buttons: [cancelToastButton]
}

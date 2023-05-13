import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {useState} from "react";

export function usePhotoGallery() {
    const [photoBase64, setPhotoBase64] = useState<string | null>(null)

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 100,
        });
        setPhotoBase64(photo.base64String!);
        return photo
    };
    return {
        takePhoto,
        photoBase64
    };
}
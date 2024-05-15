import {ref as vRef, unref} from "vue";
import {storage} from "../js/firebase.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

export function usePictureInput() {
    const picture = vRef(null);

    function updatePicture(blob) {
        picture.value = blob;
    }

    // Returns a promise after uploading the picture to storage
    function uploadPicture(uid, folderPath) {
        const avatarsRef = ref(storage, 'images/' + folderPath + '/' + uid);
        return uploadBytes(avatarsRef, unref(picture))
            .then(snapshot => {
                return getDownloadURL(snapshot.ref);
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }

    return {picture, updatePicture, uploadPicture};
}
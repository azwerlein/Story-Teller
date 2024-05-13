import {ref as vRef, unref} from "vue";
import {storage} from "../js/firebase.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

export function usePictureInput() {
    const picture = vRef(null);

    function updatePicture(blob) {
        picture.value = blob;
        console.log('update picture')
    }

    // Returns a promise after uploading the picture to storage
    function uploadPicture(uid, profile) {
        console.log('ok')
        const avatarsRef = ref(storage, 'avatars/' + uid);
        return uploadBytes(avatarsRef, unref(picture))
            .then(snapshot => {
                console.log('ok')
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                unref(profile).photoURL = url;
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }

    return {picture, updatePicture, uploadPicture};
}
import {onSnapshot} from "firebase/firestore";
import {onUnmounted} from "vue";


export function useCollectionSnapshotListener(query, listRef) {
    const unsubscribe = onSnapshot(
        query,
        snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    listRef.value.push(change.doc.data());
                } else if (change.type === 'removed') {
                    let char = change.doc.data();
                    listRef.value.splice(listRef.value.indexOf(char), 1);
                }
            });
        },
        error => {
            console.error(error.code, error);
        }
    );

    onUnmounted(() => {
        unsubscribe();
    });

    return unsubscribe;
}

export function useDocumentSnapshotListener(docRef, targetRef) {

    const unsubscribe = onSnapshot(docRef, snapshot => {
            if (snapshot.exists()) {
                targetRef.value = snapshot.data();
            }
        },
        error => {
            console.error('Error:', error.code, error.message);
        });

    onUnmounted(() => {
        unsubscribe();
    });

    return unsubscribe;
}
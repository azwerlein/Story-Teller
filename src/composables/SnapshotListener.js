import {onSnapshot} from "firebase/firestore";
import {onUnmounted, unref} from "vue";


export function useCollectionSnapshotListener(query, listRef) {
    const list = unref(listRef);
    const unsubscribe = onSnapshot(
        query,
        snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    list.push(change.doc.data());
                } else if (change.type === 'removed') {
                    let char = change.doc.data();
                    list.splice(list.indexOf(char), 1);
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

export function useDocumentSnapshotListener(docRef, setter) {
    const unsubscribe = onSnapshot(docRef, snapshot => {
            if (snapshot.exists()) {
                setter(snapshot.data());
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
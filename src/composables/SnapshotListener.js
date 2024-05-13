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
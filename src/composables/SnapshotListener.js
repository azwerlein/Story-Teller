import {onSnapshot} from "firebase/firestore";
import {onUnmounted, unref} from "vue";


export function useCollectionSnapshotListener(query, listRef, loadedRef) {
    const list = unref(listRef);
    const unsubscribe = onSnapshot(
        query,
        snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    list.push(change.doc.data());
                } else if (change.type === 'removed') {
                    let char = change.doc.data();
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].uid === char.uid) {
                            list.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        },
        error => {
            console.error(error.code, error);
        },
        () => {
            if (loadedRef !== undefined) {
                loadedRef.value = true;
            }
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
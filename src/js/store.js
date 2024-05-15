import {defineStore} from "pinia";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase.js";
import {collection, getDocs, limit, query, where} from "firebase/firestore";
import {profileConverter, UserSession} from "../models/User.js";


// The session for the currently logged-in user can always be found here. This is necessary to pass the user between routes.
export const useSessionStore = defineStore('authUser', {
    state: () => {
        return {
            _userSession: null,
        }
    },
    getters: {
        userSession(state) {
            return state._userSession;
        },
    },
    actions: {
        init() {
            onAuthStateChanged(auth, authUser => {
                if (authUser) {
                    const q = query(collection(db, 'users'), where('internalId', '==', authUser.uid), limit(1)).withConverter(profileConverter);
                    getDocs(q)
                        .then(snapshot => {
                            console.log(snapshot);
                            if (snapshot.docs.length > 0) {
                                this.login(new UserSession(authUser, snapshot.docs[0].data()));
                            }
                        })
                } else {
                    this.logout();
                }
            });
        },
        login(session) {
            this._userSession = session;
        }
        ,
        logout() {
            this._userSession = null;
        }
    }
});

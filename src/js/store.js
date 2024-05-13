import {defineStore} from "pinia";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase.js";
import {doc, getDoc} from "firebase/firestore";
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
                    const docRef = doc(db, 'users', authUser.uid).withConverter(profileConverter);
                    getDoc(docRef)
                        .then(snapshot => {
                            this.login(new UserSession(authUser, snapshot.data()));
                        })
                        .catch(error => {
                            console.log('Error: ', error.code, error.data);
                        });
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
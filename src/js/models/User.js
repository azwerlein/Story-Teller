function User(firebaseUser) {
    let user = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
    }

    if(firebaseUser){
        user.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
        user.email = firebaseUser.email ? firebaseUser.email : '';
        user.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : '';
        user.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }

    return user;
}
export function Profile(displayName, photoURL) {
    this.displayName = displayName ?? '';
    this.photoURL = photoURL ?? '';
}

export const profileConverter = {
    toFirestore: profile => {
        return {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Profile(data.displayName, data.photoURL);
    }
}

export function UserSession(authUser, profile) {
    this.user = authUser;
    this.profile= profile;
}
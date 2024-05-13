export function Profile(id, displayName, photoURL, level) {
    this.uid = id;
    this.displayName = displayName ?? '';
    this.photoURL = photoURL ?? '';
    this.level = level ?? 1;
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
        return new Profile(snapshot.id, data.displayName, data.photoURL, data.level);
    }
}

export function UserSession(authUser, profile) {
    this.user = authUser;
    this.profile= profile;
}
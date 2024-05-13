export function Profile(id, displayName, photoURL, level, xp, bio) {
    this.uid = id;
    this.displayName = displayName ?? '';
    this.photoURL = photoURL ?? '';
    this.level = level ?? 1;
    this.xp = xp ?? 0;
    this.bio = bio ?? '';
}

export const profileConverter = {
    toFirestore: profile => {
        return {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
            level: profile.level,
            xp: profile.xp,
            bio: profile.bio,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Profile(snapshot.id, data.displayName, data.photoURL, data.level, data.xp, data.bio);
    }
}

export function UserSession(authUser, profile) {
    this.user = authUser;
    this.profile= profile;
}
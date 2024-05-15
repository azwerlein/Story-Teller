export function Profile(id, displayName, photoURL, level, xp, bio, authId) {
    this.uid = id;
    this.displayName = displayName ?? '';
    this.photoURL = photoURL ?? '';
    this.level = level ?? 1;
    this.xp = xp ?? 0;
    this.bio = bio ?? '';
    this.internalId = authId;
}

export const profileConverter = {
    toFirestore: profile => {
        return {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
            level: profile.level,
            xp: profile.xp,
            bio: profile.bio,
            internalId: profile.internalId,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Profile(snapshot.id, data.displayName, data.photoURL, data.level, data.xp, data.bio, data.internalId);
    }
}

export function UserSession(authUser, profile) {
    this.user = authUser;
    this.profile= profile;
}
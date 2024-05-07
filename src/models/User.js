export function Profile() {
    return {
        displayName: '',
        photoURL: '',
    };
}

export function UserSession(authUser, profile) {
    return {
        user: authUser,
        profile: profile,
    }
}
export function Profile() {
    this.displayName = '';
    this.photoURL = '';
}

export function UserSession(authUser, profile) {
    this.user = authUser;
    this.profile= profile;
}
export default function Story(uid, title, authorId, visibility) {
    this.uid = uid;
    this.title = title;
    this.authorId = authorId;
    this.visibility = visibility ?? 'public';
}

export const storyConverter = {
    toFirestore: (story) => {
        return {
            title: story.title,
            authorId: story.authorId,
            visibility: story.visibility,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Story(snapshot.id, data.title, data.authorId, data.visibility);
    }
};

export default function Story(uid, title, authorId) {
    this.uid = uid;
    this.title = title;
    this.authorId = authorId;
}

export const storyConverter = {
    toFirestore: (story) => {
        return {
            title: story.title,
            authorId: story.authorId,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Story(snapshot.id, data.title, data.authorId);
    }
};

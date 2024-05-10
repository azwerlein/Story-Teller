export default function Story(uid, title, author) {
    this.uid = uid;
    this.title = title;
    this.author = author;
}

export const storyConverter = {
    toFirestore: (story) => {
        return {
            title: story.title,
            author: story.author,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Story(snapshot.id, data.title, data.author);
    }
};

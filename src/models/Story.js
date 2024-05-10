export function Story(uid, title, author) {
    this.uid = uid;
    this.title = title;
    this.author = author;
}

export function storyFromFirebase(uid, data) {
    return new Story(uid, data.title, data.author);
}

export function storyToFirebase(story) {
    return {
        title: story.title,
        author: story.author,
    }
}
export default function CommentPost(author, content, originalPost, precursor, type) {
    this.author = author;
    this.content = content;
    this.originalPost = originalPost;
    this.precursor = precursor;
    this.type = type;
}

export const commentConverter = {
    toFirestore: comment => {
        return {
            author: comment.author,
            content: comment.content,
            originalPost: comment.originalPost,
            precursor: comment.precursor,
            type: comment.type,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CommentPost(data.author, data.content, data.originalPost, data.precursor, data.type);
    }
}

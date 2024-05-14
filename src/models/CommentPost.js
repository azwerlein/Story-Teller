import {Timestamp} from "@firebase/firestore";

export default function CommentPost(author, content, originalPost, precursor, date, modified, type) {
    this.author = author;
    this.content = content;
    this.originalPost = originalPost;
    this.precursor = precursor;
    this.date = date ?? new Date();
    this.modified = modified ?? false;
    this.type = type;
}

export const commentConverter = {
    toFirestore: comment => {
        return {
            author: comment.author,
            content: comment.content,
            originalPost: comment.originalPost,
            precursor: comment.precursor,
            date: Timestamp.fromDate(comment.date),
            modified: comment.modified,
            type: comment.type,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CommentPost(data.author, data.content, data.originalPost, data.precursor, data.date?.toDate(), data.modified, data.type);
    }
}

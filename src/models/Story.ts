import Character from "./Character";

export default class Story {
    title: string;
    author: string;
    characters: typeof Character[];

    constructor(title: string, author: string, characters: typeof Character[] = []) {
        this.title = title;
        this.author = author;
        this.characters = characters;
    }
}
export default function Character(uid, name, photoURL, storyId) {
    this.uid = uid;
    this.name = name;
    this.photoURL = photoURL ?? '';
    this.storyId = storyId;
    this.authorId = authorId;
}

export const characterConverter = {
    toFirestore: character => {
        return {
            name: character.name,
            photoURL: character.photoURL,
            storyId: character.storyId,
            authorId: character.authorId,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Character(snapshot.id, data.name, data.photoURL, data.storyId, data.authorId);
    }
}

export function CharacterDescription(name, description) {
    this.name = name;
    this.description = description;
}

export const characterDescriptionListConverter = {
    toFirestore: list => {
        let pojo = {}
        list.map(section => {
            pojo[section.name] = section.description;
        })
        console.log(pojo);
        return pojo;
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        let list = [];
        for (let property in data) {
            console.log(property);
            console.log(data[property]);
            list.push(new CharacterDescription(property, data[property]));
        }
        return list;
    }
}

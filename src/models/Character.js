export default function Character(uid, name, photoURL, storyId, authorId) {
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

export function CharacterDescription(name, description, authorId) {
    this.name = name;
    this.description = description;
    this.authorId = authorId;
}

export const characterDescriptionListConverter = {
    toFirestore: list => {
        list = list.map(desc => {
            return {
                name: desc.name,
                description: desc.description,
                authorId: desc.authorId,
            }
        });
        return { sections: list };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        let list = [];
        data.sections.forEach((item) => {
            list.push(new CharacterDescription(item.name, item.description, data.authorId));
        });
        return list;
    }
}

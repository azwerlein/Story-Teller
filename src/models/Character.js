export default function Character(uid, storyId, name) {
    this.uid = uid;
    this.name = name;
    this.storyId = storyId;
}

export const characterConverter = {
    toFirestore: character => {
        return {
            storyId: character.storyId,
            name: character.name,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Character(snapshot.id, data.storyId, data.name);
    }
}

export function CharacterDescription(name, description) {
    this.name = name;
    this.description = description;
}

export const characterDescriptionConverter = {
    toFirestore: description => {
        return {
            name: description.name,
            description: description.description,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CharacterDescription(data.name, data.description);
    }
}

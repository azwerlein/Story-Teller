export default function Character(name) {
    this.name = name;
}

export const characterConverter = {
    toFirestore: character => {
        return {
            name: character.name,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Character(data.name);
    }
}

export function CharacterDescription(name, description) {
    this.name = name;
    this.description = description;
}

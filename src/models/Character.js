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

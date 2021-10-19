const getLocationString = (obj) => {
    return obj.city + ", " + obj.state + " " + obj.zip
}

const getNameInitials = (name) => {
    const name_split = name.split(" ")
    const prepositions = ["of", "on", "the", "in", "for", "to", "from", "by"]
    let firstChar = ''
    let secondChar = ''

    if (name_split.length > 1) {
        firstChar = name_split[0].charAt(0)
        for (let i = 1; i < name_split.length; i++) {
            if (!prepositions.includes(name_split[i].toLowerCase())) {
                secondChar = name_split[i].charAt(0)
                break
            }
        }
    }
    return firstChar + secondChar
}

export {
    getLocationString,
    getNameInitials
};
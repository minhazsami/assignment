const random_string = (length) =>{
    let randomText = ''
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for (let i = 0; i < length; i++) {
      randomText += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
    }

    return randomText
}

export default {
    random_string
}

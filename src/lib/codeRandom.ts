import {randomInt} from "crypto";

function passwordRandom(length: number): string{
    const words = "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopñlkjhgfdsazxcvbnm1234567890.-_{}+[]?¿°|"
    let password = "";

    for(let i = 0; i< length; i++){
        password += words[randomInt(0, words.length)];
    }

    return password;
}

export default passwordRandom;
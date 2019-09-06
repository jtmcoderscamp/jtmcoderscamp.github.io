import dictionary from "./localizationDictionaryPL";

export default function localize(text){
    let translated = text;
    if (typeof text === "string" && dictionary[text]) {
        translated = dictionary[text];
    }
    return translated;
}
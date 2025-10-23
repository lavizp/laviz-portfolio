import example_prompts from "@/data/example_prompts.json"

const convertSentenceToArray = (prompt: string): string[] =>{
    return prompt.toLowerCase().split(" ")
}

const removeStopWords = (prompt: string[]): string[]=>{
    const stopWords = [
        "a","an","the","and","or","but","if","while","of","at","by","for","with",
        "about","against","between","into","through","during","before","after","above",
        "below","to","from","up","down","in","out","on","off","over","under","again",
        "further","then","once","here","there","when","where","why","how","all","any",
        "both","each","few","more","most","other","some","such","no","nor","not",
        "only","own","same","so","than","too","very","can","will","just","don","should",
        "now","is","am","are","was","were","be","been","being","have","has","had",
        "do","does","did","having","he","she","it","they","them","his","her","him",
        "its","their","our","we","you","your","yours","me","my","mine","i"
    ];
    return prompt.filter(word=> !stopWords.includes(word))
}

const removePunctuations = (prompt: string[]): string[]=>{
    const punctuations = [
      ".", ",", "!", "?", ";", ":", "'", "\"", "-", "—", "(", ")", "[", "]",
      "{", "}", "...", "/", "\\", "@", "#", "$", "%", "^", "&", "*", "_", "+",
      "=", "<", ">", "|", "~", "`"
    ];
    return prompt.map(str=> str.split("").filter(ch=>!punctuations.includes(ch)).join(""))
}
const getPromptKey = (prompt: string[]): number=>{
    const json = example_prompts
    const scores = Object.fromEntries(
        Object.keys(json).map(key=>[key, 0])
    )
    

    return 0
}
export const getPromptResponse = (prompt: string): string=>{
    const promptArray = convertSentenceToArray(prompt)
    const pureArray = removePunctuations(promptArray)
    const filteredArray = removeStopWords(pureArray)
    return filteredArray.join(" ")
}

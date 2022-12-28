export const changeText= (text) => {
    return text.replace(/\'/g, '%comma%')
}
export const changeValues = (text) => {
    return text.replace(/\'/g, '')
}
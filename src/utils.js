export function isEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) return false;
    for (let i=0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) return false;
    }
    return true;
}

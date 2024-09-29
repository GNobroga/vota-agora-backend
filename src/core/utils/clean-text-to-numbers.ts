import isNull from "./is-null";

function cleanTextToNumbers(text: string) {
    if (isNull(text)) return '';
    return text.replace(/\D/g, '');
    
}

export default cleanTextToNumbers;
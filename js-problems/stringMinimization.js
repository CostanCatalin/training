function stringMinimization(string){
    let currentSubstringLength = 1;
    let result = '';

    for(let i = 1; i < string.length; i++) {
        if (string[i] == string[i-1]) {
            currentSubstringLength++;
        } else {
            result += string[i-1];

            if (currentSubstringLength > 1) {
                result += (currentSubstringLength - 1)
                currentSubstringLength = 1;
            }
        }
    }

    result += string[string.length - 1] + (currentSubstringLength - 1);

    return result;
} 

function numbersSetLength(n) {
    if (n <= 0 || n >= 10**9) {
        return false;
    }

    let result = 0,
        number = n + "",
        firstDigit = parseInt(number[0]);

    let remainder = n % 10**(number.length-1);
    result += (remainder+1) * number.length;
    result += (firstDigit-1) * number.length  * 10 ** (number.length-1);    
    
    let count = number.length - 1;
    while (count > 0) {
        result += count * 9 * 10 ** (count-1); 
        count--;
    }

    return result;
}

function sef(n) {
    let binary = n.toString(2);
    let zeroes = 0;

    binary = "0".repeat(16 - binary.length) + binary;
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] == 0) {
            zeroes++;
        }
    }
    
    let result = '1' + "0".repeat(zeroes);
    return parseInt(result, 2);
}

function subsets(number) {
    if (typeof number != "number" || number <= 0) {
        return false;
    }
    let combinations = [];

    function counterToSubset(string){
        let result = [];
        for (let i = 0; i < string.length; i++) {
            if (string[i] === '1') {
                result.push(string.length - i - 1);
            }
        }
        return result;
    }

    for (let i = 0; i < Math.pow(2, number); i++){
        var binary = parseInt(i, 10);
        combinations.push(counterToSubset(binary.toString(2)));
    }

    return combinations;
}

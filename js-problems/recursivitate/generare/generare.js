function generare(lungime) {
    if (lungime == 1) {
        return ['0', '1'];
    }
    let left = [];
    let right = [];
    let previous = generare(lungime-1);

    for (let i = 0; i < previous.length; i++) {
        left.push('0' + previous[i]);
        right.push('1' + previous[i]);
    }

    return left.concat(right);
}

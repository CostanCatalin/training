function permutareCiclica(vect, p) {
    if (p > vect.length) {
        p = p % vect.length;
    }

    let result = [];
    for (let i = p; i < vect.length; i++) {
        result.push(vect[i]);
    }

    for (let i = 0; i < p; i++) {
        result.push(vect[i])
    }

    return result;
}

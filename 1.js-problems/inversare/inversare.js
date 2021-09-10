function inverse(vect) {
    if (isInvalidArray(vect)) {
        return false;
    }

    for (let i = 0; i < vect.length / 2; i++) {
        let aux = vect[i];
        vect[i] = vect[vect.length - i - 1];
        vect[vect.length - i - 1] = aux;
    }

    return vect;
}

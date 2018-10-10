function cyclicPermutations_1(vect, p) {
    for (let i = 0; i < p; i++) {
        let aux = vect[vect.length-1];
        vect.splice(vect.length-1, 1);
        vect.splice(0, 0, aux);
    }

    return vect;
}

function cyclicPermutations_2(vect, p) {
    return vect.slice(vect.length-p, vect.length)
        .concat(vect.slice(0, vect.length-p));
}

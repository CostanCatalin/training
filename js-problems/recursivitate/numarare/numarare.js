function numarare(vect, numar) {
    if (vect.length <= 1) {
        return vect[0] === numar ? 1 : 0;
    }

    return numarare(vect.slice(0, vect.length/2), numar)
        + numarare(vect.slice(vect.length/2, vect.length), numar); 
}
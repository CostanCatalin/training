function isSorted(vect) {
    if (!Array.isArray(vect) || vect.length <= 1) {
        return false;
    }

    for (let i = 1; i < vect.length; i++) {
        if (vect[i] < vect[i-1]){
            return false;
        }
    }
    
    return true;
}

function isInvalidArray(vect) {
    return !Array.isArray(vect) || vect.length <= 1;
}

function executeWithTime(func, param, name) {
    let t0 = performance.now();
    func(param);
    let t1 = performance.now();

    const decimalPlaces = 7;
    let value = t1 - t0;
    let formatedDuration = Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces)
    return name + " - " + formatedDuration + " ms";
}
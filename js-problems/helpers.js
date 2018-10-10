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
    let result = func(param);
    let t1 = performance.now();

    console.log(name + " - " + (t1 - t0) + " ms");
}
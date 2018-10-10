function bubbleSort(vect) {
    if (isInvalidArray(vect)) {
        return false;
    }

    for (let i = 0; i < vect.length - 1; i++) {
        for (let j = i + 1; j < vect.length; j++) {
            if (vect[i] > vect[j]) {
                let aux = vect[i];
                vect[i] = vect[j];
                vect[j] = aux;
            }
        }
    }

    return vect;
}

function insertionSort(vect) {
    if (isInvalidArray(vect)) {
        return false;
    }

    for (let i = 1; i < vect.length; i++) {
        if (vect[i] < vect[i-1]) {
            for (let j = i; j > 0; j--) {
                if (vect[j] < vect[j-1]) {
                    let aux = vect[j];
                    vect[j] = vect[j-1];
                    vect[j-1] = aux;
                }
            }
        } 
    }

    return vect;
}

function selectionSort(vect) {
    if (isInvalidArray(vect)) {
        return false;
    }

    for (let i = 0; i < vect.length; i++) {
        let minIndex = i;
        for (let j = i+1; j < vect.length; j++) {
            if (vect[j] < vect[minIndex]) {
                minIndex = j;
            } 
        }

        if (minIndex > i) {
            let aux = vect[minIndex];
            vect[minIndex] = vect[i];
            vect[i] = aux;
        }
    }

    return vect;
}
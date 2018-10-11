function commonElements(vectors) {
    if (isInvalidArray(vectors)) {
        return false;
    }

    let mapping = {};

    for (let vectIdx = 0; vectIdx < vectors.length; vectIdx++) {
        vect = vectors[vectIdx];

        if (!Array.isArray(vect)) {
            return false;
        }        

        for (let i = 0; i < vect.length; i++) {
            if (!(vect[i] in mapping)) {
                mapping[vect[i]] = new Set();
            }

            if (!mapping[vect[i]].has(vectIdx)){
                mapping[vect[i]].add(vectIdx);
            }
        }
    }

    return mapping;
}

function findNumberAppearances(mapping, number) {
    if (!(number in mapping)) {
        return [];
    }

    return Array.from(mapping[number]);
}
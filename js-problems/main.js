    let size = 1000;
    const vectorToBeSorted = Array.from(new Array(size), (x,i) => Math.floor((Math.random() * 100000) + 1));
    
    // console.log("For array :\n\n");
    // console.log(vectorToBeSorted);
    // executeWithTime(bubbleSort, vectorToBeSorted.slice(), "Bubble Sort");
    // executeWithTime(insertionSort, vectorToBeSorted.slice(), "Insert Sort");
    // executeWithTime(selectionSort, vectorToBeSorted.slice(), "Selection Sort");

    const vectNum = 10;
    const vectorsForCommonElements = Array.from(new Array(vectNum), (x,i) => Array.from(
            new Array(Math.floor((Math.random() * 15) + 1)),
            (x,i) => Math.floor((Math.random() * 20) + 1)
        )
    );
    const mapping = commonElements(vectorsForCommonElements);
    
    // console.log("\n\nCommon elements:\n\n");
    // console.log("Input");
    // console.log(vectorsForCommonElements);
    // console.log("Output");
    // console.log(mapping);

    const numberToSearch = Math.floor((Math.random() * 20) + 1);
    let numberSources = findNumberAppearances(mapping, numberToSearch);
    // console.log(numberToSearch + "'s vectors are " + numberSources);

    // console.log("Cyclic permutations: \n\n");
    // executeWithTime(cyclicPermutations_1, [vect.slice(), 10], "Permutation 1");
    // executeWithTime(cyclicPermutations_2, [vect.slice(), 10], "Permutation 2");
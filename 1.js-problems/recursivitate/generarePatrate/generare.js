var char = String.fromCharCode(9744);

function generare(numar, leftOrRight) {
    if (numar <= 0) {
        return '';
    }

    // *
    // ** <- this case
    // *
    if (leftOrRight === undefined) { 
        return generare(numar-1, 1) +
        char.repeat(numar) + "\n" +
        generare(numar-1, 2);
    }

    if (leftOrRight == 1) {
        // *
        // ** <- this case
        // ***
        return generare(numar-1, 1) +
        char.repeat(numar) + "\n";    
    } else if(leftOrRight == 2) {    
        // ***
        // ** <- this case
        // *
        return char.repeat(numar) + "\n" +
        generare(numar-1, 2);
    }
}

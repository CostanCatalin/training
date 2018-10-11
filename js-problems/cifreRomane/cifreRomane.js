function cifreRomane(n) {
    if (n < 0 || n > 5000) {
        return false;
    }
    let roman = "";
    let numberToRoman = {
        1 : 'I',
        5 : 'V',
        10 : 'X',
        50 : 'L',
        100 : 'C',
        500 : 'D',
        1000 : 'M',
        4 : 'IV',
        9 : 'IX',
        40: 'XL',
        90: 'XC',
        400: 'CD',
        900: 'CM'
    }
    let numberVector = Array.from((n + "").split(""), x => parseInt(x));
    
    for (let i = 0; i < numberVector.length; i++) {
        if (numberVector[i] == 0) {
            continue;
        }

        let actualNumber = numberVector[i] * 10**(numberVector.length-i-1);

        if (actualNumber in numberToRoman) {
            roman += numberToRoman[actualNumber];
        } else {
            let max = 0;

            for (let k in numberToRoman) {
                k = parseInt(k);
                if (k < actualNumber && k > max) {
                    max = k;
                }
            }

            let times = Math.floor(actualNumber / max);
            if (actualNumber % max == 0) {
                roman += numberToRoman[max].repeat(times);
            } else {
                roman += numberToRoman[max] + cifreRomane(actualNumber - max);
            }
        }
    }

    return roman;
};

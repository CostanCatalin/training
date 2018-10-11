function getOptimalBillsForPayment(sum, value){
    let maxPow = 1;
    
    while (Math.floor(sum / (value ** maxPow)) > 0) {
        maxPow++;
    }
    let bills = {};

    for (let i = maxPow-1; i >= 0; i--) {
        let billValue = value ** i;
        let numberOfBills = Math.floor(sum / billValue);
        bills[billValue] = numberOfBills;
        sum -= (numberOfBills * billValue);
    }

    return bills;
}

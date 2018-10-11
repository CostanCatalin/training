function factorial(numar) {
    if (numar <= 1) {
        return 1;
    }

    return numar * factorial(numar-1);
}

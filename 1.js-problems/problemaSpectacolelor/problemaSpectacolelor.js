function festivalGreedy(spectacles) {
    const schedule = [];

    function differenceFromFirstToSecond(firstEndH, firstEndM, secondStartH, secondStartM) {
        let hours = secondStartH - firstEndH;
        let minutes = secondStartM - firstEndM;

        if (hours < 0 || hours == 0 && minutes < 0) {
            return [-1, -1];
        }

        if (minutes < 0) {
            hours--;
            minutes += 60;
        }

        return [hours, minutes];
    }

    //picking the first spectacle
    let firstSpectacle = 0;
    for (let i = 1; i < spectacles.length; i++) {
        if (spectacles[i].endH < spectacles[firstSpectacle].endH ||
            (spectacles[i].endH == spectacles[firstSpectacle].endH
                && spectacles[i].endM < spectacles[firstSpectacle].endM)) {
            firstSpectacle = i;
        }
    }
    schedule.push(spectacles[firstSpectacle]);
    spectacles = spectacles.slice(0, firstSpectacle)
        .concat(spectacles.slice(firstSpectacle + 1, spectacles.length));

    // pick the rest of them
    let newCadidate = 0;
    while (newCadidate >= 0) {
        newCadidate = -1;
        let minH = 24,
            minM = 60;
        let lastAdded = schedule[schedule.length - 1];

        for (let i = 1; i < spectacles.length; i++) {
            let time = differenceFromFirstToSecond(
                lastAdded.endH, lastAdded.endM,
                spectacles[i].startH, spectacles.endM
            );

            let hours = time[0],
                minutes = time[1];

            if ((hours >= 0) &&
                (hours < minH
                    || hours <= minH && minutes < minM)
            ) {
                minH = hours;
                minM = minutes;
                newCadidate = i;
            }
        }

        if (newCadidate >= 0) {
            schedule.push(spectacles[newCadidate]);
            spectacles = spectacles.slice(0, newCadidate)
                .concat(spectacles.slice(newCadidate + 1, spectacles.length));
        }
    }

    return schedule;
}


function Activity(id, startH, startM, endH, endM) {
    this.id = id;
    this.startH = startH;
    this.startM = startM;
    this.endH = endH;
    this.endM = endM;
}

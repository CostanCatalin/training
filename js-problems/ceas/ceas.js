(function ceas() {
    let dest1 = document.querySelector('.ceas-interval');
    let dest2 = document.querySelector('.ceas-timeout');

    let size;
    const angleBetweenHours = 30;
    const angleBetweenMinutes = 6;
    const angleOffset = 90;


    function processes() {
        init(dest1);
        const currentAnglesInterval = [0, 0, 0];
        const handsInterval = [
            dest1.querySelector('.ac-s'),
            dest1.querySelector('.ac-m'),
            dest1.querySelector('.ac-h')
        ]

        setCurrentTime(currentAnglesInterval);
        moveHands(handsInterval, currentAnglesInterval);
        setInterval(function() { moveHands(handsInterval, currentAnglesInterval); }, 1000);

        init(dest2);
        const currentAnglesTimeout = [0, 0, 0];
        const handsTimeout = [
            dest2.querySelector('.ac-s'),
            dest2.querySelector('.ac-m'),
            dest2.querySelector('.ac-h')
        ]
        
        setCurrentTime(currentAnglesTimeout);
        moveHands(handsTimeout, currentAnglesTimeout);

        setTimeout(function() { moveHands(handsTimeout, currentAnglesTimeout); }, 1000);
    }

    function init(dest) {
        let rect = dest.getBoundingClientRect();
        size = rect.right - rect.left - 60;
        let distanceFromCenter = size / 2;

        for (let i = 1; i <= 12; i++) {
            let cifra = document.createElement('div');
            cifra.classList.add('cifra', 'cifra-' + i);
            cifra.innerText = i;

            cifra.style.left = distanceFromCenter + distanceFromCenter * Math.cos((i - 3) * angleBetweenHours * (Math.PI / 180)) + 20 + "px";
            cifra.style.top = distanceFromCenter + distanceFromCenter * Math.sin((i - 3) * angleBetweenHours * (Math.PI / 180)) + 16 + "px";

            dest.appendChild(cifra);
        }
    }

    function setCurrentTime(currentAngles) {
        let currentTime = new Date();
        currentAngles[0] = currentTime.getSeconds() * angleBetweenMinutes;
        currentAngles[1] = currentTime.getMinutes() * angleBetweenMinutes;
        currentAngles[2] = currentTime.getHours() * angleBetweenHours;
    }

    function moveHands(hands, currentAngles) {
        currentAngles[0] = (currentAngles[0] + angleBetweenMinutes) % 360;

        if (currentAngles[0] <= 5) {
            currentAngles[1] = (currentAngles[1] + angleBetweenMinutes) % 360;
            currentAngles[2] += 0.1;
        }

        for (let i = 0; i < hands.length; i++) {
            hands[i].style.transform = "rotate(" + (angleOffset + currentAngles[i]) + "deg)"; 
        }
    }

    processes();
})();
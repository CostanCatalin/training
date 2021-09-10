var mouseDistance = (function mouse() {
    document.body.onmousemove = handleMouseMove;

    let previousX = 0;
    let previousY = 0;
    let dotsNumber = 1000;

    function init() {
        let dest = document.querySelector('.playground');

        for (let i = 0; i < dotsNumber; i++) {
            let elem = document.createElement("div");
            elem.classList.add("dot");
            dest.append(elem);
        }
    }

    function handleMouseMove(event) {
        topX = event.pageX - distance;
        topY = event.pageY - distance;

        for (let x = previousX - distance; x < previousX + 2*distance; x +=5) {
            for (let y = previousY - distance; y < previousY + 2*distance; y +=5) {
                let element = document.elementFromPoint(x, y);
                if (element) {
                    element.classList.remove("active");
                }
            }
        }

        for (let x = event.pageX - distance; x < event.pageX + distance; x +=5) {
            for (let y = event.pageY - distance; y < event.pageY + distance; y +=5) {
                // minimal area for the distance calculations | removing the corners
                if (Math.sqrt((x - event.pageX)**2 + (y - event.pageY)**2) < distance) {
                    let element = document.elementFromPoint(x, y);
                    if (element && element.classList.contains("dot")) {
                        element.classList.add("active");
                    }
                }
            }
        }

        previousX = topX;
        previousY =  topY;
    }

    init();
})();
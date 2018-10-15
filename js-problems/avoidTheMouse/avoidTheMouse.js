var avoidTheMouse = (function mouse() {
    document.body.onmousemove = handleMouseMove;
    let dotsNumber = 400;

    function init() {
        let currentX = 20;
        let currentY = 20;
        var MaxX = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        let dest = document.querySelector('.playground');

        for (let i = 0; i < dotsNumber; i++) {
            let elem = document.createElement("div");
            elem.classList.add("dot");

            if (currentX < MaxX - 50) {
                currentX += 40;
            } else {
                currentX = 20;
                currentY += 40;
            }

            elem.style.left = currentX + "px";
            elem.style.top = currentY + "px";
            dest.append(elem);
        }
    }

    function handleMouseMove(event) {
        sectionSize = distance / 10;

        for (let x = event.pageX - distance; x < event.pageX + distance; x += sectionSize) {
            for (let y = event.pageY - distance; y < event.pageY + distance; y += sectionSize) {
                // minimal area for the distance calculations | removing the corners
                if (Math.sqrt((x - event.pageX)**2 + (y - event.pageY)**2) < distance) {
                    let element = document.elementFromPoint(x, y);
                    if (element) {
                        let angle = Math.atan2(event.pageY - y, event.pageX - x);
                        element.style.left = event.pageX - Math.cos(angle) * distance + "px";
                        element.style.top = event.pageY - Math.sin(angle) * distance + "px";
                    }
                }
            }
        }
    }

    init();
})();

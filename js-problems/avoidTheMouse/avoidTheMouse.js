var avoidTheMouse = (function mouse() {
    document.body.onmousemove = handleMouseMove;
    
    let moved = [];
    let pointerX;
    let pointerY;

    function init() {
        let dest = document.querySelector('.playground');
        var rect = dest.getBoundingClientRect();

        let currentX = rect.left - 25;
        let currentY = rect.top;

        while (currentY < rect.bottom) {
            let elem = document.createElement("div");
            elem.classList.add("dot");

            if (currentX < rect.right - 30) {
                currentX += 25;
            } else {
                currentX = rect.left;
                currentY += 25;
            }
            
            if (currentY < rect.bottom) {
                elem.style.left = currentX + "px";
                elem.style.top = currentY + "px";
                elem.setAttribute('x', currentX);
                elem.setAttribute('y', currentY);
                dest.append(elem);
            }
        }
    }

    function handleMouseMove(event) {
       pointerX = event.pageX;
       pointerY = event.pageY;

       window.requestAnimationFrame(moveAround);
    }

    function checkPrevious() {
        for(let i = 0; i < moved.length; i++) {
            let originX = moved[i].getAttribute('x');
            let originY = moved[i].getAttribute('y');

            if (Math.sqrt((originX - pointerX)**2 + (originY - pointerY)**2) > distance) {
                moved[i].style.left = originX + "px";
                moved[i].style.top = originY + "px";
                moved[i].classList.remove('moved');
                moved.splice(i, 1); 
            }
        }
    }

    function moveAround(timestamp) {
        let sectionSize = distance / 15;
        checkPrevious();

        for (let x = pointerX - distance; x < pointerX + distance; x += sectionSize) {
            for (let y = pointerY - distance; y < pointerY + distance; y += sectionSize) {
                             
                let element = document.elementFromPoint(x, y);

                if (element && element.classList.contains('dot') 
                && Math.sqrt((x - pointerX)**2 + (y - pointerY)**2) < distance) {
                    let angle = Math.atan2(pointerY - y, pointerX - x);
                    
                    element.style.left = pointerX - Math.cos(angle) * (distance + 100) + "px";
                    element.style.top = pointerY - Math.sin(angle) * (distance + 100) + "px";
                    element.classList.add('moved');

                    moved.push(element);
                }
            }
        }
    }

    init();
    window.requestAnimationFrame(moveAround);
})();

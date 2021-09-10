var avoidTheMouse = (function mouse() {
    document.body.onmousemove = handleMouseMove;
    
    let moved = [];
    let dots = [];
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
                dots.push({
                    x: currentX,
                    y: currentY,
                    element: elem
                });
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

    function moveAround() {
        checkPrevious();

        for (let i = 0; i < dots.length; i++) {
            if (Math.sqrt((dots[i].x - pointerX)**2 + (dots[i].y - pointerY)**2) < distance) {
                let angle = Math.atan2(pointerY - dots[i].y, pointerX - dots[i].x);
                    
                dots[i].element.style.left = pointerX - Math.cos(angle) * (distance + 100) + "px";
                dots[i].element.style.top = pointerY - Math.sin(angle) * (distance + 100) + "px";
                dots[i].element.classList.add('moved');

                moved.push(dots[i].element);
            }
        }
    }

    init();
    window.requestAnimationFrame(moveAround);
})();

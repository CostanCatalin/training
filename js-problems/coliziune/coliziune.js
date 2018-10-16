var coliziune = (function coliziune(){
    const clicked = [false, false, false, false];

    let circle1 = document.querySelector('.wrapper-circles .circle-1');
    let circle2 = document.querySelector('.wrapper-circles .circle-2');
    let square1 = document.querySelector('.wrapper-squares .square-1');
    let square2 = document.querySelector('.wrapper-squares .square-2');
    let startC = window.innerHeight / 2;

    function init() {
        positionAndEvents(circle1, 0, true);
        positionAndEvents(circle2, 1, true);
        positionAndEvents(square1, 2, false);
        positionAndEvents(square2, 3, false);
    }

    function positionAndEvents(item, itemIdx, isCircle) {
        let offset = isCircle ? startC : 0; 

        let wrapper = isCircle ? '.wrapper-circles' : '.wrapper-squares';

        item.style.left = Math.random() * (window.innerWidth - size) + "px";
        item.style.top = Math.random() * (window.innerHeight / 2 - size)  + "px";
        item.style.width = size + "px";
        item.style.height = size + "px";

        if (isCircle) {
            circlesOverlapping();
        } else {
            squaresOverlapping();
        }

        item.addEventListener('mousedown', function(e) {
            clicked[itemIdx] = true;
            e.target.classList.add('focused');
        });

        item.addEventListener('mouseup', function(e) {
            clicked[itemIdx] = false;
            e.target.classList.remove('focused');
        });

        document.querySelector(wrapper).addEventListener('mousemove', function(e) {
            if (clicked[itemIdx]) {
                let newY = e.pageY - size / 2;

                if (isCircle && newY > startC 
                    || !isCircle && newY < startC - size) {

                        item.style.left = e.pageX - size / 2;
                        item.style.top = e.pageY - offset - size / 2;
                }

                if (isCircle) {
                    circlesOverlapping();
                } else {
                    squaresOverlapping();
                }
            }
        });
    }

    function circlesOverlapping() {
        // adding (size/2) to each coordinate would point to the center of the element
        // however, (x1 + size / 2) - (x2 + size / 2) === x1 - x2  
        let c1X = circle1.getBoundingClientRect().left;
        let c1Y = circle1.getBoundingClientRect().top; 

        let c2X = circle2.getBoundingClientRect().left;
        let c2Y = circle2.getBoundingClientRect().top; 

        if (Math.sqrt(Math.pow(c1X - c2X, 2) + Math.pow(c1Y - c2Y, 2)) < size) {
            circle1.classList.add('active');
        } else {
            circle1.classList.remove('active');
        }
    }

    function squaresOverlapping() {
        let rect1 = square1.getBoundingClientRect(); 
        let rect2 = square2.getBoundingClientRect();
        let tooClose = Math.sqrt(Math.pow(rect1.left - rect2.left, 2) + Math.pow(rect1.top - rect2.top, 2)) < size;

        if ( tooClose
            
         
         
        ) {
            square1.classList.add('active');
        } else {
            square1.classList.remove('active');
        }
    }

    return init;
})();

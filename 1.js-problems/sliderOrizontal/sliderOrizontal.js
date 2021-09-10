(function slider() {
    var Min = -400;
    let currentValue = Min;
    var Max = 540;
    let currentValueDisplay = document.querySelector('.current-value'); 
    let button = document.querySelector('.button');
    let slider = document.querySelector('.slider');
    let bar = document.querySelector('.bar');
    let barRect = bar.getBoundingClientRect();
    let barWidth = barRect.right - barRect.left - button.offsetWidth;
    let clicked = false;

    function init() {
        console.log("slider initialized");
        document.querySelector('.min-value').innerText = Min;
        document.querySelector('.max-value').innerText = Max;
        currentValueDisplay.innerText = Min;

        slider.addEventListener('mousedown', mouseDownListener);   
        window.addEventListener('resize', windowResizedListener);   
        // slider.addEventListener('mousedown', function(e) {
        // });
    }

    function mouseDownListener(e) {
        clicked = true;
        document.body.addEventListener('mouseup', mouseUpListener);
        document.body.addEventListener('mousemove', mouseMoveListener);
        currentValueFromPointer(e.pageX);
    }

    function mouseUpListener(e) {
        clicked = false;
        document.body.removeEventListener('mouseup', mouseUpListener);
        document.body.removeEventListener('mousemove', mouseMoveListener);
    }

    function mouseMoveListener(e) {
        if (clicked) {
            currentValueFromPointer(e.pageX);
        }
    }

    function windowResizedListener(e) {
        barRect = bar.getBoundingClientRect();
        barWidth = barRect.right - barRect.left - button.offsetWidth;

        let percent = (currentValue - Min) / (Max - Min);

        button.style.left =  barWidth * percent + "px";
    }

    function currentValueFromPointer(pointerX) {
        let clickOffsetX = pointerX - barRect.left;

        if (clickOffsetX < 0) {
            clickOffsetX = 0;
        }

        if (clickOffsetX > barWidth) {
            clickOffsetX = barWidth;
        }

        button.style.left = clickOffsetX + "px";

        currentValue = Min + Math.round(clickOffsetX / barWidth * (Max - Min));
        currentValueDisplay.innerText = currentValue;
    }

    init();
})();
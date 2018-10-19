(function slider() {
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

        button.addEventListener('mousedown', function(e) {
            clicked = true;
        });

        slider.addEventListener('mouseup', function(e) {
            clicked = false;
        });

        slider.addEventListener('mousemove', function(e) {
            if (clicked) {
                currentValueFromPointer(e.pageX);
            }
        });

        bar.addEventListener('click', function(e) {
            currentValueFromPointer(e.pageX);
        });
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

        let currentValue = Min + Math.round(clickOffsetX / barWidth * (Max - Min));
        currentValueDisplay.innerText = currentValue;
    }

    init();
})();
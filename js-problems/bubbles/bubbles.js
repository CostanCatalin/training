(function(){
    document.body.onmousemove = handleMouseMove;
    document.body.onmouseenter = handleMouseMove;

    let dest = document.querySelector('body');
    let topLimit = 200;
    let bubblesPerSec = 20;
    let bubbles = [];
    let pointerX;
    let pointerY;
    let lastBubbleTimestamp = null;

    function init() {
        window.requestAnimationFrame(handleBubbles);
    }

    function handleMouseMove(event) {
        pointerX = event.pageX;
        pointerY = event.pageY;
    }

    function handleBubbles(timestamp) {
        if (lastBubbleTimestamp == null) {
            lastBubbleTimestamp = timestamp - 1000;
        }
        
        if (timestamp - lastBubbleTimestamp >= 1000 / bubblesPerSec) {
            createBubble(timestamp);
            lastBubbleTimestamp = timestamp;
        }

        moveBubbles(timestamp);
        deleteBubblesThatArrived();
        window.requestAnimationFrame(handleBubbles);
    }

    function moveBubbles(timestamp) {
        for(let i = 0; i < bubbles.length; i++) {
            let newTop = parseInt(bubbles[i].bubble.style.top.replace('px', ''));
            let newLeft =  bubbles[i].initialLeft;

            newTop -= (timestamp - bubbles[i].creationTimestamp) / 1000 * bubbles[i].size/4;

            let currentRads = (timestamp - bubbles[i].creationTimestamp) / 100  % (2 * Math.PI);
            let sin = Math.round(Math.sin(currentRads));

            let difference =  sin * (bubbles[i].size * 5);
            
            if (bubbles[i].initialTop - newTop <= 100) {
                newLeft += difference % 100;
            } else {
                newLeft += difference;
            }
            
            bubbles[i].bubble.style.left = newLeft + "px";
            bubbles[i].bubble.style.top = newTop + "px";          
        }
    }

    function createBubble(timestamp) {
        if (pointerX === undefined && pointerY === undefined) {
            return;
        }

        let bubbleSize = minSize + Math.random() * (maxSize - minSize);
        let bubble = document.createElement('div');
        
        bubble.classList.add('bubble');

        bubble.style.top = pointerY - bubbleSize / 2 + "px";
        bubble.style.left = pointerX - bubbleSize / 2 + "px";
        bubble.style.width = bubbleSize + "px";
        bubble.style.height = bubbleSize + "px";
        
        bubbles.push({
            bubble: bubble,
            creationTimestamp: timestamp,
            size: bubbleSize,
            initialTop: pointerY - bubbleSize / 2,
            initialLeft: pointerX - bubbleSize / 2
        });
        dest.appendChild(bubble);
    }

    function deleteBubblesThatArrived() {
        for (let i = 0; i < bubbles.length; i++) {
            let bubbleTop = bubbles[i].bubble.style.top.replace('px', '');
            if (parseInt(bubbleTop) + bubbles[i].size < topLimit) {
                bubbles[i].bubble.remove();
                bubbles.splice(i, 1); 
                i--;
            }
        }
    }

    init();
})();
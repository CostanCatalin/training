var patrate = (function(){
    const canvas = document.getElementById("canvas");

    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    function patrate(depth, length, currentX, currentY) {
        if (depth == 0) {
            return;
        }

        if (currentX == undefined || currentY == undefined) {
            currentX = 450;
            currentY = 450;
        }
        
        createSquare(currentX - length / 2, currentY - length / 2, length, depth ** 1.5);

        length = length / 2;
        setTimeout(function children() {
            patrate(depth-1, length, currentX - length, currentY - length);
            patrate(depth-1, length, currentX - length, currentY + length);
            patrate(depth-1, length, currentX + length, currentY - length);
            patrate(depth-1, length, currentX + length, currentY + length);
        }, 300);
    }

    function createSquare(X, Y, length, lineWidth) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.border = lineWidth + "px solid #" + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
        square.style.top = X + "px";
        square.style.left = Y + "px";
        square.style.width = length + "px";
        square.style.height = length + "px";
        square.animate([
            {
                top: X + length/2 + "px",
                left: Y + length/2 + "px",
                width: "0px",
                height: "0px"
            }, {
                top: X + "px",
                left: Y  + "px",
                width: length + "px",
                height: length + "px"
            }
        ], { 
            duration: 1000,
            easing: "cubic-bezier(0.64, 0.57, 0.67, 1.53)" 
        });
        canvas.append(square);
    }
    
    return patrate;
})();
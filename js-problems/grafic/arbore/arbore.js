var arbore = (function(){
    var canvas = document.getElementById("arbore");
    var angleParam;
    var ctx = canvas.getContext("2d");
    canvas.setAttribute('width', '900px');
    canvas.setAttribute('height', '900px');
    ctx.moveTo(canvas.width/2, canvas.height);


    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    function arbore(depth, length, lengthScale, angle, currentX, currentY) {
        ctx.moveTo(currentX, currentY);
        if (depth == 0) {
            return;
        }

        if (currentX == undefined || currentY == undefined) {
            currentX = canvas.width/2;
            currentY = canvas.height - length;
            angleParam = angle;
            angle -= 125;
        } else {
            currentX = currentX + length * lengthScale * Math.cos(Math.radians(angle));
            currentY = currentY + length * lengthScale * Math.sin(Math.radians(angle));
        }

        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        length = length * lengthScale;

        setTimeout(function children() {
            arbore(depth-1, length, lengthScale, angle + angleParam, currentX, currentY);
            arbore(depth-1, length, lengthScale, angle - angleParam, currentX, currentY);
        }, 200);
    }
    
    return arbore;
})();

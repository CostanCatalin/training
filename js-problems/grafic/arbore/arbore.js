var arbore = (function(){
    var canvas = document.getElementById("arbore");
    var angleParam;
    var ctx = canvas.getContext("2d");
    canvas.setAttribute('width', '900px');
    canvas.setAttribute('height', '900px');


    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    function arbore(depth, length, lengthScale, angle, currentX, currentY) {
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        if (depth == 0) {
            return;
        }else if (depth == 1) {
            ctx.strokeStyle = "#83c684";
        }

        if (currentX == undefined || currentY == undefined) {
            ctx.moveTo(canvas.width/2, canvas.height);
            ctx.strokeStyle = "#5c2416";
            currentX = canvas.width/2;
            currentY = canvas.height - length;
            angleParam = angle;
            angle += -angle - 90;
        } else {
            currentX = currentX + length * lengthScale * Math.cos(Math.radians(angle));
            currentY = currentY + length * lengthScale * Math.sin(Math.radians(angle));
        }

        ctx.lineTo(currentX, currentY);
        ctx.lineWidth = depth * 1.35;
        ctx.stroke();
        length = length * lengthScale;

        setTimeout(function children() {
            arbore(depth-1, length, lengthScale, angle + angleParam + depth*2, currentX, currentY);
            arbore(depth-1, length, lengthScale, angle - angleParam - depth*2, currentX, currentY);
        }, 75);
        ctx.closePath();
    }
    
    return arbore;
})();

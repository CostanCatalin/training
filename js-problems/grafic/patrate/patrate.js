var patrate = (function(){
    var canvas = document.getElementById("patrate");
    var angleParam;
    var ctx = canvas.getContext("2d");
    canvas.setAttribute('width', '900px');
    canvas.setAttribute('height', '900px');
    ctx.moveTo(canvas.width/2, canvas.height/2);


    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    function patrate(depth, length, currentX, currentY) {
        ctx.moveTo(currentX, currentY);
        if (depth == 0) {
            return;
        }

        if (currentX == undefined || currentY == undefined) {
            currentX = canvas.width/2;
            currentY = canvas.height/2;
        }
        
        ctx.rect(currentX - length / 2, currentY - length / 2, length, length);
        ctx.lineWidth = depth ** 1.5;
        ctx.stroke();

        
        length = length / 2;
        setTimeout(function children() {
            patrate(depth-1, length, currentX - length, currentY - length);
            patrate(depth-1, length, currentX - length, currentY + length);
            patrate(depth-1, length, currentX + length, currentY - length);
            patrate(depth-1, length, currentX + length, currentY + length);
        }, 300);
    }
    
    return patrate;
})();
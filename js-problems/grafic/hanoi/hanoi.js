var hanoi = (function hanoiWrapper() {
    var canvas = document.getElementById("hanoi");
    canvas.setAttribute('width', '900px');
    canvas.setAttribute('height', '900px');
    var inaltimeTija = canvas.height * 0.5;
    var latimeDisk = 35;
    var ctx = canvas.getContext("2d");
    var gameDisks = [];
    var disksColors = [];

    var gameWidth = canvas.width * 0.75;
    var tije = [
        gameWidth * 1/6 + canvas.width * 0.125,
        gameWidth * 3/6 + canvas.width * 0.125,
        gameWidth * 5/6 + canvas.width * 0.125
    ];

    function draw() {
        ctx.moveTo(tije[0], canvas.height);
        ctx.lineWidth = 10;
        ctx.lineTo(tije[0], canvas.height - inaltimeTija);
    
        ctx.moveTo(tije[1], canvas.height);
        ctx.lineWidth = 10;
        ctx.lineTo(tije[1], canvas.height - inaltimeTija);
    
        ctx.moveTo(tije[2], canvas.height);
        ctx.lineWidth = 10;
        ctx.lineTo(tije[2], canvas.height - inaltimeTija);
        ctx.stroke();
    }


    function hanoi (disks) {
        draw();

        for (let i = 0; i < disks; i++) {
            gameDisks.push(50 + (gameWidth / (3 * disks)) * i);
            disksColors.push("#" + Math.floor(Math.random()*16777215).toString(16));
        }

        for(let i = disks-1; i >= 0; i--) {
            ctx.fillStyle= disksColors[i];
            ctx.fillRect(tije[0]  - gameDisks[i] /2, canvas.height - (disks-i) * latimeDisk, gameDisks[i], latimeDisk);
            ctx.stroke();
        }

        

        // Procedure Hanoi(disk, source, dest, aux)

        //     IF disk == 1, THEN
        //         move disk from source to dest             
        //     ELSE
        //         Hanoi(disk - 1, source, aux, dest)     // Step 1
        //         move disk from source to dest          // Step 2
        //         Hanoi(disk - 1, aux, dest, source)     // Step 3
        //     END IF
            
        //     END Procedure


        return gameDisks;
    }

    return hanoi;
})();
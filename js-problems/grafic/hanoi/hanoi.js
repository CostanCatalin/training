var hanoi = (function hanoiWrapper() {
    const gameWidth = 800;
    const diskHeight = 35;
    const minDiskWidth = 50;
    const maxDiskWidth = 200;
    let rods;

    const rodsPositioning = [
        gameWidth * 1/6,
        gameWidth * 3/6,
        gameWidth * 5/6
    ];

    function init(disks) {
        let game = document.querySelector("#canvas");

        game.querySelectorAll('.disk').forEach(function(item) {
            item.remove();
        });

        rods = [[], [], []];

        for (let i = 0; i < disks; i++) {
            let newDisk = document.createElement("div");
            newDisk.classList.add("disk", "disk-" + i);
            newDisk.style.left = rodsPositioning[0] + "px";
            newDisk.style.bottom = (disks - i - 1) * diskHeight + "px";
            newDisk.style.width = minDiskWidth + maxDiskWidth / (disks / i) + "px";
            newDisk.style.transform = "translateX(-50%)";
            newDisk.style.backgroundColor = "#" + Math.floor(Math.random()*16777214).toString(16);
            game.appendChild(newDisk);
        }
    }

    function animateMove(diskIdx, rodIdx, currentStackHeight) {
        let disk = document.querySelector(".disk-" + diskIdx);

        if (disk != undefined) {
            disk.animate([
                {
                    left: disk.style.left,
                    bottom: disk.style.bottom
                },{
                    left: disk.style.left,
                    bottom: "500px"
                },{
                    left:  rodsPositioning[rodIdx] + "px",
                    bottom: "500px"
                }, {
                    left: rodsPositioning[rodIdx] + "px",
                    bottom: "0px"
                }
            ], { 
                duration: 200
            });
            disk.style.left = rodsPositioning[rodIdx] + "px";
            disk.style.bottom = currentStackHeight * diskHeight + "px";
        }
    }

    function manager (disks) {
        init(disks);
        
        let numOfMoves = 2**disks - 1;
        for (let i = disks - 1; i >= 0; i--) {
            rods[0].push(i);
        }

        for (let i = 1; i <= numOfMoves; i++) { 
            setTimeout(function() {
                if (i % 3 == 1) {
                    moveDisksBetweenTwoPoles(0, 1); 
                } else if (i % 3 == 2) {
                    moveDisksBetweenTwoPoles(0, 2); 
                } else if (i % 3 == 0) {
                    moveDisksBetweenTwoPoles(2, 1); 
                }
            }, 200 * i);
        } 

        return rods;
    }

    function moveDisksBetweenTwoPoles(source, destination) {
        let disk1 = rods[source].pop();
        let disk2 = rods[destination].pop();

        if (disk1 === undefined) {
            animateMove(disk2, source, rods[source].length);
            rods[source].push(disk2);

        } else if (disk2 === undefined) {
            animateMove(disk1, destination, rods[destination].length);
            rods[destination].push(disk1);

        } else if (disk2 > disk1) {
            rods[destination].push(disk2);
            rods[destination].push(disk1);
            animateMove(disk1, destination, rods[destination].length - 1);

        } else {
            rods[source].push(disk1);
            rods[source].push(disk2);
            animateMove(disk2, source, rods[source].length - 1);
        }
    }

    return manager;
})();
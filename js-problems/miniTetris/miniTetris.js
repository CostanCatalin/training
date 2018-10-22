(function tetris() {
    let game = document.querySelector('.wrapper .game');
    let paused = false;
    let speedy = false;
    let lines = 15;
    let columns = 4;
    let speed = 15;
    let completed = 0;
    const squareSize = 15;
    let wasReset = false;
        
    let currentObj;
    let matrix;
    let startPosition;


    function init() {
        function initializeMatrix() {
            result = []
    
            for (let i = 0; i < lines; i++) {
                result.push([]);
                for (let j = 0; j < columns; j++) {
                    result[i].push(0);
                }
            }
    
            return result;
        }

        game.style.width = squareSize * columns + "px";
        game.style.height = squareSize * lines + "px";
        game.innerHTML = '';
        startPosition = Math.floor(columns / 2);
        matrix = initializeMatrix();
        document.querySelector(".completed").innerText = completed;

        // game logic
        currentObj = createNewObj();

        if (!wasReset) {
            setOptionsInputs(); 
            interval = setTimeout(gameFunction, Math.round(1000 / getSpeed()));           
        }
    }

    function setOptionsInputs(){
        let linesInput = document.querySelector("input[name='lines']");
        let columnsInput = document.querySelector("input[name='columns']");
        let speedInput = document.querySelector("input[name='speed']");

        let pause = document.getElementById("pause");
        let reset = document.getElementById("reset");

        function pauseClicked(e) {
            if (!paused) {
                pause.setAttribute("value", "Unpause");
                paused = true;
            } else {
                pause.setAttribute("value", "Pause");
                paused = false;
                setTimeout(gameFunction, 1000 / getSpeed());
            }
        }

        linesInput.value = lines;
        columnsInput.value = columns;
        speedInput.value = speed;

        pause.addEventListener("click", pauseClicked);

        reset.addEventListener("click", resetClicked);

        linesInput.addEventListener("focusout", function newLines(e) {
            lines = e.target.value <= 33 ? e.target.value : 33;
            init();
        });

        columnsInput.addEventListener("focusout", function newColumns(e) {
            columns = lines = e.target.value <= 33 ? e.target.value : 33;
            init();
        });

        speedInput.addEventListener("focusout", function newSpeed(e) {
            speed = e.target.value;
        });

        window.addEventListener("keydown", function keyPressed(e) {
            switch(e.key) {
                case 'ArrowLeft': 
                    if (!paused && currentObj != null && currentObj.x > 0
                        && matrix[currentObj.y][currentObj.x - 1] == 0) {
                        currentObj.x--;
                        currentObj.element.style.left = currentObj.x * squareSize + "px";
                    }
                    break;

                case 'ArrowRight':
                    if (!paused && currentObj != null && currentObj.x < columns - 1
                        && matrix[currentObj.y][currentObj.x + 1] == 0) {
                        currentObj.x++;
                        currentObj.element.style.left = currentObj.x * squareSize + "px";
                    }
                    break;

                case 'ArrowDown':
                    speedy = true;
                    break;

                case 'p':
                    let message = paused ? "Unpause" : "Pause";
                    pauseClicked();
                    console.log(message);
                    break;

                case 'r':
                    resetClicked();
                    console.log("Reset");
                    break;
            }
        });

        window.addEventListener("keyup", function keyPressed(e) {
           if (e.key == 'ArrowDown') {
                speedy = false;
           }
        });
    }
    
    function resetClicked() {
        lines = 20;
        columns = 6;
        speed = 5;
        completed = 0;
        wasReset = true;
        init();
    }

    function createNewObj() {
        let element = document.createElement('div');
        element.classList.add('square');

        element.style.left = startPosition * squareSize + "px";
        game.append(element);

        return {
            element: element,
            x: startPosition,
            y: 0,
        };
    }

    function gameFunction() {
        if (paused) {
            return;
        }
        
        if (currentObj.y == getTop()) {
            
            if (!placeObjectIntoMatrix()) {
                gameOver();
                return;
            } else {
                checkLine();
            }

            currentObj = createNewObj();
        } else {
            currentObj.y++;
            currentObj.element.style.top = currentObj.y * squareSize + "px";
        }

        setTimeout(gameFunction, 1000 / getSpeed() );
    }

    function getTop() {
        let currentColLastItem = lines;

        for (let i = 0; i < lines; i++) {
            if (matrix[i][currentObj.x] != 0) {
                currentColLastItem = i;
                break;
            }
        }

        return currentColLastItem - 1;
    }

    function placeObjectIntoMatrix() {
        if (currentObj.y == 0 || matrix[currentObj.y][currentObj.x] != 0) {
            return false;
        }
        matrix[currentObj.y][currentObj.x] = 1;
        return true;
    }

    function checkLine() {
        function matrixShift(line) {
            let newLine = matrix[line].map(x => 0);
            matrix.splice(line, 1);
            matrix.unshift(newLine);
        }

        for(let i = lines - 1; i >= 0; i--) {
            let lineFound = true;
            for (let j = 0; j < columns; j++) {
                if (matrix[i][j] == 0) {
                    lineFound = false;
                }
            }

            if (lineFound) {
                completed++;
                document.querySelector(".completed").innerText = completed;
                matrixShift(i);
                
                for (let i = 0; i < game.children.length; i++) {
                    let current = game.children[i];

                    if (parseInt(current.style.top.replace('px', '')) == lines * squareSize) {
                        current.remove();
                        i--;
                    } else {
                        current.style.top = parseInt(current.style.top.replace('px', '')) + squareSize + "px";
                    }
                }
            }
        }
    }

    function gameOver() {
        let response = confirm(completed + " lines is ok, I guess. Can you do better?");
        if (response == true) {
            wasReset = true;
            completed = 0;
            init();
            setTimeout(gameFunction, 1000/ getSpeed());
        }
    }

    function getSpeed() {
        return speedy ? 55 : speed;
    }
    init();
})();
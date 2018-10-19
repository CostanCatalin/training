(function tetris() {
    let paused = false;
    let lines;
    let columns;
    let speed;
    let completed;

    function init() {
        lines = 20;
        columns = 5;
        speed = 1;
        completed = 0;
        setOptionsInputs();
        setCompleted();
    }

    function setOptionsInputs(){
        let linesInput = document.querySelector("input[name='lines']");
        let columnsInput = document.querySelector("input[name='columns']");
        let speedInput = document.querySelector("input[name='speed']");

        let pause = document.getElementById("pause");
        let reset = document.getElementById("reset");

        linesInput.value = lines;
        columnsInput.value = columns;
        speedInput.value = speed;

        pause.addEventListener("click", function pauseClicked(e) {
            if (!paused) {
                pause.setAttribute("value", "Unpause");
                paused = true;
            } else {
                pause.setAttribute("value", "Pause");
                paused = false;
            }
        });

        reset.addEventListener("click", function resetClicked(e) {
            init();
        });

        linesInput.addEventListener("focusout", function newLines(e) {
            lines = e.target.value;
        });

        columnsInput.addEventListener("focusout", function newColumns(e) {
            columns = e.target.value;
        });

        speedInput.addEventListener("focusout", function newSpeed(e) {
            speed = e.target.value;
        });
    }

    function setCompleted() {
        document.querySelector(".completed").innerText = completed;
    }

    init();
})();
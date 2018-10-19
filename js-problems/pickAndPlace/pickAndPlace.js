(function pickAndPlace() {
    let matrix1 = document.querySelector('.matrix-1');
    let matrix2 = document.querySelector('.matrix-2');
    let wrapper = document.querySelector('body');
    const elementSize = 55; // 50 width + 3 margin + 2 from borders
    let currentSelectedItem = null;
    const elementsM2 = [];

    function init() {
        matrix1.style.width = columns * elementSize - 3 + "px";
        matrix1.style.height = lines * elementSize - 3 + "px";

        matrix2.style.width = columns * elementSize - 3 + "px";
        matrix2.style.height = lines * elementSize - 3 + "px";

        for (let line = 0; line < lines; line++) {
            elementsM2[line] = []
            for (let column = 0; column < columns; column++) {
                elementsM2[line][column] = false;

                matrix1.appendChild(createElement(line, column, true));
                matrix2.appendChild(createElement(line, column, false));
            }
        }

        matrix1.addEventListener('mousedown', function mouseClickedOnMatrix1(e){
            if (!e.target.classList.contains('element') || e.target.classList.contains('hide')) {
                currentSelectedItem = null;
                return;
            }
            let coord = e.target.querySelector('span').innerText.split('');
            e.target.classList.add('transparent');

            let copy = createElement(coord[0], coord[1], true);
            copy.classList.add('moving');
            copy.style.left = e.pageX - elementSize / 2 + "px";
            copy.style.top = e.pageY - elementSize / 2 + "px";
            
            wrapper.append(copy);        
            currentSelectedItem = copy;
        });

        wrapper.addEventListener('mousemove', function mouseMove(e) {
            if (currentSelectedItem == null) {
                return;
            }
            currentSelectedItem.style.left = e.pageX - elementSize / 2 + "px";
            currentSelectedItem.style.top = e.pageY - elementSize / 2 + "px";
        });

        wrapper.addEventListener('mouseup', function mouseUp(e) {
            if (currentSelectedItem == null) {
                return;
            }

            let rect = matrix2.getBoundingClientRect();
            //click is not inside matrix 2
            if (!(rect.left <= e.pageX && e.pageX <= rect.right) || !(rect.top <= e.pageY && e.pageY <= rect.bottom)) {
                wrapper.querySelector('.moving').remove();
                let coord = currentSelectedItem.querySelector('span').innerText.split('');

                matrix1.querySelector('.element-' + coord[0] + '-' + coord[1]).classList.remove('transparent');
                currentSelectedItem = null;
                return;
            }

            let line = Math.ceil((e.pageY - rect.top) / elementSize) - 1;
            let column = Math.ceil((e.pageX - rect.left) / elementSize) - 1;

            if (elementsM2[line][column] == true) {
                let moving = wrapper.querySelector('.moving');
                if (moving) {
                    wrapper.querySelector('.moving').remove();
                }
                matrix1.querySelector('.transparent').classList.remove('transparent');
                return;
            }

            let result = currentSelectedItem.cloneNode(1);
            result.classList.remove('moving');
            result.style.left = column * elementSize + "px"; 
            result.style.top = line * elementSize + "px";
            document.querySelector('.placeholder-' + line + '-' + column).replaceWith(result);
            
            wrapper.querySelector('.moving').remove();
            matrix1.querySelector('.transparent').remove();
            elementsM2[line][column] = true;
            currentSelectedItem = null;
        });

        matrix2.addEventListener('mousedown', function mouseClickedOnMatrix2(e){
            if (!e.target.classList.contains('element')) {
                return;
            }

            let rect = matrix2.getBoundingClientRect();
            let line = Math.ceil((e.pageY - rect.top) / elementSize) - 1;
            let column = Math.ceil((e.pageX - rect.left) / elementSize) - 1;

            let coord = e.target.querySelector('span').innerText.split('');
            let result = e.target.cloneNode(1);
            result.style.left = coord[1] * elementSize + "px";
            result.style.top = coord[0] * elementSize + "px";
            matrix1.appendChild(result);

            e.target.replaceWith(createElement(line, column, false));
            elementsM2[line][column] = false;
        });
    }

    function createElement(line, column, isElem) {
        element = document.createElement('div');

        if (!isElem) {
            element.classList.add('placeholder', 'placeholder-' + line + '-' + column);
        } else {
            element.classList.add('element', 'element-' + line + '-' + column);
            let number = document.createElement('span');

            number.innerText = line + '' + column;
            element.append(number);
        }

        element.style.left = column * elementSize + "px";
        element.style.top = line * elementSize + "px";
        
        return element;
    }

    init();
})();
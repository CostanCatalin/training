let PaintScreen = (function initializePaintScreen() {
    const activeClass = "group__button--active";

    function PaintScreen(destSelector, numberOfPixels, pixelSize) {
        this.dest = document.querySelector(destSelector);
        this.rect = this.dest.getBoundingClientRect();
        this.pixelSize = pixelSize;
        this.numberOfPixels = numberOfPixels;
        this.modeIsPencil = true;
        this.inAction = false;
        this.matrix = [];

        this.initialize();
    }

    Object.assign(PaintScreen.prototype, {
        initialize: function() {
            this.dest.style.maxWidth = this.numberOfPixels + (this.pixelSize - this.numberOfPixels % this.pixelSize) + "px";

            let lineSize = this.numberOfPixels / this.pixelSize;

            for (let i = 0; i < lineSize; i++) {
                this.matrix.push([]);

                for (let j = 0; j < lineSize; j++) {
                    let newPixel = new Button('');
                    
                    this.dest.appendChild(newPixel.element);
                    this.matrix[this.matrix.length - 1].push(newPixel);
                }
            }
            
            window.addEventListener('keydown', this.shortcuts.bind(this));
            this.dest.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        },
        undo: function() {
            console.log("undo");
        },
        redo: function() {
            console.log("redo");
        },
        shortcuts: function(e) {
            if (!e.ctrlKey || e.key.toLowerCase() != 'z') {
                return;
            }

            if (e.shiftKey) {
                this.redo();
            } else {
                this.undo();
            } 
        },
        mouseDownHandler: function(e) {
            this.inAction = true;
            
            window.addEventListener('mouseup', this.mouseUpHandler.bind(this));
            window.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        },
        mouseMoveHandler: function(e) {
            if(this.inAction) {
                let btn = this.getElementByCoordinates(e.pageX, e.pageY);

                if (!btn) {
                    return;
                } 

                if (this.modeIsPencil) {
                    btn.element.classList.add(activeClass);
                } else {
                    btn.element.classList.remove(activeClass);
                }
            }
        },
        mouseUpHandler: function(e) {
            this.inAction = false;

            window.removeEventListener('mouseup', this.mouseUpHandler.bind(this));
            window.removeEventListener('mousemove', this.mouseMoveHandler.bind(this));
        },
        getElementByCoordinates: function(x, y) {
            this.rect = this.dest.getBoundingClientRect();

            if (this.rect.left > x || x > this.rect.right
                || this.rect.top > y || y > this.rect.bottom ) {
                    return false;
            }
            
            let relativeX = x - this.rect.left;
            let relativeY = y - this.rect.top;
            line = Math.ceil(relativeY / this.pixelSize);
            col = Math.ceil(relativeX / this.pixelSize);

            return this.matrix[line][col];
        }
    });

    return PaintScreen;
})();
let PaintScreen = (function initializePaintScreen() {
    const activeClass = "group__button--active";
    const eraserSize = 10;

    function PaintScreen(destSelector, numberOfPixels, pixelSize, initMatrix = null) {

        this.dest = document.querySelector(destSelector);
        this.rect = this.dest.getBoundingClientRect();
        this.pixelSize = pixelSize;
        this.numberOfPixels = numberOfPixels;
        this.modeIsPencil = true;
        this.inAction = false;
        this.actionChanges = [];
        this.matrix = [];
        this.initialize(initMatrix);

        // Important, otherwise the event handlers can't be un-binded
        this.mouseMoveHandlerWithContext = this.mouseMoveHandler.bind(this);
        this.mouseUpHandlerWithContext = this.mouseUpHandler.bind(this)
    }

    PaintScreen.prototype = new CustomEventTarget();
    PaintScreen.prototype.constructor = PaintScreen;

    Object.assign(PaintScreen.prototype, {
        initialize: function(initMatrix) {
            let style = document.createElement('style');
            style.innerHTML = '.wrapper .btn{ width: ' + this.pixelSize + 'px; height: ' +  this.pixelSize + 'px}';
            document.head.append(style);

            this.dest.style.maxWidth = this.numberOfPixels + (this.pixelSize - this.numberOfPixels % this.pixelSize) + "px";
            let lineSize = this.numberOfPixels / this.pixelSize;

            for (let i = 0; i <= lineSize; i++) {
                this.matrix.push([]);

                for (let j = 0; j <= lineSize; j++) {
                    let newPixel = new Pixel();

                    if (initMatrix && initMatrix[i][j].active) {
                        newPixel.setState(true);
                    }

                    this.dest.appendChild(newPixel.element);
                    this.matrix[this.matrix.length - 1].push(newPixel);
                }
            }

            this.dest.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        },

        reset: function() {
            if (!confirm("Delete everything and start from scratch?")) {
                return;
            }
            this.fire({type: "reset", data: true});
            location.reload();
            return;
        },

        mouseDownHandler: function() {
            this.inAction = true;
            this.actionChanges = [];
            
            document.body.addEventListener('mouseup', this.mouseUpHandlerWithContext);
            this.dest.addEventListener('mousemove', this.mouseMoveHandlerWithContext);
        },

        mouseMoveHandler: function(e) {
            if(!this.inAction) {
                return;
            }

            let coords = this.getElementByCoordinates(e.pageX, e.pageY);
        
            if (!coords) {
                return;
            }                  
            
            let btn = this.matrix[coords.line][coords.column];

            if (this.modeIsPencil && btn && !btn.active) {

                btn.setState(true);
                if (this.actionChanges.length > 0) {
                    this.completeInBetween(
                        {
                            line: this.actionChanges[this.actionChanges.length - 1].line,
                            column: this.actionChanges[this.actionChanges.length - 1].column
                        }, {
                            line: coords.line,
                            column: coords.column
                        }
                    );
                }
                this.actionChanges.push({line: coords.line, column: coords.column});
            } else if (!this.modeIsPencil) {
                this.eraseByCoords(coords.line, coords.column);
            }
        },

        mouseUpHandler: function() {
            this.inAction = false;

            if (this.actionChanges.length > 0) {
                this.fire({type: "new_move", data: {changes: this.actionChanges, pencil: this.modeIsPencil}});
                this.actionChanges = [];
            }

            this.fire({type: "update_matrix",data: this.matrix});

            document.body.removeEventListener('mouseup', this.mouseUpHandlerWithContext);
            this.dest.removeEventListener('mousemove', this.mouseMoveHandlerWithContext);
        },

        getElementByCoordinates: function(x, y) {
            this.rect = this.dest.getBoundingClientRect();

            if (this.rect.left > x || x > this.rect.right
                || this.rect.top > y || y > this.rect.bottom ) {
                    return false;
            }
            
            let relativeX = x - this.rect.left;
            let relativeY = y - this.rect.top;
            line = Math.ceil(relativeY / this.pixelSize) - 2;
            col = Math.ceil(relativeX / this.pixelSize) - 2;

            return { 
                line: line > 0 ? line : 0,
                column: col > 0 ? col : 0
            };
        },

        eraseByCoords: function(line, column) {
            let offset = Math.ceil(eraserSize / this.pixelSize);
            if (0 > line > this.matrix.length ||
                0 > column > this.matrix[0].length) {
                    return;
                }

            for (let i = line; i < this.matrix.length && i <= line + offset; i++ ) {
                for (let j = column; j < this.matrix[i].length && j <= column + offset; j++ ) {
                    if (this.matrix[i][j].active) {
                        this.matrix[i][j].setState(false);
                        this.actionChanges.push({line: i, column: j});
                    }
                }
            }
        },

        applyChanges: function(changes, isPencilMode) {
            for (let i = 0; i < changes.length; i++) {
                let btn = this.matrix[changes[i].line][changes[i].column];

                if (!isPencilMode && !btn.element.classList.contains(activeClass)) {
                    btn.setState(true);
                } else if (isPencilMode && btn.element.classList.contains(activeClass)){
                    btn.setState(false);
                }
            }
        },

        toggleMode: function() {
            this.modeIsPencil = !this.modeIsPencil;
            this.dest.classList.toggle("eraser");
        },

        completeInBetween: function(from, to) {
            let lineDiff = to.line - from.line;
            let colDiff = to.column - from.column;
            if (Math.abs(lineDiff) <= 1 && Math.abs(colDiff) <= 1) {
                return;
            }

            let maxDiff = Math.max(Math.abs(lineDiff), Math.abs(colDiff));

            for (let i = 1; i < maxDiff; i++) {
                let newLine = from.line + Math.round((i / maxDiff) * lineDiff);
                let newCol = from.column + Math.round((i / maxDiff) * colDiff);

                let btn = this.matrix[newLine][newCol];
                btn.setState(true);
                this.actionChanges.push({line: newLine, column: newCol});
            }

        }
    });

    return PaintScreen;
})();

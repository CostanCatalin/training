let PaintScreen = (function initializePaintScreen() {
    let _listeners = [];
    const activeClass = "group__button--active";
    const stackLimit = 30;
    const eraserSize = 10;

    function PaintScreen(destSelector, numberOfPixels, pixelSize) {
        this.storage = new StorageManager("paint_matrix");
        this.undoStack = new Stiva(stackLimit);
        this.redoStack = new Stiva(stackLimit);

        this.dest = document.querySelector(destSelector);
        this.rect = this.dest.getBoundingClientRect();
        this.pixelSize = pixelSize;
        this.numberOfPixels = numberOfPixels;
        this.modeIsPencil = true;
        this.inAction = false;
        this.actionChanges = [];
        this.matrix = [];
        this.initialize();
    }

    Object.assign(PaintScreen.prototype, {
        initialize: function() {
            let style = document.createElement('style');
            style.innerHTML = '.wrapper .btn{ width: ' + this.pixelSize + 'px; height: ' +  this.pixelSize + 'px}';
            document.head.append(style);

            this.dest.style.maxWidth = this.numberOfPixels + (this.pixelSize - this.numberOfPixels % this.pixelSize) + "px";
            let lineSize = this.numberOfPixels / this.pixelSize;

            let storedMatrix = this.storage.get();

            for (let i = 0; i <= lineSize; i++) {
                this.matrix.push([]);

                for (let j = 0; j <= lineSize; j++) {
                    let newPixel = new Pixel();

                    if (storedMatrix && storedMatrix[i][j].active) {
                        newPixel.setState(true);
                    }
                    this.dest.appendChild(newPixel.element);
                    this.matrix[this.matrix.length - 1].push(newPixel);
                }
            }

            window.addEventListener('keydown', this.shortcuts.bind(this));
            this.dest.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        },
        undo: function() {
            if (this.undoStack.get_size() == 0) {
                return;
            }
            let move = this.undoStack.pop();
            this.redoStack.push(move);
            
            this.applyChanges(move.changes, move.pencil);
            this.storage.set(this.matrix);

            this.fire({type: "has_redo",data: true});
            if (this.undoStack.get_size() == 0) {
                this.fire({type: "has_undo",data: false});
            }
        },
        redo: function() {
            if (this.redoStack.get_size() == 0) {
                return;
            }
            let move = this.redoStack.pop();
            this.undoStack.push(move);

            this.applyChanges(move.changes, !move.pencil);
            this.storage.set(this.matrix);

            this.fire({type: "has_undo",data: true});
            if (this.redoStack.get_size() == 0) {
                this.fire({type: "has_redo",data: false});
            }
        },
        reset: function() {
            if (!confirm("Are you sure you want to delete all?")) {
                return;
            }
            this.storage.clear();
            location.reload();
            return;
        },
        shortcuts: function(e) {
            if (e.key.toLowerCase() == 't') {
                this.toggleMode();
                return;
            }

            if (e.key.toLowerCase() == 'd') {
                this.reset();
                return;
            }

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
            this.actionChanges = [];
            
            document.body.addEventListener('mouseup', this.mouseUpHandler.bind(this));
            this.dest.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
        },
        mouseMoveHandler: function(e) {
            if(this.inAction) {
                let coords = this.getElementByCoordinates(e.pageX, e.pageY);
            
                if (!coords) {
                    return;
                }                  
                
                let btn = this.matrix[coords.line][coords.column];

                if (this.modeIsPencil && btn && !btn.active) {
                    btn.setState(true);
                    this.actionChanges.push({line: coords.line, column: coords.column});
                } else if (!this.modeIsPencil) {
                    this.eraseByCoords(coords.line, coords.column);
                }
            }
        },
        mouseUpHandler: function(e) {
            this.inAction = false;

            if (this.actionChanges.length > 0) {
                this.undoStack.push({changes: this.actionChanges, pencil: this.modeIsPencil});
                this.actionChanges = [];
                this.redoStack.clear();

                this.fire({type: "has_undo",data: true});
                this.fire({type: "has_redo",data: false});
            }

            this.storage.set(this.matrix);
            document.body.removeEventListener('mouseup', this.mouseUpHandler);
            this.dest.removeEventListener('mousemove', this.mouseMoveHandler);
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

            line = line > 0 ? line : 0;
            col = col > 0 ? col : 0;

            return { 
                line: line,
                column: col
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
        addListener: function(type, listener){
  
            if (typeof _listeners[type] == "undefined"){
                _listeners[type] = [];
            }
  
            _listeners[type].push(listener);
        },
        fire: function(event){
  
            if (!event.target){
                event.target = this;
            }
  
            if (!event.type){ // falsy
                throw new Error("Event object missing 'type' property.");
            }
  
            if (_listeners && _listeners[event.type] instanceof Array){
                var listeners = _listeners[event.type];
                for (var i=0, len=listeners.length; i < len; i++){
                    listeners[i].call(this, event);
                }
            }
        },
    });

    return PaintScreen;
})();
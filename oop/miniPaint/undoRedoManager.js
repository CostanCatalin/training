let UndoRedoManager = (function UndoRedoModule() {
    const stackLimit = 30;

    function UndoRedoManager() {        
        this.undoStack = new Stiva(stackLimit);
        this.redoStack = new Stiva(stackLimit);
    }

    UndoRedoManager.prototype = new CustomEventTarget();
    UndoRedoManager.prototype.constructor = UndoRedoManager;

    Object.assign(UndoRedoManager.prototype, {
        undo: function() {
            if (this.undoStack.get_size() == 0) {
                return;
            }
            let move = this.undoStack.pop();
            this.redoStack.push(move);

            this.fire({type: "undo", data: move});
            this.fire({type: "has_redo", data: true});

            if (this.undoStack.get_size() == 0) {
                this.fire({type: "has_undo", data: false});
            }
        },

        redo: function() {
            if (this.redoStack.get_size() == 0) {
                return;
            }
            let move = this.redoStack.pop();
            this.undoStack.push(move);

            this.fire({type: "redo", data: move});
            this.fire({type: "has_undo", data: true});

            if (this.redoStack.get_size() == 0) {
                this.fire({type: "has_redo", data: false});
            }
        },

        newMove: function(move) {
            this.undoStack.push(move);
            this.redoStack.clear();
            this.fire({type: "has_undo", data: true});
            this.fire({type: "has_redo", data: false});
        }
    });

    return UndoRedoManager;
})();

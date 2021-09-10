let groups = [];

(function main() {
    const pixelSize = 3;
    const numberOfPixels = 600;

    let dest = document.querySelector('.controls');    
    let storage = new StorageManager("paint_matrix", {
        number: numberOfPixels,
        size: pixelSize
    });
    
    let paintScreen = new PaintScreen('.wrapper', numberOfPixels, pixelSize, storage.get());
    let undoRedoManager = new UndoRedoManager();

    groups.push(new Group('button', 0));
    groups.push(new Group('radio', 1));
    groups[0].addButton(new Button('Undo', false));
    groups[0].addButton(new Button('Redo', false));
    groups[0].addButton(new Button('Reset', true));

    groups[1].addButton(new Button('Pencil', true, true));
    groups[1].addButton(new Button('Eraser', true));

    dest.append(groups[0].element);
    dest.append(groups[1].element);

    // --  Paint Screen events
    paintScreen.addListener("new_move", function(e) {
        undoRedoManager.newMove(e.data);
    })

    paintScreen.addListener("update_matrix", function(e) {
        storage.set(e.data);
    });

    paintScreen.addListener("reset", function(e) {
        if (e.data) {
            storage.clear();
        }
    });

    // --  Undo/Redo events
    undoRedoManager.addListener("has_undo", function(e) {
        groups[0].getById(1).setActive(e.data);
    });

    undoRedoManager.addListener("has_redo", function(e) {
        groups[0].getById(2).setActive(e.data);
    });

    undoRedoManager.addListener("undo", function(e) {
        paintScreen.applyChanges(e.data.changes, e.data.pencil);
        storage.set(paintScreen.matrix);
    });

    undoRedoManager.addListener("redo", function(e) {
        paintScreen.applyChanges(e.data.changes, !e.data.pencil);
        storage.set(paintScreen.matrix);
    });

    // --  Button controls events
    groups[0].addListener("message", function(e) {
        groups[0].setSelected.call(groups[0], parseInt(e.data));

        if (e.target.name == "Reset") {
            paintScreen.reset();
        }
        if (e.target.name == "Undo") {
            undoRedoManager.undo();
        }
        if (e.target.name == "Redo") {
            undoRedoManager.redo();
        }
    });

    groups[1].addListener("message", function(e) {
        if (e.data <= 3) {
            return;
        }
        groups[1].setSelected.call(groups[1], parseInt(e.data));
        paintScreen.toggleMode();
    });
})();

let groups = [];

(function main() {
    let paintScreen = new PaintScreen('.wrapper', 600, 5);
    let dest = document.querySelector('.controls');

    groups.push(new Group('button', 0));
    groups.push(new Group('radio', 1));
    groups[0].addButton(new Button('Undo', false));
    groups[0].addButton(new Button('Redo', false));
    groups[0].addButton(new Button('Reset', true));

    groups[1].addButton(new Button('Pencil', true, true));
    groups[1].addButton(new Button('Eraser', true));


    groups[0].addListener("message", function(e) {
        groups[0].setSelected.call(groups[0], parseInt(e.data));

        if (e.target.name == "Reset") {
            paintScreen.reset();
        }
        if (e.target.name == "Undo") {
            paintScreen.undo();
        }
        if (e.target.name == "Redo") {
            paintScreen.redo();
        }
    });

    paintScreen.addListener("has_undo", function(e) {
        console.log(groups[0].getById(1));
            groups[0].getById(1).setActive(e.data);
    });

    paintScreen.addListener("has_redo", function(e) {
        console.log(groups[0].getById(2));
        groups[0].getById(2).setActive(e.data);
    });

    groups[1].addListener("message", function(e) {
        if (e.data <= 3) {
            return;
        }
        groups[1].setSelected.call(groups[1], parseInt(e.data));
        paintScreen.toggleMode();
    });

    dest.append(groups[0].element);
    dest.append(groups[1].element);
})();

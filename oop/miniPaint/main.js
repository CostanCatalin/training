(function main() {
    let paintScreen = new PaintScreen('.wrapper', 600, 5);
    let dest = document.querySelector('body');

    // let groups = [];
    // groups.push(new Group('button', 0));
    // groups[0].addButton(new Button('Button 4', true, false, null));
    // groups[0].addButton(new Button('Button 5', true, false, ''));
    // groups[0].addButton(new Button('Button 6', false, true, null));

    // for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
    //     let group = groups[groupIdx];

    //     group.addListener("message", function(e) {
    //         group.setSelected.call(group, parseInt(e.data));
    //     });

    //     dest.append(group.element);
    // };

})();

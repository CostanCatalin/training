let groups = (function getConfig() {
    
    let group1 = new Group('radio', 0, true, false, 'display: inline-block; background-color: green;');
    group1.addButton(new Button('Button 1', true, false, null));
    group1.addButton(new Button('Button 2', true, false, null));
    group1.addButton(new Button('Button 3', true, false, 'border: 2px solid red;'));

    let group2 = new Group('button', 1, true, false, 'background-color: blue; width: 100px;');
    group2.addButton(new Button('Button 4', true, false, null));
    group2.addButton(new Button('Button 5', true, false, ''));
    group2.addButton(new Button('Button 6', false, true, null));

    return  [
        group1,
        group2
    ];
})();
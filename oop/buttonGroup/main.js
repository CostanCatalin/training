let objects = [];

(function main() {
    let dest = document.querySelector('body .wrapper');

    function init() {

        for (let groupIdx = 0; groupIdx < config.groups.length; groupIdx++) {
            let element = config.groups[groupIdx];
            let groupObj = new Group(element.type, element.active, element.selected, element.customStyle);
            let group = groupObj.createEquivElement(groupIdx);

            for (let buttonIdx = 0; buttonIdx < element.buttons.length; buttonIdx++) {
                let button = element.buttons[buttonIdx];
                let btnObj = new Button(button.name, !button.disabled, button.selected, button.customStyle);
                groupObj.addButton(btnObj);

                group.append(btnObj.createEquivElement(groupObj.customStyle));
            };

            dest.append(group);
            objects.push(groupObj);
        };
    }

    init();
})();
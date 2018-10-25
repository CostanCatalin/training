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
                let btnObj = new Button(button.name, !button.disabled, button.selected, element.customStyle, button.customStyle);
                groupObj.addButton(btnObj);

                group.append(btnObj.displayElement(groupObj.customStyle));
            };

            groupObj.addListener("message", function(e) {
                groupObj.setSelected.call(groupObj, parseInt(e.data));
            });

            dest.append(group);
            objects.push(groupObj);
        };


    }


    init();
})();
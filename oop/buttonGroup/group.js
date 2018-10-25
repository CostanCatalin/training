let Group = (function groupModule() {

    function Group(type, active = true, selected = false, customStyle='') {
        if (!this instanceof Button) {
            return new Button();
        }

        this.buttons = [];
        this.type = type;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle;
    }

    Group.prototype.setState = function(selected) {
        if (this.active) {
            this.selected = selected;
        }
    }

    Group.prototype.addButton = function(button) {
        if (button instanceof Button) {
            this.buttons.push(button);
        }
    }

    Group.prototype.getSelected = function() {
        let res = [];

        this.buttons.forEach(function(element) {
            if (element.selected) {
                res.push(element);
            }
        })

        return res;
    }

    Group.prototype.getNotSelected = function() {
        let res = [];

        this.buttons.forEach(function(element) {
            if (!element.selected) {
                res.push(element);
            }
        })

        return res;
    }

    Group.prototype.setSelected = function(buttonId, selected) {
        let success = false;

        this.buttons.forEach(function(element) {
            if (element.id == buttonId) {
                let dest =  document.querySelector('.group__button[related-object-id="' + buttonId + '"]');
                element.selected = !element.selected;
                
                if (selected === undefined) {
                    dest.classList.toggle('group__button--selected');
                } else if (selected === true) {
                    dest.classList.add('group__button--selected');
                } else {
                    dest.classList.remove('group__button--selected');
                }
               
                success = true;
            }
        });

        if (success && this.type == 'checkbox') {
            this.buttons.forEach(function(element) {
                if (element.id != buttonId) {
                    element.selected = false;
                    let dest =  document.querySelector('.group__button[related-object-id="' + element.id + '"]');
                    dest.classList.remove('group__button--selected');
                }
            });
        }

        return success;
    }

    Group.prototype.createEquivElement = function(id) {
        let group = document.createElement('div');
        group.classList.add("group", "group-" + id);

        if (this.disabled == true) {
            group.classList.add("group--disabled");
        } else if (this.type == 'checkbox') {
            group.classList.add("group--checkbox");
        }

        return group;
    }


    return Group;
})();
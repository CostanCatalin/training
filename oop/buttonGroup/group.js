let Group = (function groupModule() {

    function Group(type, active = true, selected = false, customStyle='') {
        if (!this instanceof Group) {
            return new Group();
        }
        this.buttons = [];
        this.type = type;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle;
    }

    Group.prototype = new CustomEventTarget();

    Object.assign(Group.prototype, {
        setState: function(selected) {
            if (this.active) {
                this.selected = selected;
            }
        },

        addButton: function(button) {
            if (button instanceof Button) {
                this.buttons.push(button);
            }
        },

        getSelected: function() {
            let res = [];
    
            this.buttons.forEach(function(element) {
                if (element.selected) {
                    res.push(element);
                }
            })
    
            return res;
        },

        getNotSelected: function() {
            let res = [];
    
            this.buttons.forEach(function(element) {
                if (!element.selected) {
                    res.push(element);
                }
            })
    
            return res;
        },

        getById: function(buttonId) {
            let button = this.buttons.find(elem => elem.id == buttonId);
            return button;
        },

        setSelected: function(buttonId, selected) {

            element = this.getById(buttonId);
            if (!element) {
                return false;
            }

            element.selected = !element.selected;
            
            document.querySelector('.group__button[related-object-id="' + element.id + '"]').replaceWith(element.displayElement());
    
            if (this.type == 'radio') {
                this.buttons.forEach(function(element) {
                    if (element.id != buttonId) {
                        element.selected = false;
                        let dest =  document.querySelector('.group__button[related-object-id="' + element.id + '"]');
                        dest.classList.remove('group__button--selected');
                    }
                });
            }
        },

        createEquivElement: function(id) {
            let group = document.createElement('div');
            group.classList.add("group", "group-" + id);
    
            if (this.disabled == true) {
                group.classList.add("group--disabled");
            } else if (this.type == 'radio') {
                group.classList.add("group--radio");
            }
    
            return group;
        }
    });


    return Group;
})();
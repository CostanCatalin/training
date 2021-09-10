let Group = (function groupModule() {

    function Group(type, id, active = true, selected = false, customStyle='') {
        if (!this instanceof Group) {
            return new Group();
        }
        this.buttons = [];
        this.type = type;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle;
        this.element = this.createEquivElement(id);
    }

    Group.prototype = new CustomEventTarget();
    Group.prototype.constructor = Group;

    Object.assign(Group.prototype, {
        addButton: function(button) {
            if (button instanceof Button) {

                if (this.type == 'radio') {
                    button.element.classList.add('group__button--radio-button');
                }
                
                this.buttons.push(button);
                this.element.append(button.element);
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

        setSelected: function(buttonId) {

            element = this.getById(buttonId);
            if (!element) {
                return false;
            }

            element.selected = !element.selected;
            document.querySelector('.group__button[related-object-id="' + element.id + '"]').classList.toggle('group__button--selected');
    
            if (this.type == 'radio') {
                this.buttons.forEach(function(neighbour) {
                    if (neighbour.id != buttonId && neighbour.selected) {
                        neighbour.selected = false;
                        let dest =  document.querySelector('.group__button[related-object-id="' + neighbour.id + '"]');
                        dest.classList.remove('group__button--selected');
                    }
                });
            }
        },

        createEquivElement: function(id) {
            let group = document.createElement('div');
            group.classList.add("group", "group-" + id);
    
            if (this.active == false) {
                group.classList.add("group--disabled");
            } else if (this.type == 'radio') {
                group.classList.add("group--radio");
            }

            if (this.customStyle.length > 0) {
                let style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '.group-' + id + ' .group__button {' + this.customStyle + '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            }
    
            return group;
        }
    });


    return Group;
})();
let Button = (function buttonModule() {
    let id = 1;
    let wrapper = document.querySelector('.controls');

    function Button(name, active = true, selected = false, customStyle='') {
        if (!this instanceof Button) {
            return new Button();
        }

        this.id = id++;
        this.name = name;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle != null ? customStyle: '';
        this.element = this.displayElement();

        wrapper.addEventListener('click', buttonClicked);
    }

    Object.assign(Button.prototype, {
        setActive: function(active) {
            if (active == this.active) {
                return;
            }

            this.active = active;
            this.element.classList.toggle("group__button--disabled");
        },

        setState: function(selected) {
            if (!this.active || selected == this.selected) {
                return;
            }

            this.selected = selected;   
            this.element.classList.toggle("group__button--selected");
        },

        displayElement: function() {
            let btn = document.createElement('button');
            btn.classList.add("btn", "group__button");
            btn.innerText = this.name;
            btn.setAttribute('related-object-id', this.id);
            
    
            if (this.customStyle != null && this.customStyle.length > 0) {
                btn.setAttribute('style', this.customStyle);
            }
    
            if (!this.active) {
                btn.classList.add("group__button--disabled");
            } else if (this.selected) {
                btn.classList.add("group__button--selected");
            }
    
            return btn;
        }    
    }, CustomEventTarget.prototype);

    function buttonClicked(e) {
        if (!e.target.classList.contains('group__button') ||
        e.target.classList.contains('group__button--disabled') ||
        e.target.classList.contains('group__button--radio-button') && e.target.classList.contains('group__button--selected')) {
            return;
        }

        let buttonId = parseInt(e.target.getAttribute('related-object-id'));

        groups.forEach(function(group){
            let button = group.buttons.find(element => element.id == buttonId );
            
            if (button != undefined) { 

                button.fire({
                    type: 'message',
                    data: buttonId
                });
            }
        });
    }
    
    Button.prototype.constructor = Button;
    return Button;
})();
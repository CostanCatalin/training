let Button = (function buttonModule() {
    let id = 1;
    let wrapper = document.querySelector('.wrapper');

    function Button(name, active = true, selected = false, parentCustomStyle='', customStyle='') {
        if (!this instanceof Button) {
            return new Button();
        }

        this.id = id++;
        this.name = name;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle != null ? customStyle: '';
        this.parentStyle = parentCustomStyle != null ? parentCustomStyle: ''
        this.element = this.displayElement();

        wrapper.addEventListener('click', buttonClicked);
    }

    Object.assign(Button.prototype, {

        setState: function(selected) {
            if (this.active) {
                this.selected = selected;
            }
        },

        displayElement: function() {
            let btn = document.createElement('button');
            btn.classList.add("btn", "group__button");
            btn.innerText = this.name;
            btn.setAttribute('related-object-id', this.id);
            
    
            if (this.customStyle != null && this.customStyle.length > 0) {
                btn.setAttribute('style', this.customStyle);
            }
            if (this.parentStyle != null && this.parentStyle.length > 0) {
                btn.setAttribute('style', (this.parentStyle == null ? '' : this.parentStyle) + this.customStyle);
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
        e.target.parentElement.classList.contains("group--disabled") ||
        e.target.classList.contains('group__button--disabled') ||
        e.target.parentElement.classList.contains("group--radio") && e.target.classList.contains('group__button--selected')) {
            return;
        }

        let buttonId = parseInt(e.target.getAttribute('related-object-id'));

        objects.forEach(function(group){

            button = group.buttons.find(element => element.id == buttonId);
            
            if (button != undefined) { 

                button.fire({
                    type: 'message',
                    data: buttonId
                });
            }
        });
    }

    return Button;
})();
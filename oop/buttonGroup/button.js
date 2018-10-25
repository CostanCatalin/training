let Button = (function buttonModule() {
    let id = 1;

    function Button(name, active = true, selected = false, customStyle='') {
        if (!this instanceof Button) {
            return new Button();
        }
        this.id = id++;
        this.name = name;
        this.active = active;
        this.selected = selected;
        this.customStyle = customStyle;
    }

    Button.prototype.setState = function(selected) {
        if (this.active) {
            this.selected = enabled;
        }
    }

    Button.prototype.createEquivElement = function(parentStyle = '') {
        let btn = document.createElement('button');
        btn.classList.add("btn", "group__button");
        btn.innerText = this.name;
        btn.setAttribute('related-object-id', this.id);
        

        if (this.customStyle != null && this.customStyle.length > 0) {
            btn.setAttribute('style', this.customStyle);
        }
        if (parentStyle != null && parentStyle.length > 0) {
            let previousStyle = btn.getAttribute('style');
            btn.setAttribute('style', (previousStyle == null ? '' : previousStyle) + parentStyle);
        }

        if (!this.active) {
            btn.classList.add("group__button--disabled");
        } else if (this.selected) {
            btn.classList.add("group__button--selected");
        }

        return btn;
    }

    return Button;
})();
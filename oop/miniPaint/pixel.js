let Pixel = (function pixelModule() {
    const active_class = "group__button--active";

    function Pixel() {
        if (!this instanceof Pixel) {
            return new Pixel();
        }
        this.element = this.displayElement();
        this.active = false;
    }

    Object.assign(Pixel.prototype, {

        setState: function(selected) {
            if (this.active != selected) {
                this.active = selected;

                if (this.active) {
                    this.element.classList.add(active_class);
                } else {
                    this.element.classList.remove(active_class);
                }
            }
        },

        displayElement: function() {
            let btn = document.createElement('button');
            btn.classList.add("btn", "group__button");
    
            if (!this.active) {
                btn.classList.remove(active_class);
            } else {
                btn.classList.add(active_class);
            }
    
            return btn;
        }    
    });

    return Pixel;
})();
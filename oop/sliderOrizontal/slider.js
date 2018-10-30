let Slider = (function() {
    let slidersIdx = 0;

    function Slider(parent, min, max, width = 300, style = '') {
        if (!this instanceof Slider) {
            return new Slider(parent, min, max, width, style);
        }

        this.style = style;
        let minVal = min;
        let maxVal = max;
        let widthVal = width;
        this.element = null;

        Object.defineProperty(this, 'min', {
            set(val) {
                if (isNaN(val)) {
                    console.log('%c[Error] Min must be a number', 'color: red;');
                } else if (val >= max) {
                    console.log('%c[Error] Min must be lower than Max', 'color: red;');
                } else {
                    minVal = val;
                }
            },
            get() {
                return minVal;
            },
        });
        
        Object.defineProperty(this, 'max', {
            set(val) {
                if (isNaN(val)) {
                    console.log('%c[Error] Max must be a number', 'color: red;');
                } else if (val <= min) {
                    console.log('%c[Error] Max must be greater than Min', 'color: red;');
                } else {
                    maxVal = val;
                }
            },
            get() {
                return maxVal;
            },
        });

        Object.defineProperty(this, 'width', {
            set(val) {
                if (isNaN(val)) {
                    console.log('%c[Error] Width must be a number', 'color: red;');
                } else if (val <= 0) {
                    console.log('%c[Error] Width must be greater than 0', 'color: red;');
                } else {
                    widthVal  = val;
                }
            },
            get() {
                return widthVal;
            },
        });
        
        this.createEquivElement(parent);
        this.addEvents(this.element, minVal, maxVal);
    };

    Slider.prototype = new DropDownEvents();
    Slider.prototype.constructor = Slider;

    Slider.prototype.createEquivElement = function(parent) {
        let dest = document.querySelector(parent);

        if (dest == undefined) {
            dest = document.querySelector('.wrapper');
        }

        let slider = document.createElement('div');
        slider.classList.add('slider', 'slider-' + slidersIdx++);
        if (this.style.length > 0) {
            slider.setAttribute("style", this.style);
        }

        //display values
        let min = document.createElement('p');
        min.classList.add('min-value', 'vertical-center');
        min.innerText = this.min;

        let currentValue = document.createElement('p');
        currentValue.classList.add('current-value');
        currentValue.innerText = this.min;

        let max = document.createElement('p');
        max.classList.add('max-value', 'vertical-center');
        max.innerText = this.max;

        // the controls
        let bar = document.createElement('div');
        bar.classList.add('bar', 'vertical-center');

        let button = document.createElement('div');
        button.classList.add('button', 'vertical-center');
        
        bar.append(button);
        slider.append(min, currentValue, max, bar);
        slider.style.width = this.width + 'px';

        if (this.style.length > 0) {
            slider.setAttribute('style', this.style + "; width: " + this.width + "px;");
        }

        this.element = slider;
        dest.append(slider);
    };

    return Slider;
})();
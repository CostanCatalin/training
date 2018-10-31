let Slider = (function() {
    let slidersIdx = 0;

    function Slider(parent, min, max, customClass = false) {
        if (!this instanceof Slider) {
            return new Slider(parent, min, max, customClass);
        }

        this.customClass = customClass;
        let minVal = min;
        let maxVal = max;
        this.element = null;
        this.clicked = false;

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
        
        this.createEquivElement(parent);
        this.addEvents(this.element, minVal, maxVal);
    };

    Object.assign(Slider.prototype, {
        createEquivElement: function(parent) {
            let dest = document.querySelector(parent);
    
            if (dest == undefined) {
                dest = document.querySelector('.wrapper');
            }
    
            let slider = document.createElement('div');
            slider.classList.add('slider', 'slider-' + slidersIdx++);
            if (this.customClass != null) {
                slider.classList.add(this.customClass);
            }
    
            let bar = document.createElement('div');
            bar.classList.add('bar', 'vertical-center');

            slider.append(bar);
    
            this.element = slider;
            dest.append(slider);
        },

        addEvents: function(element, min, max) {

            this.Max = max;
            this.Min = min;

            this.bar = element.querySelector('.bar');
            this.currentValueDisplay = element.querySelector('.current-value');
            
            this.barRect = this.bar.getBoundingClientRect();
            
            this.knob = new Knob(this.bar, ['button', 'vertical-center'], 'y');
            this.element.append(this.knob.element);

            this.barWidth = this.barRect.right - this.barRect.left - this.knob.element.offsetWidth;

            this.element.addEventListener("click", this.barClicked.bind(this));
        },

        barClicked: function(e) {
            this.knob.currentPercentageFromPointer(e.pageX);
        }
    });

    return Slider;
})();
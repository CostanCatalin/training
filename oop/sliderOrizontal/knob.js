let Knob = (function KnobInitializer() {
    const BUTTON_WIDTH = 17;

    function Knob(bar, customClass = null, axis = null) {
        this.clicked = false;
        this.bar = bar;
        this.barRect = this.bar.getBoundingClientRect();
        this.customClass = customClass;
        this.axis = axis;
        this.currentPercentage = 0;

        this.element = this.createElement();
        this.barWidth = this.barRect.right - this.barRect.left - BUTTON_WIDTH;
        
        this.element.addEventListener('mousedown', this.mouseDownListener.bind(this));
        window.addEventListener('resize', this.windowResizedListener.bind(this));
    }

    Object.assign(Knob.prototype, {
        
        mouseDownListener: function(e) {
            this.clicked = true;

            document.body.addEventListener('mouseup', this.mouseUpListener.bind(this));
            document.body.addEventListener('mousemove', this.mouseMoveListener.bind(this));
            this.currentPercentageFromPointer(e.pageX);
        },

        mouseUpListener: function(e) {
            document.body.removeEventListener('mouseup', this.mouseUpListener.bind(this));
            document.body.removeEventListener('mousemove', this.mouseMoveListener.bind(this));
            this.clicked = false;
        },

        currentPercentageFromPointer: function(pointerX) {
            let clickOffsetX = pointerX - this.barRect.left - this.element.clientWidth / 2;
    
            if (clickOffsetX < 0) {
                clickOffsetX = 0;
            }
    
            if (clickOffsetX > this.barWidth) {
                clickOffsetX = this.barWidth;
            }

            this.setCurrentPercentage(clickOffsetX / this.barWidth);
        },

        setCurrentPercentage: function(val) {
            this.element.style.left =  val * this.barWidth + "px";
            this.currentPercentage = val;

            console.log(this.currentPercentage);
            // raise event
        },

        windowResizedListener: function (e) {
            this.barRect = this.bar.getBoundingClientRect();
            this.barWidth = this.barRect.right - this.barRect.left - this.element.offsetWidth;
    
            this.element.style.left =  this.barWidth * this.currentPercentage + "px";
        },

        mouseMoveListener: function(e) {
            if (this.clicked) {
                this.currentPercentageFromPointer(e.pageX);
            }
        },

        createElement: function(e) {
            let elem = document.createElement('div');
            
            if (this.customClass != null) {
                elem.classList.add(...this.customClass);
            }

            return elem;
        }
    });

    return Knob;
})();
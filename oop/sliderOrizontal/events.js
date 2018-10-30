let DropDownEvents = (function Events() {

    function DropDownEvents() {
        this.clicked = false;
    }

    Object.assign(DropDownEvents.prototype, {
        addEvents: function(element, min, max) {
            element.addEventListener('mousedown', this.mouseDownListener.bind(this));
            window.addEventListener('resize', this.windowResizedListener.bind(this));

            this.Max = max;
            this.Min = min;

            this.bar = element.querySelector('.bar');
            this.button = element.querySelector('.button');
            this.currentValueDisplay = element.querySelector('.current-value');
            
            this.barRect = this.bar.getBoundingClientRect();
            this.barWidth = this.barRect.right - this.barRect.left - this.button.offsetWidth;
        },

        mouseDownListener: function(e) {
            this.clicked = true;

            document.body.addEventListener('mouseup', this.mouseUpListener.bind(this));
            document.body.addEventListener('mousemove', this.mouseMoveListener.bind(this));
            this.currentValueFromPointer(e.pageX);
        },

        mouseUpListener: function(e) {
            document.body.removeEventListener('mouseup', this.mouseUpListener.bind(this));
            document.body.removeEventListener('mousemove', this.mouseMoveListener.bind(this));
            this.clicked = false;
        },

        currentValueFromPointer: function(pointerX) {
            let clickOffsetX = pointerX - this.barRect.left;
    
            if (clickOffsetX < 0) {
                clickOffsetX = 0;
            }
    
            if (clickOffsetX > this.barWidth) {
                clickOffsetX = this.barWidth;
            }
    
            this.button.style.left = clickOffsetX + "px";
    
            this.currentValue = this.Min + Math.round(clickOffsetX / this.barWidth * (this.Max - this.Min));
            this.currentValueDisplay.innerText = this.currentValue;
        },

        windowResizedListener: function (e) {
            this.barRect = this.bar.getBoundingClientRect();
            this.barWidth = this.barRect.right - this.barRect.left - this.button.offsetWidth;
    
            let percent = (this.currentValue - this.Min) / (this.Max - this.Min);
    
            this.button.style.left =  this.barWidth * percent + "px";
        },

        mouseMoveListener: function(e) {
            if (this.clicked) {
                this.currentValueFromPointer(e.pageX);
            }
        }
    });

    return DropDownEvents;
})();
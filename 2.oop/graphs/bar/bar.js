const Bar = (function initializeBar() {
    const padding = 3;

    function Bar(input, width, height, vertical = false) {
        this.width = width;
        this.height = height;
        this.vertical = vertical;
        Graph.call(this, input);
    }

    Bar.prototype = Object.create(Graph.prototype);
    Bar.prototype.constructor = Bar;

    Object.assign(Bar.prototype, {
        draw: function() {
            let wrapper = this.getWrapper();
            let dest = wrapper.querySelector('.wrapper');
    
            let newChart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            newChart.setAttribute('width', this.width);
            newChart.setAttribute('height', this.height);
            newChart.classList.add("chart");
    
            let currentPosition = 0;
    
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
    
                let element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                element.style.fill = item.backgroundColor;
    
                if (this.vertical) {
                    let itemHeight = item.percent / 100 * this.height;
                    element.setAttribute('height', itemHeight - (i == 0 ? 0 : padding));
                    element.setAttribute('width', this.width);
                    element.setAttribute('x', 0);
                    element.setAttribute('y', currentPosition + (i == 0 ? 0 : padding));
        
                    currentPosition += itemHeight;
    
                } else {
                    let itemWidth = item.percent / 100 * this.width;
                    element.setAttribute('height', this.height);
                    element.setAttribute('width', itemWidth - (i == 0 ? 0 : padding));
                    element.setAttribute('x', currentPosition + (i == 0 ? 0 : padding));
                    element.setAttribute('y', 0);
        
                    currentPosition += itemWidth;
                }
    
                Tooltip(element, item.label);
                newChart.appendChild(element);
            }
    
            dest.appendChild(newChart);
            return wrapper;
        }
    });

    return Bar;
})();
let Circle = (function() {
    
    function Circle(input, chartSizeParam = undefined) {
        Graph.call(this, input);
        this.chartSize = chartSizeParam != undefined ? chartSizeParam : 300;
    }
    
    Circle.prototype = Object.create(Graph.prototype);
    Circle.prototype.constructor = Circle;

    Object.assign(Circle.prototype, {
        draw: function(donnutWidth = undefined) {
            let innerRadius = undefined;
    
            if (donnutWidth != undefined) {
                innerRadius = this.chartSize / 2 - donnutWidth;
            }
    
            let wrapper = this.getWrapper();
            let dest = wrapper.querySelector('.wrapper');
    
            let newChart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            newChart.setAttribute('width', this.chartSize);
            newChart.setAttribute('height', this.chartSize);
            newChart.classList.add('chart', 'round');
    
            let currentPercentage = 0;
            for(let i = 0; i < this.items.length; i++) {
                let currentItem = this.items[i];
    
                let chunks = this.chunkArc(currentItem);
                for (let j = 0; j < chunks.length; j++) {
                    // -- some doughnut logic
                    let arc = this.getPath(chunks[j], currentPercentage, innerRadius);
                    Tooltip(arc, currentItem.label);
                    
                    currentPercentage += chunks[j].percent;
                    newChart.appendChild(arc);
                }
            }
    
            currentPercentage = 0;
            previousOuterPosition = this.positionFromCurrentPercentage(currentPercentage);
            for(let i = 0; i < this.items.length; i++) {
                let currentItem = this.items[i];
                currentPercentage += currentItem.percent;
                
                // -- more doughnut logic
                let position = this.positionFromCurrentPercentage(currentPercentage - (currentItem.percent / 2), this.chartSize * 1/3);
                if (donnutWidth != undefined) {
                    position = this.positionFromCurrentPercentage(currentPercentage - (currentItem.percent / 2), this.chartSize/2 - 2*donnutWidth);
                } 
    
                let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', position.x);
                text.setAttribute('y', position.y);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('transform', 'rotate(' + 90 + ', ' + position.x + ', ' + position.y + ')');
                text.innerHTML = currentItem.percent + "%";
            
                previousOuterPosition = position;
                newChart.appendChild(text);
            }
            
            dest.appendChild(newChart);
            wrapper.appendChild(dest);
            return wrapper;
        },

        getPath: function(item, currentPercent, innerRadius = undefined) {
            let prevOuter = this.positionFromCurrentPercentage(currentPercent);
            let position = this.positionFromCurrentPercentage(currentPercent + item.percent);
    
            let path = 'M ' + prevOuter.x + ' ' + prevOuter.y  +
            ' A ' + this.chartSize / 2 + ' ' + this.chartSize / 2 +  ', 0, 0, 1, ' + position.x + ' ' + position.y;
    
            if (innerRadius != undefined) {
                let prevInner = this.positionFromCurrentPercentage(currentPercent, innerRadius);
                let position = this.positionFromCurrentPercentage(currentPercent + item.percent, innerRadius);
    
                path +=  ' L ' + position.x + ' ' + position.y + 
                ' A ' + innerRadius + ' ' + innerRadius +  ', 0, 0, 0, ' + prevInner.x + ' ' + prevInner.y;
            } else {
                path += ' L ' + this.chartSize / 2 + ' ' + this.chartSize / 2
            }
    
            let arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arc.setAttribute('d', path + ' Z');
            arc.style.stroke = item.backgroundColor;
            arc.setAttribute('fill', item.backgroundColor);
    
            return arc;
        },

        positionFromCurrentPercentage: function (percent, customRadius = this.chartSize / 2) {
            let angle = (Math.PI * percent / 50);
            x = this.chartSize / 2 + customRadius * Math.cos(angle);
            y = this.chartSize / 2 + customRadius * Math.sin(angle);
    
            return {
                x: Math.round(x),
                y: Math.round(y)
            };
        },

        chunkArc: function(item, size = 20) {
            let res = []
    
            for (let i = 0; i < Math.ceil(item.percent / size); i++) {
                let elem = Object.assign({}, item);
    
                if (item.percent < (i+1) * size) {
                    elem.percent = item.percent - (i) * size;
                } else {
                    elem.percent = size;
                }
    
                res.push(elem);
            }
    
            return res;
        }
    });

    return Circle;
})();
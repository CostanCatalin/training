const Doughnut = (function initializeDoughnut() {
    const chartSize = 150;
    const donnutWidth = 15;
    const innerRadius = chartSize / 2 - donnutWidth;
    const restBackgroundColor = 'rgba(221, 219, 219, 0.973)';

    function Doughnut(input) {
        Circle.call(this, input, chartSize);
    }

    Doughnut.prototype = Object.create(Circle.prototype);
    Doughnut.prototype.constructor = Doughnut;

    Object.assign(Doughnut.prototype, {
        draw: function() {    
            let wrapper = this.getWrapper();
            
            for(let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
        
                let dest = document.createElement('div');
                dest.classList.add('wrapper');
            
                let newChart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                newChart.setAttribute('width', chartSize);
                newChart.setAttribute('height', chartSize);
                newChart.classList.add('chart', 'round');
                Tooltip(newChart, item.label);
    
                let currentPercentage = 0;
                let chunks = this.chunkArc(item);
                for(let i = 0; i < chunks.length; i++) {
                    let chunk = chunks[i];
                    let arc = this.getPath(chunk, currentPercentage, innerRadius);
        
                    currentPercentage += chunk.percent;
                    newChart.appendChild(arc);
                }
    
                let rest = this.chunkArc({
                    label: "Unknown",
                    percent: 100 - item.percent,
                    backgroundColor: restBackgroundColor
                });
    
                for(let i = 0; i < rest.length; i++) {
                    let chunk = rest[i];
                    let arc = this.getPath(chunk, currentPercentage, innerRadius);
        
                    currentPercentage += chunk.percent;
                    newChart.appendChild(arc);
                }
        
                let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', '50%');
                text.setAttribute('y', '55%');
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('transform', 'rotate(90, ' + chartSize / 2 + ', ' + chartSize / 2 + ')');
                text.innerHTML = item.percent + "%";
                newChart.appendChild(text);
                dest.appendChild(newChart);
                wrapper.appendChild(dest);
            }
            return wrapper;
        }
    });

    return Doughnut;
})();

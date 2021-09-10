let Legend = (function legendInit() {
    const width = 20;
    const height = 15;

    function Legend(items) {
        this.items = items;
    }

    Object.assign(Legend.prototype, {
        draw: function getHTML() {

            let res = document.createElement('div');
            res.classList.add('legend');
    
            for (let i = 0; i < this.items.length; i++) {
                let newItem = document.createElement('div');
                newItem.classList.add('legend--item');
    
                let color = document.createElement('span');
                color.style.display = 'inline-block';
                color.style.width = width;
                color.style.height = height;
                color.style.backgroundColor = this.items[i].backgroundColor;
    
                let label = document.createElement('span');
                label.classList.add('legend--item--label')
                label.innerText = this.items[i].label;
                newItem.append(color, label);
    
                res.append(newItem);
            }
    
            return res;
        }
    });

    return Legend;
})();
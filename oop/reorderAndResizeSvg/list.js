let List = (function initializeList() {
    function List(number) {
        this.number = number;
        this.items = [];
        this.list = null;
        this.initializeItems();
    }

    Object.assign(List.prototype, {
        initializeItems: function() {
            for (let i = 0; i < this.number; i++) {
                let item = new Item(this, i * (itemHeight + itemSpacing) + itemSpacing );
                item.addListener("moved", itemMovedHandler.bind(this));
                this.items.push(item);
            }
        },

        draw: function() {
            if (this.list == null ) {
                this.list = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                this.list.setAttribute('width', '100%');
                this.list.setAttribute('height', '100%');
            }

            this.list.classList.add('list');

            for (let i = 0; i < this.number; i++) {
                this.list.appendChild(this.items[i].element);    
            }

            document.body.appendChild(this.list);
        },

        redraw: function() {
            let currentY = 0;
            for (let i = 0; i < this.items.length; i++) {
                let height = this.items[i].height;

                currentY += itemSpacing;
                this.items[i].updateCoord(undefined, currentY);

                currentY += height;
            }
        },
        getItemFromPoint: function(x, y) {
            let rect = document.querySelector('.list').getBoundingClientRect();
            let innerY = y - rect.top;

            if (innerY < 0 || innerY > rect.bottom - rect.top){
                return;
            }

            let currentOffset = innerY;
            
            for (let i = 0; i < this.items.length; i++) {
                let itemHeight = this.items[i].height + itemSpacing;
                currentOffset -= itemHeight;

                if (currentOffset <= 0) {
                    return this.items[i];
                }
            }
            
            return this.items[this.items.length - 1];
        }
    });

    function itemMovedHandler(e) {
        let newIdx = -1;
        let oldIdx = -1;

        for (let i = 0; i < this.items.length; i++) {
            if (e.data.id == this.items[i].id) {
                oldIdx = i;
            } else if (e.data.before == this.items[i].id) {
                newIdx = i;
            }
        }

        let item = this.items[oldIdx];
        this.items.splice(oldIdx, 1);
        if (newIdx > oldIdx) newIdx--;
        
        this.items.splice(newIdx, 0 , item);
        window.requestAnimationFrame(this.redraw.bind(this));
    }

    return List;
})();
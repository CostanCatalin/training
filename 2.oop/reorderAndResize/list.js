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
                let item = new Item(this);
                item.addListener("moved", itemMovedHandler.bind(this));
                this.items.push(item);
            }
        },

        draw: function() {
            if (this.list == null ) {
                this.list = document.createElement('div');
            }
            this.list.classList.add('list');

            for (let i = 0; i < this.number; i++) {
                this.list.appendChild(this.items[i].element);    
            }

            document.body.appendChild(this.list);
        },

        getItemFromPoint: function(x, y) {
            let movingItemIdx = -1;
            let rect = document.querySelector('.list').getBoundingClientRect();
            let innerY = y - rect.top;
            
            let lastItem = this.items[this.items.length - 1];
            let minY = -2 * itemSpacing;
            let maxY = rect.bottom - rect.top + this.items[this.items.length - 1].height;
            
            if ( minY > innerY || innerY > maxY) {
                return;
            }

            let currentOffset = innerY;
            
            for (let i = 0; i < this.items.length; i++) {
                let itemHeight = this.items[i].height + itemSpacing;
                currentOffset -= itemHeight;

                if (this.items[i].moving) {
                    movingItemIdx = i;
                }

                if (currentOffset <= 0) {
                    if ((movingItemIdx == i || movingItemIdx == i - 1) && movingItemIdx != -1) {
                        return;
                    }

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

        if (e.data.atTheEnd) {
            this.items.push(this.items.splice(oldIdx, 1)[0]);
        } else {
            if (newIdx > oldIdx) {
                newIdx--;
            }
            this.items.splice(newIdx, 0 , this.items.splice(oldIdx, 1)[0]);
        }
    }

    return List;
})();
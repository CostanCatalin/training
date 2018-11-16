let Item = (function initializeItem(){
    let previouslyClicked = null;
    let id = 0;

    function Item(parentList, customClass = undefined) {
        this.parentList = parentList;
        this.id = id++;
        this.clickHandlerWithContext = clickHandler.bind(this);
        this.element = createElement(customClass, this);
        
        // this.drawBorderWithHandlers(this.element);
        Draggable.call(this, this.element, DragAxisEnum.onlyY);
    }

    Item.prototype = Object.create(Draggable.prototype);
    Item.prototype.constructor = Item;

    Object.assign(Item.prototype, resizableMixin);

    function createElement(customClass, self) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('item-wrapper');
        
        let elem = document.createElement('div');
        elem.classList.add('item');
        elem.style.left = '700px';
        if (customClass != undefined) elem.classList.add(customClass);

        elem.addEventListener("mousedown", self.clickHandlerWithContext);
        wrapper.append(elem);
        wrapper.setAttribute('item-id', self.id);
        return wrapper;
    }

    function clickHandler(e) {
        if (previouslyClicked != null && !e.target.classList.contains('handler')) {
            previouslyClicked.classList.remove('clicked');
            previouslyClicked.innerHTML = '';
        }

        if (!e.target.classList.contains('item') || document.querySelector('.item-wrapper.moving') != null) {
            return;
        }

        e.target.classList.add('clicked');
        if (this instanceof Item) {
            this.drawBorderWithHandlers(e.target);
        }
        previouslyClicked = e.target;
    }

    return Item;
})();
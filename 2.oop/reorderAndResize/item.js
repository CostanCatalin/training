let Item = (function initializeItem(){
    let previouslyClicked = null;
    let id = 0;

    function Item(parentList, customClass = undefined) {
        this.parentList = parentList;
        this.id = id++;
        this.width = initialWidth;
        this.height = initialHeight;
        this.left = 700;
        
        this.clickHandlerWithContext = clickHandler.bind(this);
        this.element = createElement(customClass, this);

        Draggable.call(this, this.element, DragAxisEnum.onlyY);
    }

    Item.prototype = Object.create(Draggable.prototype);
    Item.prototype.constructor = Item;

    Object.assign(Item.prototype, Resizable.prototype);

    Object.assign(Item.prototype, { 
        resize: function(delta, resizeType, isFinished) {
            
            let modifiesHeight = resizeType != ResizeTypeEnum.Left && resizeType != ResizeTypeEnum.Right;
            let isTop = resizeType == ResizeTypeEnum.Top || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.TopRight;
            let isLeft = resizeType == ResizeTypeEnum.Left || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.BottomLeft;

            this.width += delta.width;
            this.height += delta.height;

            let border = document.querySelector('.border');
            let item = this.element.querySelector('.item');
            
            item.style.width = this.width + "px";
            border.style.width = this.width + padding / 2 + "px";
            border.style.height = this.height + padding / 2 + "px";
    
            if (isLeft) {
                this.left -= delta.width;
                item.style.left = this.left + "px";
                border.style.left = this.left - padding / 2+ "px";
            }
    
            if (isTop) {
                border.style.top = parseInt(border.style.top.replace('px', '')) - delta.height + "px";
            }
 
            if (modifiesHeight && isFinished) {
                item.style.height = this.height + "px";
                border.style.top = this.element.getBoundingClientRect().top - padding / 2 + "px";
            }
        }
    });

    function createElement(customClass, self) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('item-wrapper');
        
        let elem = document.createElement('div');
        elem.classList.add('item');
        elem.style.left = self.left + 'px';
        if (customClass != undefined) elem.classList.add(customClass);

        elem.addEventListener("mousedown", self.clickHandlerWithContext);
        wrapper.append(elem);
        wrapper.setAttribute('item-id', self.id);
        return wrapper;
    }

    function clickHandler(e) {
        if (previouslyClicked != null && !e.target.classList.contains('handler')) {
            previouslyClicked.classList.remove('clicked');
            this.hideBorder();
        }

        if (!e.target.classList.contains('item') || document.querySelector('.item-wrapper.moving') != null) {
            return;
        }

        e.target.classList.add('clicked');
        if (this instanceof Item) {
            this.drawBorderWithHandlers();
        }
        previouslyClicked = e.target;
    }

    return Item;
})();
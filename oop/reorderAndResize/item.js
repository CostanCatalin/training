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

    Object.assign(Item.prototype, resizableMixin);

    Object.assign(Item.prototype, { 
        resize: function(delta, resizeType, isFinished) {
            
            let modifiesHeight = resizeType != ResizeTypeEnum.Left && resizeType != ResizeTypeEnum.Right;
            let isTop = resizeType == ResizeTypeEnum.Top || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.TopRight;
            let isBottom = modifiesHeight && !isTop;
            let isLeft = resizeType == ResizeTypeEnum.Left || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.BottomLeft;

            this.width += delta.width;
            this.height += delta.height;

            let border = this.element.querySelector('.border');
            let item = this.element.querySelector('.item');
            
            item.style.width = this.width + "px";
            border.style.width = this.width + padding / 2 + "px";
            border.style.height = this.height + padding / 2 + "px";
    
            if (isLeft) {
                item.style.left = parseInt(item.style.left.replace('px', '')) - delta.width + "px";
            }
    
            if (isTop) {
                border.style.top = '';
                border.style.bottom = - padding / 2 + "px";
            } else if (isBottom) {
                border.style.top = - padding / 2 + "px";
                border.style.bottom = '';
            }
 
            if (modifiesHeight && isFinished) {
                item.style.height = this.height + "px";
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
            previouslyClicked.innerHTML = '';
        }

        if (!e.target.classList.contains('item') || document.querySelector('.item-wrapper.moving') != null) {
            return;
        }

        e.target.classList.add('clicked');
        if (this instanceof Item) {
            this.element.firstChild.append(this.drawBorderWithHandlers());
        }
        previouslyClicked = e.target;
    }

    return Item;
})();
let Item = (function initializeItem(){
    let previouslyClicked = null;
    let id = 0;

    function Item(parentList, Y, customClass = undefined) {
        this.parentList = parentList;
        this.id = id++;
        this.width = initialWidth;
        this.height = initialHeight;
        this.coord = {
            x: X,
            y: Y
        }
        this.clickHandlerWithContext = clickHandler.bind(this);
        this.element = createElement(customClass, this);
        
        Draggable.call(this, this.element, DragAxisEnum.onlyY);
    }

    Item.prototype = Object.create(Draggable.prototype);
    Item.prototype.constructor = Item;
    Object.assign(Item.prototype, Resizable.prototype);

    Object.assign(Item.prototype, {
        updateCoord: function(x, y) {
            this.coord.x = x || this.coord.x;
            this.coord.y = y || this.coord.y;
            this.element.setAttribute('transform', `translate(${this.coord.x}, ${this.coord.y})`);
            
            // move element to the bottom of the list to overlap on resize
            if(this.element != this.element.parentNode.lastChild) {
                this.element.parentNode.append(this.element);
            }

            if (this.element.classList.contains('clicked')) {
                this.drawBorderWithHandlers();
            }
        },

        redraw: function(elem) {
            if (!isNaN(elem)) {
                elem = this.element.querySelector('.item');
            }
            
            let displayWidth = this.width;
            let roundingOffset = this.height / 2;
            if (roundingOffset > displayWidth / 2) {
                roundingOffset = displayWidth / 2;
            }
            displayWidth -= roundingOffset;
            elem.setAttribute('d', `M 0, 0
            L ${displayWidth} 0 
            Q ${displayWidth + roundingOffset} 0  ${displayWidth + roundingOffset}  ${this.height / 2}
            Q ${displayWidth + roundingOffset} ${this.height} ${displayWidth} ${this.height} 
            L ${roundingOffset} ${this.height}
            Q 0 ${this.height} 0 ${this.height / 2}
            Q 0 0 ${roundingOffset} 0 z`);
        },

        resize: function(delta, resizeType, isFinished) {
            let isTop = resizeType == ResizeTypeEnum.Top || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.TopRight;
            let modifiesHeight = resizeType != ResizeTypeEnum.Left && resizeType != ResizeTypeEnum.Right;
            let isLeft = resizeType == ResizeTypeEnum.Left || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.BottomLeft;
            this.width += delta.width;
            this.height += delta.height;
    
            if (isLeft) {
                this.coord.x -= delta.width;
            }
    
            if (isTop) {
                this.coord.y -= delta.height;
            }
            
            window.requestAnimationFrame(this.redraw.bind(this));
            this.updateCoord();
    
            if (!modifiesHeight || isFinished) {
                window.requestAnimationFrame(this.parentList.draw.bind(this.parentList));
            }
            window.requestAnimationFrame(this.drawBorderWithHandlers.bind(this));
        }
    });

    function createElement(customClass, self) {
        let wrapper = document.createElementNS(svgNamespace, 'g');
        wrapper.classList.add('item-wrapper');
        wrapper.setAttribute('transform', `translate(${self.coord.x}, ${self.coord.y})`);
        
        let elem = document.createElementNS(svgNamespace, 'path');

        self.redraw(elem);

        elem.classList.add('item');
        if (customClass) {
            elem.classList.add(customClass);
        }

        let indicatorTop = document.createElementNS(svgNamespace, 'line');
        indicatorTop.classList.add('indicator');
        indicatorTop.setAttribute('x1', '-100%');
        indicatorTop.setAttribute('y1', -padding);
        indicatorTop.setAttribute('x2', '100%');
        indicatorTop.setAttribute('y2', -padding);
        indicatorTop.setAttribute('stroke-width', 2);

        let indicatorBottom = document.createElementNS(svgNamespace, 'line');
        indicatorBottom.classList.add('indicator-bottom');
        indicatorBottom.setAttribute('x1', '-100%');
        indicatorBottom.setAttribute('y1', self.height + padding);
        indicatorBottom.setAttribute('x2', '100%');
        indicatorBottom.setAttribute('y2', self.height + padding);
        indicatorBottom.setAttribute('stroke-width', 2);
        
        wrapper.setAttribute('item-id', self.id);
        wrapper.append(elem, indicatorTop, indicatorBottom);
        elem.addEventListener("mousedown", self.clickHandlerWithContext);
        return wrapper;
    }

    function clickHandler(e) {
        if (previouslyClicked != null && !e.target.classList.contains('handler') && previouslyClicked.nextSibling) {
            previouslyClicked.classList.remove('clicked');
        }

        if (!e.target.classList.contains('item') || document.querySelector('.item-wrapper.moving') != null) {
            return;
        }

        e.target.parentNode.classList.add('clicked');
        window.requestAnimationFrame(this.drawBorderWithHandlers.bind(this));
        previouslyClicked = e.target.parentNode;
    }

    return Item;
})();
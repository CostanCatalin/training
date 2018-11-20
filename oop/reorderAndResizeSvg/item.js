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

    Object.assign(Item.prototype, resizableMixin);

    Object.assign(Item.prototype, {
        updateCoord: function(x, y) {
            this.coord.x = x || this.coord.x;
            this.coord.y = y || this.coord.y;
            this.element.setAttribute('transform', 'translate(' + this.coord.x + ',' + this.coord.y + ')')
        },

        redraw: function() {
            let roundingOffset = this.height / 2;
            let displayWidth = this.width - padding - roundingOffset;
            this.element.querySelector('.item').setAttribute('d', 'M 0, 0' +
            ' L ' + displayWidth  + ' 0' + 
            ' Q ' + (displayWidth + roundingOffset) + ' 0 ' + (displayWidth + roundingOffset) + ' ' + ( this.height / 2) +
            ' Q ' + (displayWidth + roundingOffset) + ' ' + this.height + ' ' + displayWidth + ' ' + this.height +
            ' L' + roundingOffset + ' ' + this.height + 
            ' Q 0 ' + this.height + ' 0 ' + ( this.height / 2)  +
            ' Q 0 0 ' + roundingOffset + ' 0 z');
        }
    });

    function createElement(customClass, self) {
        let displayWidth = self.width - 2 * padding;

        let wrapper = document.createElementNS(svgNamespace, 'g');
        wrapper.classList.add('item-wrapper');
        wrapper.setAttribute('transform', 'translate(' + self.coord.x + ',' + self.coord.y + ')');
        
        let elem = document.createElementNS(svgNamespace, 'path');

        elem.setAttribute('d', 'M 0, 0' +
        ' L ' + displayWidth  + ' 0' + 
        ' Q ' + (displayWidth + padding) + ' 0 ' + (displayWidth + padding) + ' ' + ( self.height / 2) +
        ' Q ' + (displayWidth + padding) + ' ' + self.height + ' ' + displayWidth + ' ' + self.height +
        ' L' + padding + ' ' + self.height + 
        ' Q 0 ' + self.height + ' 0 ' + ( self.height / 2)  +
        ' Q 0 0 ' + padding + ' 0 z');

        elem.classList.add('item');
        if (customClass != undefined) elem.classList.add(customClass);

        let indicator = document.createElementNS(svgNamespace, 'line');
        indicator.classList.add('indicator');
        indicator.setAttribute('x1', '-100%');
        indicator.setAttribute('y1', -5);
        indicator.setAttribute('x2', '100%');
        indicator.setAttribute('y2', -5);
        indicator.setAttribute('stroke-width', 2);

        wrapper.append(elem, indicator);
        wrapper.setAttribute('item-id', self.id);
        elem.addEventListener("mousedown", self.clickHandlerWithContext);
        return wrapper;
    }

    function clickHandler(e) {
        if (previouslyClicked != null && !e.target.classList.contains('handler') && previouslyClicked.nextSibling) {
            previouslyClicked.classList.remove('clicked');
            let prevBorder = previouslyClicked.parentNode.querySelector('.wrapper');
            if (prevBorder) previouslyClicked.parentNode.removeChild(prevBorder);
        }

        if (!e.target.classList.contains('item') || document.querySelector('.item-wrapper.moving') != null) {
            return;
        }

        e.target.classList.add('clicked');
        if (this instanceof Item) {
            this.element.append(this.drawBorderWithHandlers(resizeFunction));
        }
        previouslyClicked = e.target;
    }

    function resizeFunction(delta, resizeType, isFinished) {
        let isTop = resizeType == ResizeTypeEnum.Top || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.TopRight;
        let isLeft = resizeType == ResizeTypeEnum.Left || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.BottomLeft;
        this.width += delta.width;
        this.height += delta.height;

        if (isLeft) {
            this.coord.x -= delta.width;
        }

        if (isTop) {
            this.coord.y -= delta.height;
        }
        
        this.redraw();
        this.updateCoord();

        if (!isTop || isFinished) {
            this.parentList.redraw();
        }
    }

    return Item;
})();
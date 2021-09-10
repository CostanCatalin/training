let ResizePoint = (function initializeResizePoint() {
    let delta = {
        width: 0,
        height: 0
    };
    let parentItem;

    function ResizePoint(parent, resizeType, customClass) {
        if (!parentItem || parentItem != parent) {
            parentItem = parent;
        }
        this.element = createElement(customClass);
        this.resizeType = resizeType;
        
        Draggable.call(this);
        Event.call(this);
    }

    ResizePoint.prototype = Object.create(Draggable.prototype);
    ResizePoint.prototype.constructor = ResizePoint;
    Object.assign(ResizePoint.prototype, Event.prototype);
    
    Object.assign(ResizePoint.prototype, {
        mouseDown: function() {
            delta.width = 0; 
            delta.height = 0;
        },

        mouseMove: function(e) {
            if ( e.pageX < pageMargin || e.pageX > window.innerWidth - pageMargin) {
                return;
            }
            
            if (this.resizeType == ResizeTypeEnum.Top || this.resizeType == ResizeTypeEnum.Bottom || this.resizeType >= 5) {
                let isBottom = this.resizeType == ResizeTypeEnum.Bottom || this.resizeType == ResizeTypeEnum.BottomLeft || this.resizeType == ResizeTypeEnum.BottomRight;
                let newHeight = !isBottom ? (parentItem.coord.y + parentItem.height) - e.pageY + parentItem.topOffset : e.pageY - parentItem.coord.y - parentItem.topOffset;
    
                if (newHeight > maxHeight) newHeight = maxHeight;
                if (newHeight < minHeight) newHeight = minHeight;
                
                delta.height = newHeight - parentItem.height;
            }
    
            if (this.resizeType == ResizeTypeEnum.Left || this.resizeType == ResizeTypeEnum.Right || this.resizeType >= 5) {
                let isLeft = this.resizeType == ResizeTypeEnum.Left || this.resizeType == ResizeTypeEnum.TopLeft || this.resizeType == ResizeTypeEnum.BottomLeft;
                let newWidth = isLeft ?  (parentItem.coord.x + parentItem.width) - e.pageX : e.pageX - parentItem.coord.x;
    
                if (newWidth < minWidth) newWidth = minWidth;
                if (newWidth > maxWidth) newWidth = maxWidth;
    
                delta.width = (newWidth - parentItem.width);
            }
    
            if (delta.height != 0 || delta.width != 0) {
                this.fire({
                    type:"resized",
                    data: {
                        delta: delta,
                        resizeType: this.resizeType,
                        finished: false
                    }
                });
            }
        },

        mouseUp: function() {
            this.fire({
                type:"resized",
                data: {
                    delta: delta,
                    resizeType: this.resizeType,
                    finished: true
                }
            });
        },

        updatePosition: function(parent) {
            if (!parentItem || parentItem != parent) {
                parentItem = parent;
            }
            const offset = handlerSize / 2;
            
            switch(this.resizeType) {
                case ResizeTypeEnum.Top:
                    this.element.setAttribute('x', parentItem.width / 2 + offset);
                    this.element.setAttribute('y', 1);
                    break;
                
                case ResizeTypeEnum.TopRight:
                    this.element.setAttribute('x', parentItem.width + offset);
                    this.element.setAttribute('y', 1);
                    break;

                case ResizeTypeEnum.TopLeft:
                    this.element.setAttribute('x', 1);
                    this.element.setAttribute('y', 1);
                    break;

                case ResizeTypeEnum.Right:
                    this.element.setAttribute('x', parentItem.width + offset);
                    this.element.setAttribute('y', parentItem.height / 2 + offset / 2);
                    break;

                case ResizeTypeEnum.Left:
                    this.element.setAttribute('x', 1);
                    this.element.setAttribute('y', parentItem.height / 2 + offset / 2);
                    break;

                case ResizeTypeEnum.Bottom:
                    this.element.setAttribute('x', parentItem.width / 2 + offset);
                    this.element.setAttribute('y', parentItem.height + offset);
                    break;

                case ResizeTypeEnum.BottomRight:
                    this.element.setAttribute('x', parentItem.width + offset);
                    this.element.setAttribute('y', parentItem.height + offset);
                    break;

                case ResizeTypeEnum.BottomLeft:
                    this.element.setAttribute('x', 1);
                    this.element.setAttribute('y', parentItem.height + offset);
                    break;

                default:
                    throw new Error("Key not found");
            }
        }
    });

    function createElement(customClass) {
        let handler = document.createElementNS(svgNamespace, 'rect');
        handler.classList.add('handler');

        if (customClass) {
            handler.classList.add(customClass);
        }

        return handler;
    }

    return ResizePoint;
})();

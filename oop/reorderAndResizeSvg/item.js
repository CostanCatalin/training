let Item = (function initializeItem(){
    let previouslyClicked = null;
    let id = 0;
    let movingElement = null;
    let hovered = null;
    let innerTopOffset = 0;

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
        
        Draggable.call(this, DragAxisEnum.onlyY);
        this.addListener("resized", this.resize.bind(this));
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

        resize: function(e) {
            let delta = e.data.delta,
                resizeType = e.data.resizeType,
                finished = e.data.finished;
            this.width += delta.width;
            this.height += delta.height;

            let isTop = resizeType == ResizeTypeEnum.Top || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.TopRight;
            let modifiesHeight = resizeType != ResizeTypeEnum.Left && resizeType != ResizeTypeEnum.Right;
            let isLeft = resizeType == ResizeTypeEnum.Left || resizeType == ResizeTypeEnum.TopLeft || resizeType == ResizeTypeEnum.BottomLeft;
    
            if (isLeft) {
                this.coord.x -= delta.width;
            }
    
            if (isTop) {
                this.coord.y -= delta.height;
            }
            
            window.requestAnimationFrame(this.redraw.bind(this));
            this.updateCoord();
    
            if (!modifiesHeight || finished) {
                window.requestAnimationFrame(this.parentList.draw.bind(this.parentList));
            }
            window.requestAnimationFrame(this.drawBorderWithHandlers.bind(this));
        },

        mouseDown: function(e) {
            if (!e.target.classList.contains('item') || e.target.classList.contains('hidden') || movingElement != null) {
                return;
            }
            
            const topOffset = document.querySelector('.list') == null ? 0 : document.querySelector('.list').getBoundingClientRect().top;
            this.moving = true;
            innerTopOffset = e.pageY - this.coord.y - topOffset;
            innerLeftOffset = e.pageX - this.coord.x;
        },

        mouseMove: function(e) {
            if (movingElement == null) {
                let elem = this.element.cloneNode(true);
                elem.setAttribute('transform', `translate(${this.coord.x}, 10)`);
    
                movingElement = document.createElementNS(svgNamespace, "svg");
                movingElement.classList.add('moving');
                movingElement.setAttribute('width', this.width);
                movingElement.setAttribute('height', this.height + 3 * padding);
                movingElement.style.left = this.coord.x + "px";
                
                this.element.parentNode.classList.add('moving');
                this.element.classList.add('hidden');
                
                movingElement.appendChild(elem);
                movingElement.querySelector('.item-wrapper').setAttribute('transform', '');
                document.body.appendChild(movingElement);
            }
    
            // moving item display
            if (this.axis == DragAxisEnum.onlyX || this.axis == DragAxisEnum.Both) {
                let left =  e.pageX - (this.width / 2);
                movingElement.style.left = e.pageX - (this.width / 2) + "px";
    
                repositionBorder(null, left);
            }
            if (this.axis == DragAxisEnum.onlyY || this.axis == DragAxisEnum.Both) {
                let top = e.pageY - innerTopOffset;
                movingElement.style.top = top + "px";
                
                repositionBorder(top);
            }
    
            // new position + indicator 
            let currentItem = this.parentList.getItemFromPoint(e.pageX, e.pageY);
            if (currentItem == null) {
                if (hovered != null) {
                    hovered.classList.remove('hovered');
                    hovered.classList.remove('hovered-bellow');
                    hovered = null;
                }
                return;
            }
            currentItem = currentItem.element;
    
            if (!currentItem.classList.contains('item') && !currentItem.classList.contains('item-wrapper')) {
                return;
            }
    
            if (!currentItem.classList.contains('item-wrapper')) {
                currentItem = currentItem.parentNode;
            }
    
            if (hovered != null) {
                hovered.classList.remove('hovered');
                hovered.classList.remove('hovered-bellow');
            }
    
            let rect = currentItem.getBoundingClientRect();
            let position = rect.bottom - e.pageY;
            
            // move bellow if click is lower than the middle of the item hovered
            if (position < rect.height / 2) {
                hovered = currentItem.nextSibling;
            } else {
                hovered = currentItem;
            }
    
            if (hovered != null && hovered.classList.contains('hidden')) {
                return;
            }
    
            if (hovered != null) {
                hovered.classList.add('hovered');
            } else {
                // bellow
                hovered = currentItem;
                hovered.classList.add('hovered-bellow');
            }
        },

        mouseUp: function(e) {
            this.moving = false;
            innerTopOffset = 0;
            innerLeftOffset = 0;
    
            this.element.classList.remove('hidden');
            this.element.parentNode.classList.remove('moving');
            if (movingElement != null) {
                movingElement.remove();
                movingElement = null;
            }
            
            if (hovered != null) {
                let atTheEnd = hovered.classList.contains('hovered-bellow');
                hovered.classList.remove('hovered');
                hovered.classList.remove('hovered-bellow');
    
                if (atTheEnd) {
                    this.element.parentNode.insertBefore(this.element, hovered.nextSibling);
                } else {
                    this.element.parentNode.insertBefore(this.element, hovered);
                }
    
                this.fire({
                    type:"moved",
                    data: {
                        id: this.id,
                        before: hovered.getAttribute('item-id'),
                        atTheEnd: atTheEnd
                    }
                });
                
                hovered = null;
            } else {
                this.drawBorderWithHandlers();
            }
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

    function repositionBorder(top, left) {
        let border = document.querySelector('.wrapper');

        if (!border) {
            return;
        }

        if (top) {
            border.style.top = top - padding + "px";
        }

        if (left) {
            border.style.left = left - padding + "px";
        }
    }

    return Item;
})();
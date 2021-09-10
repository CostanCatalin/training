let Draggable = (function draggableInitializer() {
    let movingElement = null;
    let hovered = null;
    let innerTopOffset = 0;
    let innerLeftOffset = 0;

    function Draggable(element, axis = DragAxisEnum.Both) {
        this.element = element;
        this.axis = axis;

        this.mouseDownHandlerWithContext = mouseDownHandler.bind(this);
        this.mouseUpHandlerWithContext = mouseUpHandler.bind(this);
        this.mouseMoveHandlerWithContext = mouseMoveHandler.bind(this);

        document.body.removeEventListener("mousedown", deselectClicked);
        document.body.addEventListener("mousedown", deselectClicked);

        this.element.addEventListener("mousedown", this.mouseDownHandlerWithContext);

        Event.call(this);
    }

    Draggable.prototype = Object.create(Event.prototype);
    Draggable.prototype.constructor = Draggable;

    function mouseDownHandler(e) {
        if (!e.target.classList.contains('item') || e.target.classList.contains('hidden') || movingElement != null) {
            this.hideBorder();
            return;
        }
        
        this.moving = true;
        innerTopOffset = e.pageY - this.element.getBoundingClientRect().top;
        innerLeftOffset = e.pageX - this.left;

        document.body.addEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.addEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.addEventListener("mouseleave", this.mouseUpHandlerWithContext);
    }

    function mouseMoveHandler(e) {
        if (movingElement == null) {
            movingElement = this.element.cloneNode(true);
            movingElement.style.position = 'absolute';
            movingElement.classList.add('moving');

            movingElement.style.width = this.width;
            movingElement.style.height = this.height;
            
            this.element.parentNode.classList.add('moving');
            this.element.classList.add('hidden');
            
            document.body.appendChild(movingElement);
        }

        // moving item display
        if (this.axis == DragAxisEnum.onlyX || this.axis == DragAxisEnum.Both) {
            let left =  e.pageX - innerLeftOffset;
            movingElement.style.left = left + "px";

            repositionBorder(null, left);
        }
        if (this.axis == DragAxisEnum.onlyY || this.axis == DragAxisEnum.Both) {
            let top = e.pageY - innerTopOffset;
            movingElement.style.top = top - 15 + "px";

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
        let height = rect.bottom - rect.top;
        let position = rect.bottom - e.pageY;
        
        // move bellow if click is lower than the middle of the item hovered
        if (position < height / 2) {
            hovered = currentItem.nextSibling;
        } else {
            hovered = currentItem;
        }

        if (hovered != null && hovered.classList.contains('hidden')) {
            hovered = hovered.nextSibling;
        }

        if (hovered != null) {
            hovered.classList.add('hovered');
        } else {
            // bellow
            hovered = currentItem;
            hovered.classList.add('hovered-bellow');
        }
    }

    function mouseUpHandler(e) {
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

            window.requestAnimationFrame(this.drawBorderWithHandlers.bind(this));
            hovered = null;
        } else {
            this.drawBorderWithHandlers();
        }
        
        document.body.removeEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.removeEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.removeEventListener("mouseleave", this.mouseUpHandlerWithContext);
    }

    function deselectClicked(e) {
        if (!hasParentWithClass(e.target, 'item-wrapper')) {
            let clicked = document.querySelector('.item.clicked');

            if (clicked == null) {
                return;
            }
            
            clicked.classList.remove('clicked');
            clicked.innerHTML = '';
        }
    }

    function repositionBorder(top, left) {
        let border = document.querySelector('.border');

        if (!border) {
            return;
        }

        if (top) {
            border.style.top = top - padding / 2 + "px";
        }

        if (left) {
            border.style.left = left - padding + "px";
        }
    }

    function hasParentWithClass(c, cls){ //returns boolean
        while(c=c.parentNode) {
            if (c == document || c == document.body) {
                return false;
            }

            if (c.classList.contains(cls)) {
                return true;
            }
        } 
      }

    return Draggable;
})();

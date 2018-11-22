let DragAxisEnum = Object.freeze({
    Both: 0,
    onlyX: 1,
    onlyY: 2
});

let Draggable = (function draggableInitializer() {
    let movingElement = null;
    let hovered = null;
    const padding = 8;
    const svgNamespace = 'http://www.w3.org/2000/svg';

    function Draggable(element, axis = DragAxisEnum.Both) {
        this.element = element;
        this.axis = axis;

        this.mouseDownHandlerWithContext = mouseDownHandler.bind(this);
        this.mouseUpHandlerWithContext = mouseUpHandler.bind(this);
        this.mouseMoveHandlerWithContext = mouseMoveHandler.bind(this);

        document.body.removeEventListener("mousedown", deselectClicked);
        document.body.addEventListener("mousedown", deselectClicked);

        this.element.addEventListener("mousedown", this.mouseDownHandlerWithContext);
        this.element.addEventListener("mouseenter", this.mouseDownHandlerWithContext);

        Event.call(this);
    }

    Draggable.prototype = Object.create(Event.prototype);
    Draggable.prototype.constructor = Draggable;

    function mouseDownHandler(e) {
        if (!e.target.classList.contains('item') || e.target.classList.contains('hidden') || movingElement != null) {
            return;
        }

        document.body.addEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.addEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.addEventListener("mouseleave", this.mouseUpHandlerWithContext);
    }

    function mouseMoveHandler(e) {
        if (movingElement == null) {
            let elem = this.element.cloneNode(true);
            elem.setAttribute('transform', 'translate(' + this.coord.x + ', 10)');

            movingElement = document.createElementNS(svgNamespace, "svg");
            movingElement.appendChild(elem);
            movingElement.classList.add('moving');
            movingElement.setAttribute('width', '100%');
            movingElement.setAttribute('height', this.height + 3*padding);
            
            this.element.parentNode.classList.add('moving');
            this.element.classList.add('hidden');
            
            document.body.appendChild(movingElement);
        }

        // moving item display
        if (this.axis == DragAxisEnum.onlyX || this.axis == DragAxisEnum.Both) {
            movingElement.style.left = e.pageX - (this.width / 2) + "px";
        }
        if (this.axis == DragAxisEnum.onlyY || this.axis == DragAxisEnum.Both) {
            movingElement.style.top = e.pageY - (this.height / 2)  + "px";
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
            this.element.parentNode.insertBefore(this.element, hovered);

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
            clicked.parentNode.removeChild(clicked.parentNode.lastChild);
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

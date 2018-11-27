let Draggable = (function initializeDraggable() {

    function Draggable(axis = DragAxisEnum.Both) {
        this.mouseDownHandlerWithContext = mouseDownHandler.bind(this);
        this.mouseMoveHandlerWithContext = mouseMoveHandler.bind(this);
        this.mouseUpHandlerWithContext = mouseUpHandler.bind(this);
        this.axis = axis;

        this.element.addEventListener("mousedown", this.mouseDownHandlerWithContext);

        Event.call(this);
    }

    Object.assign(Draggable.prototype, Event.prototype);

    Object.assign(Draggable.prototype, {
        mouseDown: function() {
            throw new Error("mouseDown function not implemented");
        },

        mouseMove: function() {
            throw new Error("mouseMove function not implemented");
        },

        mouseUp: function() {
            throw new Error("mouseUp function not implemented");
        },

        updateContext() {
            // debugger;
            this.mouseDownHandlerWithContext = mouseDownHandler.bind(this);
            this.mouseMoveHandlerWithContext = mouseMoveHandler.bind(this);
            this.mouseUpHandlerWithContext = mouseUpHandler.bind(this);
        }
    });

    function mouseDownHandler(e) {
        document.body.addEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.addEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.addEventListener("mouseleave", this.mouseUpHandlerWithContext);

        this.mouseDown(e);
    };

    function mouseMoveHandler(e) {
        this.mouseMove(e);
    };

    function mouseUpHandler(e) {
        document.body.removeEventListener("mousemove", this.mouseMoveHandlerWithContext);
        document.body.removeEventListener("mouseup", this.mouseUpHandlerWithContext);
        document.body.removeEventListener("mouseleave", this.mouseUpHandlerWithContext);

        this.mouseUp(e);
    }

    return Draggable;
})();

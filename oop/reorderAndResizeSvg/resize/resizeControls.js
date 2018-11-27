let ResizeControls = (function initializeResizeControls() {
    let parentClass = 'list';

    let wrapper;
    let handlers;
    let propagateEventToItemWithContext;

    function ResizeControls() {
        this.topOffset = 0;
    };

    Object.assign(ResizeControls.prototype, {
        drawBorderWithHandlers: function() {
            let justCreated = false;

            if (wrapper == null) {
                wrapper = document.createElementNS(svgNamespace, 'svg');
                wrapper.classList.add('wrapper');
                wrapper.setAttribute('fill', 'none');
                wrapper.style.stroke = strokeColor;
                justCreated = true;
            }
         
            wrapper.setAttribute('width', this.width + 2 * padding);
            wrapper.setAttribute('height', this.height + 2 * padding);
            wrapper.style.left = this.coord.x - padding + "px";
            
            if (document.querySelector('.' + parentClass) != null) {
                this.topOffset = document.querySelector('.' + parentClass).getBoundingClientRect().top;
            } 
            wrapper.style.top = this.topOffset + this.coord.y - padding + "px";

            if (wrapper != null && !justCreated) {
                window.requestAnimationFrame(updateResizeHandlers.bind(this));
                wrapper.style.display = 'initial';
                return;
            }

            border = document.createElementNS(svgNamespace, 'path');
            border.classList.add('border');
            
            let handlerT = new ResizePoint(this, ResizeTypeEnum.Top, 'handler-top');
            let handlerTR = new ResizePoint(this, ResizeTypeEnum.TopRight, 'handler-top-right');
            let handlerTL = new ResizePoint(this, ResizeTypeEnum.TopLeft, 'handler-top-left');

            let handlerB = new ResizePoint(this, ResizeTypeEnum.Bottom, 'handler-bottom');
            let handlerBL = new ResizePoint(this, ResizeTypeEnum.BottomLeft, 'handler-bottom-left');
            let handlerBR = new ResizePoint(this, ResizeTypeEnum.BottomRight, 'handler-bottom-right');

            let handlerL = new ResizePoint(this, ResizeTypeEnum.Left, 'handler-left');
            let handlerR = new ResizePoint(this, ResizeTypeEnum.Right, 'handler-right');

            handlers = [
                handlerT,
                handlerTR,
                handlerR,
                handlerB,
                handlerBL,
                handlerBR,
                handlerL,
                handlerTL
            ];
            
            window.requestAnimationFrame(updateResizeHandlers.bind(this));

            wrapper.style.display = 'initial';
            wrapper.append(
                border,
                ...handlers.map(x => x.element)
            );
            document.body.appendChild(wrapper);
        }
    });

    function updateResizeHandlers() {
        const offset = handlerSize / 2;

        wrapper.setAttribute('width', this.width + 2 * offset + padding);
        wrapper.setAttribute('height', this.height + 2 * offset + padding);

        border.setAttribute('d', 'M ' + offset + ' ' + offset 
            + ', H ' + (this.width + 2 * offset) 
            + ", V " + (this.height + 2 * offset) 
            + ', H ' + offset 
            + ', V' +  offset
        );

        let tmpHandler = propagateEventToItem.bind(this); 
        handlers.forEach(function(handler) {
            handler.removeListener("resized", propagateEventToItemWithContext);
            handler.addListener("resized", tmpHandler);
        });
        propagateEventToItemWithContext = tmpHandler;

        handlers.forEach(function(handler) {
            handler.updatePosition(this);
        }.bind(this));
    };

    function propagateEventToItem(e) {
        if (e.type = 'resized') {
            // console.log(this.id)
            this.fire(e);
        }
    }
    
    return ResizeControls;
})();
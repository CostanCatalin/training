let ResizeControls = (function initializeResizeControls() {
    let delta = {
        width: 0,
        height: 0
    };
    let parentClass = 'list';
    let topOffset;
    let resizing = ResizeTypeEnum.None;
    let self;

    let wrapper;
    let border, handlerT, handlerTR, handlerR, handlerBR, handlerB, handlerBL, handlerL, handlerTL;
    let mouseDownHandlerWithContext;

    function ResizeControls() {
    };

    Object.assign(ResizeControls.prototype, {
        drawBorderWithHandlers: function() {
            self = this;
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
            topOffset = document.querySelector('.' + parentClass) == null ? 0 : document.querySelector('.' + parentClass).getBoundingClientRect().top;   
            wrapper.style.top = topOffset + this.coord.y - padding + "px";

            mouseDownHandlerWithContext = mouseDownHandler.bind(this);

            if (wrapper != null && !justCreated) {
                wrapper.addEventListener("mousedown", mouseDownHandlerWithContext);
                updateResizeHandlers.call(this);
                wrapper.style.display = 'initial';
                return;
            }

            border = document.createElementNS(svgNamespace, 'path');
            border.classList.add('border');
            
            handlerT = document.createElementNS(svgNamespace, 'rect');
            handlerT.classList.add('handler', 'handler-top');

            handlerTR = document.createElementNS(svgNamespace, 'rect');
            handlerTR.classList.add('handler', 'handler-top-right');
    
            handlerR = document.createElementNS(svgNamespace, 'rect');
            handlerR.classList.add('handler', 'handler-right');

            handlerBR = document.createElementNS(svgNamespace, 'rect');
            handlerBR.classList.add('handler', 'handler-bottom-right');

            handlerB = document.createElementNS(svgNamespace, 'rect');
            handlerB.classList.add('handler', 'handler-bottom');
            
            handlerBL = document.createElementNS(svgNamespace, 'rect');
            handlerBL.classList.add('handler', 'handler-bottom-left');
    
            handlerL = document.createElementNS(svgNamespace, 'rect');
            handlerL.classList.add('handler', 'handler-left');

            handlerTL = document.createElementNS(svgNamespace, 'rect');
            handlerTL.classList.add('handler', 'handler-top-left');

            wrapper.addEventListener("mousedown" , mouseDownHandlerWithContext);
            window.requestAnimationFrame(updateResizeHandlers.bind(this));

            wrapper.style.display = 'initial';
            wrapper.append(border, handlerT, handlerTR, handlerR, handlerB, handlerBL, handlerBR, handlerL, handlerTL)
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
        
        handlerT.setAttribute('x', this.width / 2 + offset);
        handlerT.setAttribute('y', 1);

        handlerTR.setAttribute('x', this.width + offset);
        handlerTR.setAttribute('y', 1);

        handlerR.setAttribute('x', this.width + offset);
        handlerR.setAttribute('y', this.height / 2 + offset / 2);

        handlerBR.setAttribute('x', this.width + offset);
        handlerBR.setAttribute('y', this.height + offset);
    
        handlerB.setAttribute('x', this.width / 2  + offset);
        handlerB.setAttribute('y', this.height + offset);
        
        handlerBL.setAttribute('x', 1);
        handlerBL.setAttribute('y', this.height + offset);

        handlerL.setAttribute('x', 1);
        handlerL.setAttribute('y', this.height / 2 + offset / 2);

        handlerTL.setAttribute('x', 1);
        handlerTL.setAttribute('y', 1);
    };
    
    function mouseDownHandler(e) {
        if (!e.target.classList.contains('handler')) {
            return;
        }
        if (e.target.classList.contains('handler-top')) {
            resizing = ResizeTypeEnum.Top;

        } else if (e.target.classList.contains('handler-right')) {
            resizing = ResizeTypeEnum.Right;

        } else if (e.target.classList.contains('handler-bottom')) {
            resizing = ResizeTypeEnum.Bottom;

        } else if (e.target.classList.contains('handler-left')) {
            resizing = ResizeTypeEnum.Left;

        } else if (e.target.classList.contains('handler-top-right')) {
            resizing = ResizeTypeEnum.TopRight;

        } else if (e.target.classList.contains('handler-top-left')) {
            resizing = ResizeTypeEnum.TopLeft;

        } else if (e.target.classList.contains('handler-bottom-right')) {
            resizing = ResizeTypeEnum.BottomRight;
            
        } else if (e.target.classList.contains('handler-bottom-left')) {
            resizing = ResizeTypeEnum.BottomLeft;
        }

        if (resizing == ResizeTypeEnum.None) {
            return;
        }
        self = this;
        delta.width = 0; 
        delta.height = 0;

        document.body.addEventListener("mousemove", mouseMoveHandler);
        document.body.addEventListener("mouseup", mouseUpHandler);
        document.body.addEventListener("mouseleave", mouseUpHandler);
    };

    function mouseMoveHandler(e) {
        if (resizing == ResizeTypeEnum.Top || resizing == ResizeTypeEnum.Bottom || resizing >= 5) {
            let isBottom = resizing == ResizeTypeEnum.Bottom || resizing == ResizeTypeEnum.BottomLeft || resizing == ResizeTypeEnum.BottomRight;
            let newHeight = !isBottom ? (self.coord.y + self.height) - e.pageY + topOffset : e.pageY - self.coord.y -  topOffset;

            if (newHeight > maxHeight) newHeight = maxHeight;
            if (newHeight < minHeight) newHeight = minHeight;
            
            delta.height = newHeight - self.height;
        }

        if (resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.Right || resizing >= 5) {
            let isLeft = resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.TopLeft || resizing == ResizeTypeEnum.BottomLeft;
            let newWidth = isLeft ?  (self.coord.x + self.width) - e.pageX : e.pageX - self.coord.x;

            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;

            delta.width = (newWidth - self.width);
        }

        if (delta.height != 0 || delta.width != 0) {
            window.requestAnimationFrame(updateResizeHandlers.bind(self));
            self.resize(delta, resizing);
        }
    };

    function mouseUpHandler() {
        self.resize(delta, resizing, true);
        resizing = ResizeTypeEnum.None;

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);
    };

    return ResizeControls;
})();
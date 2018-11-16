let resizableMixin = (function initializeResizable(){
    let ResizeTypeEnum = Object.freeze({
        None: 0,
        Top: 1,
        Right: 2,
        Bottom: 3,
        Left: 4,
        TopLeft: 5,
        TopRight: 6,
        BottomLeft: 7,
        BottomRight: 8
    });
    const initialWidth = 500;
    const minWidth = 10;
    const maxWidth = 1500;
    const minHeight = 30;
    const maxHeight = 400;
    const padding = 8;

    let resizing = ResizeTypeEnum.None;
    let elem;

    let resizableMixin = {
        drawBorderWithHandlers(element) {
            let border = document.createElement('div');
            border.classList.add('border');
            border.style.width = element.getBoundingClientRect().width + 5 + "px";
            border.style.height = element.getBoundingClientRect().height + 5 + "px";

            let handlerT = document.createElement('div');
            handlerT.classList.add('handler', 'handler-top');
            handlerT.append(document.createElement('div'));

            let handlerTR = document.createElement('div');
            handlerTR.classList.add('handler', 'handler-top-right');
            handlerTR.append(document.createElement('div'));
    
            let handlerR = document.createElement('div');
            handlerR.classList.add('handler', 'handler-right');
            handlerR.append(document.createElement('div'));

            let handlerBR = document.createElement('div');
            handlerBR.classList.add('handler', 'handler-bottom-right');
            handlerBR.append(document.createElement('div'));

            let handlerB = document.createElement('div');
            handlerB.classList.add('handler', 'handler-bottom');
            handlerB.append(document.createElement('div'));
            
            let handlerBL = document.createElement('div');
            handlerBL.classList.add('handler', 'handler-bottom-left');
            handlerBL.append(document.createElement('div'));
    
            let handlerL = document.createElement('div');
            handlerL.classList.add('handler', 'handler-left');
            handlerL.append(document.createElement('div'));

            let handlerTL = document.createElement('div');
            handlerTL.classList.add('handler', 'handler-top-left');
            handlerTL.append(document.createElement('div'));

            handlerT.addEventListener("mousedown" , mouseDownHandler);
            handlerB.addEventListener("mousedown" , mouseDownHandler);

            handlerL.addEventListener("mousedown" , mouseDownHandler);
            handlerR.addEventListener("mousedown" , mouseDownHandler);

            handlerTR.addEventListener("mousedown" , mouseDownHandler);
            handlerBR.addEventListener("mousedown" , mouseDownHandler);

            handlerTL.addEventListener("mousedown" , mouseDownHandler);
            handlerBL.addEventListener("mousedown" , mouseDownHandler);

            border.append(handlerT, handlerTR, handlerR, handlerBR, handlerB, handlerBL, handlerL, handlerTL)
            element.append(border);
        }
    };
    
    function mouseDownHandler(e) {
        if (e.target.classList.contains('handler-top')) {
            resizing =  ResizeTypeEnum.Top;

        } else if (e.target.classList.contains('handler-right')) {
            resizing =  ResizeTypeEnum.Right;

        } else if (e.target.classList.contains('handler-bottom')) {
            resizing =  ResizeTypeEnum.Bottom;

        } else if (e.target.classList.contains('handler-left')) {
            resizing =  ResizeTypeEnum.Left;

        } else if (e.target.classList.contains('handler-top-right')) {
            resizing =  ResizeTypeEnum.TopRight;

        } else if (e.target.classList.contains('handler-top-left')) {
            resizing =  ResizeTypeEnum.TopLeft;

        } else if (e.target.classList.contains('handler-bottom-right')) {
            resizing =  ResizeTypeEnum.BottomRight;
            
        } else if (e.target.classList.contains('handler-bottom-left')) {
            resizing =  ResizeTypeEnum.BottomLeft;
        }
        elem = e.target.closest('.item');
        document.body.addEventListener("mousemove", mouseMoveHandler);
        document.body.addEventListener("mouseup", mouseUpHandler);
    }

    function mouseMoveHandler(e) {
        let rect = elem.getBoundingClientRect();
        
        let left = parseInt(elem.style.left.replace("px", '')) || 0;
        let border = elem.querySelector('.border');

        if (resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.Right || resizing >= 5) {
            let isLeft = resizing == ResizeTypeEnum.Left || resizing == ResizeTypeEnum.TopLeft || resizing == ResizeTypeEnum.BottomLeft;
            let prevWidth = parseInt(elem.style.width.replace('px', '')) || initialWidth;
            let newWidth = isLeft ? rect.right - e.pageX : e.pageX - rect.left;

            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;

            elem.style.width = newWidth + "px";
            border.style.width = newWidth + padding/2 + "px";
            
            if (isLeft) {
                elem.style.left = left - (newWidth - prevWidth) + "px";
            }
        }

        if (resizing == ResizeTypeEnum.Top || resizing == ResizeTypeEnum.Bottom || resizing >= 5) {
            let isBottom = resizing == ResizeTypeEnum.Bottom || resizing == ResizeTypeEnum.BottomLeft || resizing == ResizeTypeEnum.BottomRight;
            let height = !isBottom ? rect.bottom - e.pageY : e.pageY - rect.top;

            if (height > maxHeight) height = maxHeight;
            if (height < minHeight) height = minHeight;
            
            border.style.height = height + padding + "px";

            if (resizing == ResizeTypeEnum.Bottom || resizing == ResizeTypeEnum.BottomLeft || resizing == ResizeTypeEnum.BottomRight) {
                elem.style.height = height + padding / 2+ "px";
            }
        }
    }

    function mouseUpHandler(e) {
        if (resizing == ResizeTypeEnum.Top || resizing == ResizeTypeEnum.TopLeft || resizing == ResizeTypeEnum.TopRight) {
            elem.style.height = elem.querySelector('.border').style.height.replace("px", '') - padding / 2 + "px";
        }
        resizing = ResizeTypeEnum.None;

        document.body.removeEventListener("mousemove", mouseMoveHandler);
        document.body.removeEventListener("mouseup", mouseUpHandler);
    }

    return resizableMixin;
})();

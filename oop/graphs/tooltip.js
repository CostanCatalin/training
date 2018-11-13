let Tooltip = function (target, text) {
    const topOffset = 35;
    let tooltipComponent = document.createElement("div");
    tooltipComponent.classList.add("tooltip");
    tooltipComponent.innerText = text;

    target.setAttribute('data-tooltip', text);
    target.addEventListener("mouseenter", mouseEnterHandler);

    function mouseEnterHandler(e) {
        mouseMoveHandler(e);
        document.body.appendChild(tooltipComponent);

        e.target.addEventListener("mousemove", mouseMoveHandler);
        e.target.addEventListener("mouseleave", mouseLeaveHandler);
    }

    function mouseMoveHandler(e) {
        tooltipComponent.style.left = e.pageX + "px";
        tooltipComponent.style.top = e.pageY + topOffset + "px";
    }

    function mouseLeaveHandler(e) {
        e.target.removeEventListener("mousemove", mouseMoveHandler);
        e.target.removeEventListener("mouseleave", mouseLeaveHandler);
        document.querySelector('.tooltip').remove();
    }
}
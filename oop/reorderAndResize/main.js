(function initialize() {
    let list = new List(10);
    list.items[8].element.firstChild.style.backgroundColor = "green";
    list.draw();
})();
(function itemList(){
    let dest = document.querySelector('.item-list');
    let lastItemIndex = itemsCount - 1;

    function init() {
        for (let i = 0; i < itemsCount; i++) {
            let newItem = newListItem(i);
            dest.append(newItem);
        } 
    }

    function newListItem(index) {
        let item = document.createElement('div');
        item.classList.add('item', 'item-' + index);

        let name = document.createElement('p');
        name.classList.add('name');
        name.innerText = index + ". " + itemName;

        let desc = document.createElement('p');
        desc.classList.add('description');
        desc.innerText = itemDesc;

        let controls = document.createElement('div');
        controls.classList.add('controls');

        let remove = document.createElement('div');
        remove.addEventListener('click', removeItem);
        remove.classList.add('remove');
        remove.innerText = "-";

        let add = document.createElement('div');
        add.addEventListener('click', addItem);
        add.classList.add('add');
        add.innerText = "+";

        controls.append(remove);
        controls.append(add);

        item.append(name);
        item.append(desc);
        item.append(controls);

        return item;
    }

    function removeItem(e) {
        let currentItem = e.target.parentElement.parentElement;

        if (currentItem.parentElement.childElementCount > 1) {
            currentItem.remove();
        } else {
            alert('Can\'t delete the last item');
        }
    }

    function addItem(e) {
        let newItem = newListItem(++lastItemIndex);
        let currentItem = e.target.parentElement.parentElement;
        currentItem.parentElement
            .insertBefore(newItem, currentItem.nextSibling);
    }

    init();
})();
let Node = (function NodeModule() {
    function Node(val = null, parent = null) {
        this.parent = parent;
        this.value = val;
        this.height = 0;
        this.leftChild = null;
        this.rightChild = null;
    }

    return Node;
})();
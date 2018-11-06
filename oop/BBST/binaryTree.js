let BinaryTree = (function BinaryTreeModule() {
    let tempParseVect = [];

    function BinaryTree() {
        this.root = new Node();
        this.firstCall = true;
    }

    Object.assign(BinaryTree.prototype, {
        add: function (value) {
            if (this.root.value == null) {
                this.root = new Node(value);
                return;
            }   

            let currentNode = this.root;
            let found = false;

            while (!found) {
                if (value <= currentNode.value) {
                    if (currentNode.leftChild != null) {
                        currentNode = currentNode.leftChild;
                    } else {
                        let newNode = new Node(value, currentNode);
                        currentNode.leftChild = newNode;
                        currentNode = newNode;
                        found = true;
                    }

                } else {
                    if (currentNode.rightChild != null) {
                        currentNode = currentNode.rightChild;
                    } else {
                        let newNode = new Node(value, currentNode);
                        currentNode.rightChild = newNode;
                        currentNode = newNode;
                        found = true;
                    }
                }
            }

            let iterNode = currentNode;

            while (iterNode != null) {
                if (iterNode.leftChild == null && iterNode.rightChild == null) {
                    iterNode.height = 0;
                } else {
                    iterNode.height = Math.max(valueOrDefault(iterNode.leftChild, 'height'), valueOrDefault(iterNode.rightChild, 'height')) + 1;
                }
                iterNode = iterNode.parent;
            }

            currentNode = balanceTree(currentNode);
            if (this.root.parent != null) {
                this.root = this.root.parent;
            }
        },

        delete: function (value) {
            let node = this.find(value);
            if (!node) {
                return false;
            }
            
            // delete root with no children
            if (node.parent == null && node.leftChild == null && node.rightChild == null) {
                this.root = null;
                return true;
            }

            // delete leaf
            if (node.leftChild == null && node.rightChild == null) {
                let parent = node.parent;
                if (parent.leftChild  != null && parent.leftChild.value == node.value) {
                    parent.leftChild = null;
                } else if (parent.rightChild.value == node.value) {
                    parent.rightChild = null;
                }

                return true;
            }

            // delete node with 1 children
            if (node.leftChild == null || node.rightChild == null) {
                let isLeftChild = node.parent.leftChild != null && node.parent.leftChild.value == value;
                let hasLeftChild = node.leftChild != null;

                if (isLeftChild) {
                    if (hasLeftChild) {
                        node.parent.leftChild = node.leftChild;
                        node.leftChild.parent = node.parent;
                    } else {
                        node.parent.leftChild = node.rightChild;
                        node.rightChild.parent = node.parent;
                    }
                } else {
                    if (hasLeftChild) {
                        node.parent.rightChild = node.leftChild;
                        node.leftChild.parent = node.parent;
                    } else {
                        node.parent.rightChild = node.rightChild;
                        node.rightChild.parent = node.parent;
                    }
                }

                return true;
            }

            // has both children
            let replacement = node.leftChild;
            while (replacement.leftChild != null) {
                replacement = replacement.leftChild;
            }

            if (replacement.rightChild != null) {
                let newNode = replacement.rightChild;
                newNode.parent = replacement.parent;
                replacement.parent.leftChild = newNode;
            } else {
                replacement.parent.leftChild = null;
            }

            replacement.parent = node.parent;
            replacement.leftChild = node.leftChild;

            if (replacement.leftChild != null) {
                replacement.leftChild.parent = replacement;
            }
            replacement.rightChild = node.rightChild;
            if (replacement.rightChild != null) {
                replacement.rightChild.parent = replacement;
            }
            if (replacement.parent == null) {
                this.root = replacement;
            }

            updateHeights(this.root);
            this.root = balanceTree(this.root);
            return true;

        },

        find: function (value, node = this.root) {
            if (node === undefined || !node instanceof Node || node == null) {
                return false;
            }

            if (node.value == value) {
                return node;
            } else if (value < node.value) {
                return this.find(value, node.leftChild);
            } else {
                return this.find(value, node.rightChild);
            }
        },

        bfs: function () {
            tempParseVect = [];
            innerBfs(this.root);
            return tempParseVect;
        },

        dfs: function () {
            tempParseVect = [];
            innerDfs(this.root);
            return tempParseVect;
        }

    });

    function balanceTree(node) {
        let root = node;

        while (node != null) {
            if (Math.abs(valueOrDefault(node.leftChild, 'height') - valueOrDefault(node.rightChild, 'height')) > 1) {
                switch(rotationCase(node)) {
                    case 'LL':
                        node = rightRotate(node);
                        break;

                    case 'RR':
                        node = leftRotate(node);
                        break;

                    case 'LR':
                        node.leftChild = leftRotate(node.leftChild);
                        node = rightRotate(node);
                        break;

                    case 'RL':
                        node.rightChild = rightRotate(node.rightChild);
                        node = leftRotate(node);
                        break;
                }
                
                root = updateHeights(node);
            }
            node = node.parent;
        }
        
        return root;
    }

    function innerBfs(node, first = true) {
        if (node === undefined || !node instanceof Node || node == null) {
            return;
        }

        if (first) {
            tempParseVect.push(node.value);
        }

        if (node.leftChild != null) {
            tempParseVect.push(node.leftChild.value);
        }
        if (node.rightChild != null) {
            tempParseVect.push(node.rightChild.value);
        }

        innerBfs(node.leftChild, false);
        innerBfs(node.rightChild, false);
    };

    function innerDfs(node) {
        if (node === undefined || !node instanceof Node || node == null) {
            return;
        }

        tempParseVect.push(node.value);
        innerDfs(node.leftChild);
        innerDfs(node.rightChild);
    };

    function rotationCase(node) {
        let res = node.leftChild == null || node.rightChild != null && node.leftChild.height < node.rightChild.height ? 'R' : 'L';

        let child = res == 'L' ? node.leftChild : node.rightChild;
        res += child.leftChild == null ? 'R' : 'L';

        return res;
    }

    function leftRotate(oldRoot) {
        let newRoot = oldRoot.rightChild;
        newRoot.parent = oldRoot.parent;

        if (oldRoot.parent != null) {
            if (oldRoot.parent.leftChild != null && oldRoot.parent.leftChild.value == oldRoot.value) {
                oldRoot.parent.leftChild = newRoot;
            } else {
                oldRoot.parent.rightChild = newRoot;
            }
        }
        
        let leftBranch = newRoot.leftChild;
        newRoot.leftChild = oldRoot;
        oldRoot.parent = newRoot;

        
        oldRoot.rightChild = leftBranch;
        if (oldRoot.rightChild != null) {
            oldRoot.rightChild.parent = oldRoot;
        }

        return newRoot;
    };

    function rightRotate(oldRoot) {
        let newRoot = oldRoot.leftChild;
        newRoot.parent = oldRoot.parent;

        if (oldRoot.parent != null) {
            if (oldRoot.parent.leftChild != null && oldRoot.parent.leftChild.value == oldRoot.value) {
                oldRoot.parent.leftChild = newRoot;
            } else {
                oldRoot.parent.rightChild = newRoot;
            }
        }

        let rightBranch = newRoot.rightChild;
        newRoot.rightChild = oldRoot;
        oldRoot.leftChild = rightBranch;
        oldRoot.parent = newRoot;

        if (oldRoot.leftChild != null) {
            oldRoot.leftChild.parent = oldRoot;
        }
        
        return newRoot;
    };

    function updateHeights(node) {
        if (node == null) {
            return null;
        } else if (node.leftChild == null & node.rightChild == null){
            node.height = 0;
            return node;
        }

        node.leftChild = updateHeights(node.leftChild);
        node.rightChild = updateHeights(node.rightChild);
        node.height = Math.max(valueOrDefault(node.leftChild, 'height'), valueOrDefault(node.rightChild, 'height')) + 1;

        return node;
    }

    function valueOrDefault(obj, prop) {
        return (obj == null ? 0 : obj[prop]);
    }

    return BinaryTree;
})();

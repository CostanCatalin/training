function getInit() {
    let binaryTree = new BinaryTree();
    binaryTree.add(2);
    binaryTree.add(4);
    binaryTree.add(0);
    binaryTree.add(1);
    binaryTree.add(-1);
    binaryTree.add(3);
    binaryTree.add(5);

    return binaryTree;
}

function arrayEquality(a, b) {
    if (a === b) return true;
    if (a == null || b == null || a.length != b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false;
    }

    return true;
}

QUnit.test("first bfs", function( assert ) {
    let binaryTree = getInit();
    assert.ok( arrayEquality(binaryTree.bfs(), [2, 0, 4, -1, 1, 3, 5]), "Passed!" );
});

QUnit.test("first dfs", function( assert ) {
    let binaryTree = getInit();
    assert.ok( arrayEquality(binaryTree.dfs(), [2, 0, -1, 1, 4, 3, 5]), "Passed!" );
});

QUnit.test("find -- finds", function( assert ) {
    let binaryTree = getInit();
    let res = binaryTree.find(3);
    assert.ok( res instanceof Node && res.value == 3, "Passed!" );
});

QUnit.test("find -- doesn't find", function( assert ) {
    let binaryTree = getInit();
    let res = binaryTree.find(30);
    assert.ok( !res, "Passed!" );
});

QUnit.test("height", function( assert ) {
    let binaryTree = getInit();
    let res = binaryTree.find(0);
    assert.ok( res.leftChild.height < res.height < res.parent.height, "Passed!" );
});

QUnit.test("deleting leaf", function( assert ) {
    let binaryTree = getInit();
    let res = binaryTree.delete(5);
    assert.ok( res && binaryTree.dfs().indexOf(5) == -1, "Passed!" );
    binaryTree.add(5);
});

// --- tests for rotations on add
QUnit.test("rotation -- RR", function(assert) {
    let binaryTree = getInit();
    binaryTree.add(101);
    binaryTree.add(102);
    binaryTree.add(103);
    let res = binaryTree.dfs();
    const expected = [4, 2, 0, -1, 1, 3, 5, 101, 102, 103];

    assert.ok( arrayEquality(res, expected), "Passed!");
});

// --- tests for rotations on add
QUnit.test("rotation -- LL", function(assert) {
    let binaryTree = getInit();
    binaryTree.add(-2);
    binaryTree.add(-3);
    binaryTree.add(-4);
    let res = binaryTree.dfs();
    const expected1 = [-1, -2, -3, -4, 2, 0, 1, 4, 3, 5]; 
    assert.ok( arrayEquality(res, expected1) || arrayEquality(res, expected2), "Passed!");
});

//--- tests for rotations on add
QUnit.test("rotation -- LR", function(assert) {
    let binaryTree = getInit();
    binaryTree.add(-5);
    binaryTree.add(-2);
    binaryTree.add(-3);
    
    let res = binaryTree.dfs();
    const expected = [-1, -5, -2, -3, 2, 0, 1, 4, 3, 5];
    assert.ok( arrayEquality(res, expected), "Passed!");
});

//--- tests for rotations on add
QUnit.test("rotation -- RL", function(assert) {
    let binaryTree = getInit();
    binaryTree.add(8);
    binaryTree.add(7);
    
    let res = binaryTree.dfs();
    const expected = [2, 0, -1, 1, 5, 4, 3, 8, 7];
    assert.ok( arrayEquality(res, expected), "Passed!");
});

QUnit.test("deleting node", function( assert ) {
    let binaryTree = getInit();
    let res = binaryTree.delete(5);
    assert.ok( res && binaryTree.dfs().indexOf(5) == -1, "Passed!" );
    binaryTree.add(5);
});

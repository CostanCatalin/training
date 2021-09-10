const Stiva = require('./stiva');
let stack = new Stiva();

test('initilizes the Stack', () => {
    stack = new Stiva();
    expect(stack.get_size()).toBe(0);
});

test('after push -- size', () => {
    stack.push(301);
    expect(stack.get_size()).toBe(1);
});

test('Top', () => {
    expect(stack.top()).toBe(301);
});

test('same after top -- size', () => {
    expect(stack.get_size()).toBe(1);
});

test('isEmpty v1', () => {
    expect(stack.is_empty()).toBe(false);
});

test('Pop', () => {
    expect(stack.pop()).toBe(301);
});

test('empty after pop -- size', () => {
    expect(stack.get_size()).toBe(0);
});

test('isEmpty v2', () => {
    expect(stack.is_empty() && stack.get_size() == 0).toBe(true);
});

test('limit can\'t be negative', () => {
    let previous = stack.limit;
    stack.limit = -1;
    expect(stack.limit).toBe(previous);
});

test('Clear', () => {
    stack.push(1);
    stack.clear();
    expect(stack.is_empty()).toBe(true);
});

test('isFull', () => {
    stack.limit = 1;
    stack.push(100);
    expect(stack.is_full()).toBe(true);
});

test('isFull v2', () => {
    expect(stack.push(100)).toBeFalsy();
});

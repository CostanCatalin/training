// -- Draggable
let DragAxisEnum = Object.freeze({
    Both: 0,
    onlyX: 1,
    onlyY: 2
});

// -- List
const itemHeight = 30;
const itemSpacing = 15;

// -- Item
const svgNamespace = 'http://www.w3.org/2000/svg';
const initialWidth = 500;
const initialHeight = 30;
const padding = 8;
const X = 700;

// -- Resizable
const handlerSize = 10;
const minWidth = 10 ;
const maxWidth = 1500;
const minHeight = 10;
const maxHeight = 400;
const strokeColor = '#d24726';
const pageMargin = 20;

const ResizeTypeEnum = Object.freeze({
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

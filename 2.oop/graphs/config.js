let GraphTypeEnum = Object.freeze({
    Doughnut: 0,
    DoughnutCombined: 1,
    Pie: 2,
    HorizontalBar: 3,
    VerticalBar: 4
});

let input = JSON.stringify({
    title: "First chart",
    // customStyleClass : "custom-class",
    data: [
        {
            label: "Label 1",
            percent: 5,
            backgroundColor: "#" + Math.random().toString(16).slice(2, 8)
        },{
            label: "Label 2",
            percent: 10,
            backgroundColor: "#" + Math.random().toString(16).slice(2, 8)
        },{
            label: "Label 3",
            percent: 15,
            backgroundColor: "#" + Math.random().toString(16).slice(2, 8)
        },{
            label: "Label 4",
            percent: 20,
            backgroundColor: "#" + Math.random().toString(16).slice(2, 8)
        },{
            label: "Label 5",
            percent: 35,
            backgroundColor: "#" + Math.random().toString(16).slice(2, 8)
        }
    ]
});

(function main(input) {
    let doughnut = GraphFactory(input, GraphTypeEnum.Doughnut);
    document.body.appendChild(doughnut.draw());

    let doughnutCombined = GraphFactory(input, GraphTypeEnum.DoughnutCombined);
    document.body.appendChild(doughnutCombined.draw());

    let pie = GraphFactory(input, GraphTypeEnum.Pie);
    document.body.appendChild(pie.draw());

    let barV = GraphFactory(input, GraphTypeEnum.VerticalBar);
    document.body.appendChild(barV.draw());

    let barH = GraphFactory(input, GraphTypeEnum.HorizontalBar);
    document.body.appendChild(barH.draw());
    // debugger;
})(input);

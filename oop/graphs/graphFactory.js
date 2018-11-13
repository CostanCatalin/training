let GraphFactory = (function() {

    function GraphFactory(input, type) {
        let graph = null;

        switch(type) {
            case GraphTypeEnum.Doughnut:
                graph = new Doughnut(input);
                break;
    
            case GraphTypeEnum.DoughnutCombined:
                graph = new DoughnutCombined(input);
                break;
    
            case GraphTypeEnum.Pie:
                graph = new Pie(input);
                break;

            case GraphTypeEnum.VerticalBar:
                graph = new VerticalBar(input);
                break;
    
            case GraphTypeEnum.HorizontalBar:
                graph = new HorizontalBar(input);
                break;
    
            default:
                throw new Error("Selected chart type not found");
        }

        graph.items = percentageSumTo100(graph.items);
        return graph;
    }

    function percentageSumTo100(items) {
        let percentageSum = 0;
        for (let i = 0; i < items.length; i++){
            let item = items[i];
            percentageSum += item.percent;
        }

        if (percentageSum == 100) {
            return;

        } else if (percentageSum < 100) {
            items.push({label: 'unknown', percent: 100 - percentageSum, backgroundColor: 'rgba(221, 219, 219, 0.973)'});

        } else {
            for (let i = 0; i < items.length; i++){
                let item = items[i];
                item.percent = Math.round(item.percent / percentageSum * 100);
            }
        }

        return items;
    }

    return GraphFactory;
})();
let Graph = (function initializeGraph() {
    
    function Graph(serializedData) {
        const data = JSON.parse(serializedData);
        this.title = data.title;
    
        this.items = data.data;
        this.class = data.customClass;
        this.customStyleClass = data.customStyleClass;
        this.legend = new Legend(this.items);
    }

    Object.assign(Graph.prototype, {
        draw: function() {
            throw new Error("Method not implemented");
        },

        getWrapper: function() {
            let wrapper = document.createElement('div');
            wrapper.classList.add('chart-wrapper');
            if (this.customStyleClass) wrapper.classList.add(this.customStyleClass);
            let title = document.createElement('h2');
            title.innerText = this.title;
            wrapper.appendChild(title);
            let dest = document.createElement('div');
            dest.classList.add('wrapper');
            wrapper.appendChild(dest);
            wrapper.append(this.legend.draw());
    
            return wrapper;
        }
    });

    return Graph;
})();
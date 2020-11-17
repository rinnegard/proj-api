const stock = {
    random: function () {
            return Math.random() > 0.5 ? 1 : -1;
    },
    getStockPrice: function (input) {
        let start = input.start;
        let rate = input.rate;
        let variance = input.variance;

        return start * rate + variance * stock.random();
    }

}


module.exports = stock;

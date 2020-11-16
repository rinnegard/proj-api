const stock = {
    random: function functionName() {
            return Math.random() > 05 ? 1 : -1;
    },
    getStockPrice: function (input) {
        let start = input.start;
        let rate = input.rate;
        let variance = input.variance;

        return start * rate + variance * stock.random();
    }

}


module.exports = stock;

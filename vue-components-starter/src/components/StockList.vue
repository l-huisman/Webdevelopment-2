<template>
  <h1 class="pt-5">Stock list</h1>
  <div class="row">
    <StockItem v-for="stock in stocks" :stock="stock" @buy="buyStock" />
  </div>
  <h1 class="pt-5">Portfolio</h1>
  <div class="row">
      <PortfolioItem v-for="stock in portfolio" :stock="stock" :currentPrice="getStockPrice(stock)" />
  </div>
</template>

<script>
import StockItem from "./StockItem.vue";
import PortfolioItem from "./PortfolioItem.vue";

export default {
  name: "StockList",
  components: {
    StockItem,
    PortfolioItem,
  },
  data() {
    return {
      stocks: [
        { name: "BMW", price: 61.05, previousPrice: 0, currency: "€" },
        { name: "Caterpillar", price: 146.49, previousPrice: 0, currency: "$" },
        { name: "AMD", price: 76.5, previousPrice: 0, currency: "$" },
        { name: "Gazprom", price: 4.583, previousPrice: 0, currency: "$" },
      ],
      portfolio: [],
    };
  },
  methods: {
    updatePrices() {
      this.stocks.forEach((stock) => {
        stock.previousPrice = stock.price;
        stock.price += (Math.random() - 0.5) * 2;
        if (stock.price < 0) {
          stock.price = 0;
        }
      });
    },
    buyStock(stock, amount) {
      if (amount <= 0) {
        return;
      }
      this.portfolio.push({
        name: stock.name,
        price: stock.price,
        amount: amount,
      });
    },
    getStockPrice(stock) {
      for (let i = 0; i < this.stocks.length; i++) {
        if (this.stocks[i].name === stock.name) {
          console.log(this.stocks[i].price);
          return this.stocks[i].price;
        }
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.updatePrices();
    }, 500);
  },
};
</script>

<style scoped>

</style>
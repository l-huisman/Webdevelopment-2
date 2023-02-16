<template>
  <h1 class="pt-5">Stock list</h1>
  <div class="row">
    <StockItem v-for="stock in stocks" :stock="stock" @buy="buyStock" />
  </div>
</template>

<script>
import StockItem from "./StockItem.vue";

export default {
  name: "StockList",
  components: {
    StockItem
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
    buyStock(amount, name) {
      alert("You bought " + amount + " of " + name + " stocks.");
    },
    updatePrices() {
      this.stocks.forEach((stock) => {
        stock.previousPrice = stock.price;
        stock.price += (Math.random() - 0.5) * 2;
        if (stock.price < 0) {
          stock.price = 0;
        }
      });
    },
  },
  mounted() {
    setInterval(() => {
      this.updatePrices();
    }, 1000);
  },
};
</script>

<style scoped>

</style>
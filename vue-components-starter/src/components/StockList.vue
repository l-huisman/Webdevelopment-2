<template>
  <h1 class="pt-5">Starting Capital - Portfolio Value - Total</h1>
  <div class="row">
    <div class="col-md-4 mt-4">
      <div class="card">
        <div class="card-body">
          € {{ personalCapital.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="col-md-4 mt-4">
      <div class="card">
        <div class="card-body">
          € {{ portfolioValue.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="col-md-4 mt-4">
      <div class="card">
        <div class="card-body">
          € {{ (this.personalCapital + this.portfolioValue).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
  <h1 class="pt-5">Stock list</h1>
  <div class="row">
    <StockItem v-for="stock in stocks" :stock="stock" @buy="buyStock" />
  </div>
  <h1 class="pt-5">Portfolio</h1>
  <div class="row">
    <PortfolioItem v-for="stock in portfolio" :stock="stock" :currentPrice="convertToEuro(getPreviousStockPrice(stock))"
      @sell="sellStock" />
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
      personalCapital: 1000,
      portfolioValue: 0,
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
      this.portfolioValue = this.calculatePortfolioValue();
    },
    buyStock(stock, amount) {
      if (amount <= 0) {
        return;
      }
      if (stock.currency === "€") {
        if (this.personalCapital < stock.price * amount) {
          alert("You don't have enough money to buy this stock");
          return;
        }
        this.personalCapital -= stock.price * amount;
      } else {
        if (this.personalCapital < this.convertToEuro(stock.price) * amount) {
          alert("You don't have enough money to buy this stock");
          return;
        }
        this.personalCapital -= this.convertToEuro(stock.price) * amount;
      }
      this.portfolio.push({
        name: stock.name,
        price: this.convertToEuro(stock.price),
        amount: amount,
      });
    },
    sellStock(stock, amount) {
      if (amount <= 0 || amount > stock.amount || isNaN(amount)) {
        alert("Invalid amount must be greater than 0 and less than the amount you own");
        return;
      }

      for (let i = 0; i < this.portfolio.length; i++) {
        if (this.portfolio[i].name === stock.name && this.portfolio[i].price === stock.price) {
          this.personalCapital += this.calculateProfit(stock);
          this.portfolio[i].amount -= amount;
          if (this.portfolio[i].amount === 0) {
            this.portfolio.splice(i, 1);
          }
          break;
        }
      }
    },
    getPreviousStockPrice(stock) {
      for (let i = 0; i < this.stocks.length; i++) {
        if (this.stocks[i].name === stock.name) {
          return this.stocks[i].price;
        }
      }
    },
    calculatePortfolioValue() {
      let value = 0;
      this.portfolio.forEach((stock) => {
        value += this.calculateProfit(stock);
      });
      return value;
    },
    convertToEuro(price) {
      return price * 0.94;
    },
    calculateProfit(stock) {
      if (stock.currency === "$")
        return stock.price * stock.amount + (this.convertToEuro(this.stocks.find(s => s.name === stock.name).price) - stock.price) * stock.amount;
      // Profit =  BoughtPrice * Amount + (CurrentValue - BoughtPrice) * Amount
      return stock.price * stock.amount + (this.stocks.find(s => s.name === stock.name).price - stock.price) * stock.amount;
    }
  },
  mounted() {
    setInterval(() => {
      this.updatePrices();
    }, 1000);
  },
};
</script>

<style scoped></style>
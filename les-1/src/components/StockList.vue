<template>
    <div>
        <h1>Stonks</h1>
        <table @load="mounted">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks" :key="stock.id">
                    <td>{{ stock.id }}</td>
                    <!-- conditionally add the right css class to the stock price default is nothing -->
                    <td :class="{ red: stock.price < stock.previousPrice, green: stock.price > stock.previousPrice }">{{ stock.name }}</td>
                    <td :class="{ red: stock.price < stock.previousPrice, green: stock.price > stock.previousPrice }">{{ stock.price }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Button to update the stocks-->
        <button @click="updateStocks">Update Stocks</button>
    </div>
</template>

<script>
    export default {
        name : 'StockList',
        data() {
            return {
                stocks: [
                    { id: 1, name: 'BMW', price: 110 , previousPrice: 0 },
                    { id: 2, name: 'Google', price: 200, previousPrice: 0 },
                    { id: 3, name: 'Apple', price: 250, previousPrice: 0 },
                    { id: 4, name: 'Twitter', price: 8, previousPrice: 0 }
                ]
            }
        },
        methods: {
            // This function will update the stocks by randomly increasing or decreasing the price by 1 dollar
            updateStocks() {
                this.stocks.forEach(stock => {
                    stock.previousPrice = stock.price
                    stock.price = Math.round(stock.price + (Math.random() * 2 - 1))
                })
            }
        },
        mounted() {
            setInterval(this.updateStocks, 1000)
        },
    }
</script>

<style scoped>

    .red {
        color: red;
    }

    .green {
        color: green;
    }

</style>
<template><!-- Individual stock in portfolio -->
    <div class="col-md-4 mt-4">
        <div class="card">
            <div class="card-body">
                {{ stock.name }}
                <span :class="{
                    down: stock.price > currentPrice,
                    up: stock.price < currentPrice,
                }">{{ stock.currency }} {{ stock.price.toFixed(4) }} </span>
            </div>
            <div class="card-footer">
                <span>Amount: {{ stock.amount }}</span>
                {{ showMeStuff() }}
            </div>
        </div>
    </div>
<!-- End of individual stock in portfolio --></template>

<script>
export default {
    name: "PortfolioItem",
    props: {
        stock: Object,
        currentPrice: Number
    },
    methods: {
        showMeStuff() {
            console.log(this.stock);
            console.log(this.currentPrice);
        }
    }
}
</script>

<style scoped>
.up {
    color: green;
}

.down {
    color: red;
}
</style>
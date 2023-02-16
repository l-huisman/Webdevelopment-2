<template>
    <!-- Individual stocks -->
    <div class="col-md-4 mt-4">
        <div class="card">
            <div class="card-body">
                {{ stock.name }}
                <span :class="{
                    down: stock.price < stock.previousPrice,
                    up: stock.price > stock.previousPrice,
                }">{{ stock.currency }} {{ stock.price.toFixed(4) }}</span>
            </div>
            <input type="number" v-model="amount">
            <button class="btn btn-primary" @click="$emit('buy', stock, amount)">Buy</button>
        </div>
    </div>
    <!-- End of individual stocks -->
</template>

<script>
export default {
    name: "StockList",
    props: {
        stock: Object
    },
    data() {
        return {
            amount: 0
        }
    },
};
</script>

<style scoped>
.up {
    color: green;
}

.down {
    color: red;
}
</style>
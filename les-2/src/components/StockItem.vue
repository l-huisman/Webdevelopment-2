<template>
  <div class="col-md-4 mt-4">
      <div class="card">
          <div class="card-body">
              {{ stock.name }}
                  <span
                  :class="{
                      down: stock.price < stock.previousPrice,
                      up: stock.price > stock.previousPrice,
                  }">
                  {{ stock.currency }} {{ stock.price.toFixed(2) }}</span>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary" text="Buy" @click="$emit('buy', stock.name, amount)">Buy</button>
              <input type="number" v-model="amount">
          </div>
      </div>
  </div>
</template>

<script>
  export default {
      props:{
          stock: Object
      },
      data() {
          return {
              amount: 0
          };
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
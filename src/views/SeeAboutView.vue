<script setup>
import { onMounted, watch } from 'vue';
import { useCounterStore } from '@/stores/counter.js';
const counter = useCounterStore();
onMounted(() => {
  console.log(counter.count);
})
function add(num) {
  counter.increment(num);
}

watch(() => counter.count, (newVal) => {
  console.log('count 改變為', newVal);
})



</script>
<template>
  <h1>查看共享狀態資料是不是一樣?</h1>
  <div>
    <p>count</p>
    <p>{{ counter.count }}</p>
    <div>
      <button @click="add(2)">操控count +2</button>
    </div>
  </div>
  <div>
    <p>list</p>
    <p>{{ counter.list }}</p>
  </div>
</template>
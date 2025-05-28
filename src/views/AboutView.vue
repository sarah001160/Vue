<script setup>
import { onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter.js';
import SeeAbout from '@/components/SeeAbout.vue';
const counterStore = useCounterStore();
function add(num) {
  counterStore.increment(num);
}
function changeList(num) {
  return counterStore.handleList(num);
}
onMounted(() => {
  console.log(counterStore.count)
})
</script>
<template>
  <div class="about">
    <h1>About</h1>
    <p>共享狀態 pinia (Vue3)</p>
    <div>共享 count 數據 {{ counterStore.count }}</div>
    <div>
      <button @click="add(2)">操控count +2</button>
    </div>
    <div>
      <p>試著操控陣列，{{ counterStore.list }}</p>
      <button @click="changeList(2)">陣列第 0 筆+2</button>
    </div>
    <div>
      <SeeAbout />
    </div>
  </div>
</template>


<style scoped lang="sass">
.about
  padding: 2rem
</style>
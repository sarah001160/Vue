import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  let count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const list = reactive([3, 3]);
  function increment(num) {
    console.log('加多少?', num)
    count.value += num;
  }

  function handleList(num) {
    list[0] += num;

  }

  return {
    count, doubleCount, list,
    increment, handleList,
  }
})

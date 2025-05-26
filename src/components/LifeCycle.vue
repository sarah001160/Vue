<template>
  <div class="p-4">
    <h2>Vue 元件生命週期練習</h2>
    <p>計數器：{{ count }}</p>
    <button @click="increment">+1</button>
    <div class="box">+1 囉!</div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

// --------- Lifecycle Hooks ---------
onBeforeMount(() => {
  console.log('onBeforeMount：元件尚未掛載')
})

onMounted(() => {
  console.log('onMounted：元件已經掛載')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate：DOM 更新前')

})

onUpdated(() => {
  // 有些事情需要等DOM更新後才能做得，例如:動畫、資料更新後的畫面滾動...之類
  console.log('onUpdated：DOM 更新完成')
  const box = document.querySelector('.box');
  box.style.display = 'block'
  setTimeout(() => {
    box.style.display = 'none'
  }, 500)

})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount：元件將被卸載')
})

onUnmounted(() => {
  console.log('onUnmounted：元件已經卸載')
})
// -----------------------------------
</script>

<style scoped lang="sass">
/*scoped 區域 */
@use "@/assets/style/variables.sass" as *

.box
  width: 100%
  height: 200px
  display: none
</style>

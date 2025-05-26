<!-- 預設插槽 組件 -->
<script setup>
const props = defineProps({
  title: {
    type: String,
  }
})
</script>
<template>
  <div class="card">
    <h4>標題:{{ props.title }}</h4>
    <p class="descrip">敘述敘述~~~~</p>
    <div class="slotBox">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="sass">
.card
  min-width: 300px
  max-width: 300px
  max-height: 300px
  color: green
  background: orange
  border-radius: 0.5rem
  padding: 2rem
  overflow: hidden
  .descrip
    font-size: 0.8rem
    color: #333
    margin: 0.5rem 0
</style>
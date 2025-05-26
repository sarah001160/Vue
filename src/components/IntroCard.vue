<!-- 具名插槽-組件 -->
<!-- 介紹內容，標題樣式統一，但內容物可依照父元件給的不同素材呈現 -->
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
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped lang="sass">
.card
  min-width: 300px
  max-width: 300px
  max-height: 300px
  color: red
  background: yellow
  border-radius: 0.5rem
  padding: 2rem
  overflow: hidden
  .descrip
    font-size: 0.8rem
    color: #333
    margin: 0.5rem 0
</style>
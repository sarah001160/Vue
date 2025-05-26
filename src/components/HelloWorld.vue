<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: 'Hello!!!'
  },
  list: {
    type: Array,
    default: () => [
      { id: 1, name: 'default' }
    ]
  },
  itemObj: {
    type: Object,
    default: () => ({
      id: 1,
      name: 'default object'
    })
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="mainColor">{{ msg }}</h1>
    <p>{{ text }}</p>
    <div>動態傳入陣列: {{ list }}</div>
    <div>傳入物件{{ itemObj }}</div>
  </div>
</template>

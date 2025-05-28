<!--選單-->
<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
const navList = reactive([
  {
    title: '首頁',
    url: '/',
  },
  {
    title: 'Chart.js 練習',
    url: '/box',
  },
  {
    title: 'watch 與 watchEffect、解釋 deep 和 immediate',
    url: '/watch',
  },
  {
    title: '插槽練習',
    url: '/slot',
  },
  {
    title: 'pinia共享',
    url: '/about'
  }
])

</script>
<template>
  <nav class="darkColor">
    <ul>
      <li v-for="(item, index) in navList" :key="index">
        <RouterLink :to="item.url" class="link">{{ item.title }}</RouterLink>
      </li>
      <li>props、emit 用法</li>
      <li>v-if 與 v-show</li>
      <li>ref 與 reactive</li>
      <li>watch 與 watchEffect、解釋 deep 和 immediate </li>
      <li>getter是什麼?</li>
      <li>keep-alive</li>
      <li>元件生命週期</li>
    </ul>
  </nav>
</template>
<style scoped lang="sass">
nav
  overflow: hidden
  height: 100%
  overflow-y: auto
  ul
    padding: 10px
    li
      list-style: none
      margin-bottom: 2px
      padding: 8px
      border-radius: 0.5rem
      &:hover
        background: grey
      .link
        color: orange
        //color: inherit // 繼承父元素顏色
</style>
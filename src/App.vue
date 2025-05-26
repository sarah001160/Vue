<script setup>
import NavComp from './components/NavComp.vue';
</script>

<template>
  <section class="layout">
    <div class="nav">
      <NavComp />
    </div>
    <main class="content">
      <RouterView></RouterView>
    </main>
  </section>
</template>

<style scoped lang="sass">
.layout
  width: 100%
  height: 100%
  display: flex
  flex-direction: row
  .nav
    width: 15%
    position: fixed
    top: 0
    bottom: 0
  .content
    padding-left: 15%
    width: calc(100% - 15%)
</style>

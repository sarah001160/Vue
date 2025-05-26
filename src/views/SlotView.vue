<script setup>
import { ref } from 'vue'
import IntroCard from '@/components/IntroCard.vue'
import DefaultCard from '@/components/DefaultCard.vue'

const title = ref('影視區')
</script>
<template>
  <main>
    <h1>插槽練習 slot</h1>
    <div>
      <h2>默認插槽</h2>
      <div>
        <DefaultCard>
          預設插槽，直接在子元件內輸入文字即可~
          這邊的元素你從父元件傳入的，樣式的寫法就從父元件這邊設定。
          <img class="imgSize"
            src="https://images.unsplash.com/photo-1742836531244-de8454b8bc06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            alt="">
        </DefaultCard>
      </div>
    </div>
    <div>
      <h2>具名插槽</h2>
      <div class="slotArea">
        <IntroCard :title="title">
          <!-- 具名插槽，name=header的slot，內容可以放自己想放的 -->
          <!-- #header 這是語法糖寫法，原始寫法 v-slot:header --->
          <template #header>
            具名插槽一號 ^_^//
          </template>
          <!-- 原本的寫法是這樣 v-slot:content -->
          <template v-slot:content>
            <p>插槽一號的內容，放張圖片~</p>
            <img class="imgSize"
              src="https://images.unsplash.com/photo-1742836531244-de8454b8bc06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              alt="">
          </template>
        </IntroCard>

        <IntroCard :title="title">
          <template #header>
            具名插槽2號!!
          </template>
        </IntroCard>
      </div>

    </div>
  </main>
</template>
<style scoped lang="sass">
main
  padding: 1rem
.imgSize
  max-width: 250px
  height: auto
.slotArea
  display: flex
  gap: 15px
</style>
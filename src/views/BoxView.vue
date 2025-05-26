<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
// 匯入圖表組件
import LifeCycle from '@/components/LifeCycle.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import BarChart from '@/components/BarChart.vue';
import FloatingBar from '@/components/FloatingBar.vue';
import HorizontalBar from '@/components/HorizontalBar.vue';
import StackedBar from '@/components/StackedBar.vue';
import LineChart from '@/components/LineChart.vue';

const getData = async () => {
  let result = await axios.get('https://api.github.com/users');
  console.log(result)
}
const fakeList = ref(
  [{
    id: 1, name: '假資料'
  }]
)
const fakeObj = ref(
  {
    id: 1, name: '假物件'
  }
)
const isBar = ref(true)

// BarChart 假資料
const data = reactive([
  { name: 'Q1', value: 12 },
  { name: 'Q2', value: 5 },
  { name: 'Q3', value: 3 },
  { name: 'Q4', value: 30 },
])


const lineData = reactive([
  { name: '2020', value: 12 },
  { name: '2021', value: 12 },
  { name: '2022', value: 3 },
  { name: '2023', value: 30 },
])

function addData() {
  while (lineData.length < 8) {
    const tempY = Number(lineData[lineData.length - 1].name);
    const lastY = tempY ? tempY + 1 : new Date().getFullYear();
    const obj = { name: lastY, value: 30 }
    lineData.push(obj)
  }
}

function deleteData() {
  if (lineData.length > 0) {
    lineData.pop();
  }
}


onMounted(() => {
  getData();
})
</script>

<template>
  <main>
    <section>
      <!--靜態 props、動態 props，父傳子-->
      <HelloWorld msg="123456" :list="fakeList" :item-obj="fakeObj" />
    </section>

    <section>
      <h2>練習元件生命周期</h2>
      <LifeCycle />
    </section>

    <section>
      <h2>練習chart.js</h2>
      <div>
        <button @click="isBar = !isBar">開關barChart</button>
        <!-- v-show 不會銷毀元件，僅 display:none-->
        <BarChart v-show="isBar" :chartData="data" />
        <!-- <BarChart v-if="isBar" /> -->
      </div>
      <hr />
      <div>
        <FloatingBar />
      </div>
      <hr />
      <div>
        <HorizontalBar />
      </div>
      <div>
        <StackedBar />
      </div>
      <div>
        <LineChart :chartData="lineData" />
        <p>測試更新資料，圖表變化</p>
        <button @click="addData">新增資料</button>
        <button @click="deleteData">刪除資料</button>
      </div>
    </section>

  </main>
</template>
<style scoped lang="sass">
main
  padding: 1rem
section
  margin: 20px 0
  div
    margin: 20px 0
    padding: 20px
</style>

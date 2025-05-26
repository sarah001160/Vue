<!-- Floating Bar -->
<template>
  <div>
    <h3>FloatingBar</h3>
    <div>
      <canvas ref="chartCanvas" style="width:100%; height:300px;"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import {
  Chart, // 創建圖表
  BarElement, // 長條圖元素
  BarController, // 長條圖控制器
  CategoryScale, // 類別比例尺
  LinearScale, // 線性比例尺
  Tooltip, // 提示框
  Legend, // 圖例
  Title // 圖表標題
} from 'chart.js'

// 必須註冊 chart.js 所有需要用到的元件
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, Title)

const chartCanvas = ref(null) // 指定DOM
let chartInstance = null; // 不需要響應式的變數，不加ref()

// 假資料
const data = reactive([
  { name: 'A', value: 12 },
  { name: 'B', value: 5 },
  { name: 'C', value: 3 },
])

// 等 DOM 掛載後再調用 new Chart()
onMounted(() => {
  // 若 DOM 元素 chartCanvas 已存在
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        // x 軸資料
        labels: data.map(item => item.name),
        // 資料集
        datasets: [
          {
            label: '測試數據',
            // 要回傳數字區間 [10, 12]，這邊是浮動範圍
            data: data.map((item) => {
              return [item.value, item.value + 2];
            }),
            backgroundColor: ['orange', 'green', 'blue'],
            borderWidth: 2, // 圖表邊框寬度
          }
        ]
      },
      options: {
        responsive: true, // 是否響應式
        maintainAspectRatio: false, // 是否保持長寬比
        plugins: {
          legend: {
            position: 'top',// 圖例位置
          },
          title: { // 圖表標題
            display: true,
            text: 'Chart.js Floating Bar Chart' // 敘述
          }
        }
      },
    })
  }
})

onBeforeUnmount(() => {
  // 銷毀圖表(變數)，避免記憶體洩漏
  if (chartInstance) {
    chartInstance.destroy()
  }
})
onUnmounted(() => {
  console.log('檢查chartCanvas卸載了沒', chartCanvas.value, chartInstance)
})
</script>

<style scoped></style>

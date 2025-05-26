<!-- Stacked Bar -->
<template>
  <div>
    <h3>Stacked Bar</h3>
    <div>
      <canvas ref="chartCanvas" style="width:100%; height:300px;"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
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
//假資料2
const data2 = reactive([
  { name: 'D', value: 20 },
  { name: 'E', value: 30 },
  { name: 'F', value: 40 },
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
        // 資料集，包含多個資料集才能顯示堆疊(Stacked)效果
        datasets: [
          {
            label: '測試數據 1',
            data: data.map(item => item.value),
            backgroundColor: ['orange', 'green', 'blue'],
            borderWidth: 2, // 圖表邊框寬度
          },
          {
            label: '測試數據 2',
            data: data2.map(item => item.value),
            backgroundColor: ['gray', 'pink', 'pink'],
          }
        ]
      },
      options: {
        responsive: true, // 是否響應式
        //
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
        maintainAspectRatio: false, // 是否保持長寬比
        plugins: {
          legend: {
            position: 'top',// 圖例位置
          },
          title: { // 圖表標題
            display: true,
            text: 'Chart.js Floating Bar Chart' // 敘述
          }
        },
      },
    })
  }
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
})
</script>
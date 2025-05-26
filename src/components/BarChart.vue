<template>
  <div>
    <h3>Bar Chart</h3>
    <div class="content">
      <canvas ref="chartCanvas" id="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
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

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
})

const { chartData } = toRefs(props)

// 註冊
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, Title)

const chartCanvas = ref(null); // 指定 DOM
let chartInstance = null; // 不需要響應式的變數，不加ref()

// 等 DOM 掛載後再調用 new Chart()
onMounted(() => {
  // 若 DOM 元素 chartCanvas 已存在
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar', // test這可以用props控制?
      data: {
        // x 軸資料
        labels: chartData.value.map(item => item.name),
        datasets: [ // 資料集
          {
            label: '測試數據',
            data: chartData.value.map(item => item.value),
            backgroundColor: ['orange', 'green', 'blue'],
            borderWidth: 2, // 圖表邊框寬度
          }
        ]
      },
      options: {
        responsive: true, // true 撐大至容器寬度，false 不撐
        maintainAspectRatio: true, // 是否保持長寬比
        plugins: { // 插件
          legend: { // 圖例位置
            position: 'top',
          },
          title: { // 圖表標題
            display: true,
            text: '圖表標題'
          },
          tooltip: {
            backgroundColor: 'gray', // 背景顏色
            titleColor: '#fff', // 標題顏色
            bodyColor: '#fff', // 內容顏色
            borderColor: '#fff', // 邊框顏色
            borderWidth: 4, // 邊框寬度
            bodyFont: { // 內容字型
              family: 'Arial, sans-serif',
              size: 14,
              weight: 'bold',
            },
            titleFont: { // 標題字型
              family: 'Arial, sans-serif',
              size: 16,
              weight: 'bold',
            },
            padding: 10, // 內邊距
            displayColors: false, // false 不顯示顏色標示; true 顯示顏色標示
            callbacks: {
              // 自定義 tooltip 內容
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw + ' (單位)';
                return label;
              }
            }
          }
        }
      },

    })
  }
})

// 銷毀圖表(變數)，避免記憶體洩漏
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
onUnmounted(() => {
  console.log('檢查chartCanvas卸載了沒', chartCanvas.value, chartInstance)
})
</script>
<style scoped lang="sass">
.content
  min-width: 300px
  width: 560px
  height: 300px
</style>
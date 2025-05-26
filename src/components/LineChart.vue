<template>
  <div>
    <h3>Line Chart</h3>
    <div class="content">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, watchEffect, onMounted, onBeforeUnmount } from 'vue'
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
const chartConfig = {
  type: 'line',
  data: {
    // X 軸
    labels: chartData.value.map(item => item.name),
    // 資料集
    datasets: [
      {
        label: '折線圖數據 1',
        data: chartData.value.map(item => item.value),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      // {
      //   label: '折線圖數據 2',
      //   data: chartData.value.map(item => item.value * 2),
      //   borderColor: 'blue',
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      // },
    ],
    options: {
      responsive: true, // true 撐大至容器寬度，false 不撐
      maintainAspectRatio: true, // 是否保持長寬比
      plugins: {
        legend: {
          position: 'top', // 圖例位置
        },
        title: { // 圖表標題
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  }
}

const updateChartData = (newData) => {
  if (!chartInstance) return;
  // 更新圖表的資料
  chartInstance.data.labels = newData.map(item => item.name);
  chartInstance.data.datasets[0].data = newData.map(item => item.value);
  // 觸發更新
  chartInstance.update();
};

// 監聽 props
watch(chartData.value, (newData) => {
  updateChartData(newData); // 更新圖表
});


// 等DOM掛載再調用
onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, chartConfig);
  }
})

// 銷毀圖表(變數)，避免記憶體洩漏
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
})
</script>
<style scoped lang="sass">
.content
  width: 560px
  height: 300px
</style>
<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: "ChartComponent",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      new Chart(this.$refs.chartCanvas, {
        type: 'bar', // Change to 'line', 'pie', etc., as needed
        data: this.chartData,
        options: this.chartOptions,
      });
    },
  },
};
</script>

<style scoped>
/* Optional: Add styles for your chart container */
</style>

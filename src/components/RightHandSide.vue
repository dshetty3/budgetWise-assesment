<template>
  <div id="rhs" :class="{ active: currentSection === 'home' }">
    <div class="active-budget-card">
      <div class="stats">
        <div class="total">
          Spent
          <div id="budget-amount" style="color: rgb(229, 16, 16); font-size: 25px">
            $800
          </div>
        </div>
        <div class="divider"></div>
        <div class="middle">
          Available
          <div id="budget-amount" style="color: #31cd3e; font-size: 25px">
            $1200
          </div>
        </div>
        <div class="divider"></div>
        <div class="right1">
          Budget
          <div id="budget-amount" style="color: rgb(2, 8, 3); font-size: 25px">
            $2000
          </div>
        </div>
      </div>
      <div class="box-progress-bar">
        <span class="box-progress" style="width: 40%"></span>
      </div>
    </div>

    <br />
    <div class="recent">6 Month Snapshot</div>
    <br />
    <div class="graph">
      <canvas id="myChart" style="height: 350px"></canvas>
    </div>

    <br />
  <div class="recent">
    <div class="recent-transactions">Recent Transactions</div>
    <div class="see-all" @click="toggleView">{{ isViewVisible ? 'See None' : 'See all' }}</div>
    <br /><br />
  </div>
  <div class="view" v-if="isViewVisible">
    <div
      class="purchased-card"
      v-for="list in purchasedList"
      :key="list.label"
      style="cursor: pointer"
    >
      <div class="minimal-info">
        <div class="left">
          <div class="icon">
            <div
              style="position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column;"
            >
              <div
                style="position: relative; display: flex; justify-content: center; align-items: center;"
              >
                <div id="middle-circle1">
                  <img :src="list.image" alt="icon" />
                </div>
                <div id="progress-spinner" :style="{ 'background-color': list.hex }"></div>
              </div>
            </div>
          </div>
          <div class="info">
            <div id="title">
              <span>{{ list.label }}</span>
            </div>
            <div class="additional">{{ list.sublabel }}</div>
          </div>
        </div>
        <div class="right" style="white-space: nowrap">
          <span id="amount1" style="color: rgb(3, 6, 8)">${{ list.cost }}</span>
          <span id="date">{{ list.date }}</span>
        </div>
        <div class="right2">
          <i class="fa-solid fa-angle-right" style="margin-right: -20px"></i>
        </div>
      </div>
    </div>
  </div>

    <br />
    <div class="recent">Bank & Credit Cards</div>
    <br />
    <div class="purchased-card" style="cursor: pointer">
      <div class="minimal-info">
        <div class="left">
          <div class="icon">
            <div
              style=" position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column; ">
              <div
                style=" position: relative; display: flex; justify-content: center; align-items: center; ">
                <img :src="bankImage" id="bank" alt="BOA" />
              </div>
            </div>
          </div>
          <div class="info">
            <div id="title">
              <span>Bank of America</span>
            </div>
            <div class="additional">...4765</div>
          </div>
        </div>
        <div class="right">
          <span id="amount" style="color: #6970c9">Balance</span>
          <span id="date" style="color: #6970c9">$1,326.23</span>
        </div>
        <i class="fa-solid fa-angle-up" style="margin-right: -20px"></i>
      </div>
    </div>

    <br />
    <div class="recent">
      Savings Goals
      <div class="see-all"><span style="font-size: 3rem">+</span></div>
    </div>

    <div class="graph1">
      <div class="trip">
        Italy Trip
        <div
          class="see-all1" style=" color: rgb(105, 112, 201); margin-left: 32rem; margin-top: -1.5rem; font-size: 1.2rem; ">
          See details
        </div>
      </div>
      <br />

      <canvas id="myDoughnutChart" style="width: 150px;"></canvas>

      <div id="additionalText" class="additional-text"></div>
      <div id="additionalText1" class="additional-text1"></div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: {
    currentSection: String,
  },
  data() {
    return {
      isViewVisible: false,
      bankImage: require('@/assets/BOA.png'),
      purchasedList: [
        { label: "Cold Brew", hex: 'rgb(8, 29, 149)', image: 'https://budgetwise.co/img/gift.811ce353.svg', sublabel: 'Starbucks', cost: '5.92', date: '03-30-2022' },
        { label: "Coursera", hex: 'rgb(83, 213, 228)', image: 'https://budgetwise.co/img/education.20df2648.svg', sublabel: 'Education', cost: '39.00', date: '03-12-2022' },
        { label: "AppleTree", hex: 'rgb(52, 196, 62)', image: 'https://budgetwise.co/img/groceries.e667316a.svg', sublabel: 'Groceries', cost: '3.98', date: '03-03-2022' },
        { label: "BKST-U-PENN", hex: 'rgb(32, 139, 215)', image: 'https://budgetwise.co/img/shopping.a541af7b.svg', sublabel: 'Shopping', cost: '49.89', date: '03-03-2022' },
      ],
      myBarChart: null,
      myDoughnutChart: null,
    };
  },
  mounted() {
    Chart.register(...registerables);
    this.renderCharts();
  },
  updated() {
    if (this.currentSection === 'home') {
      this.renderCharts();
    }
  },
  methods: {
    toggleView() {
      this.isViewVisible = !this.isViewVisible;
    },
    renderCharts() {
      if (this.myBarChart) {
        this.myBarChart.destroy();
      }
      if (this.myDoughnutChart) {
        this.myDoughnutChart.destroy();
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const ctxDoughnut = document.getElementById("myDoughnutChart").getContext("2d");
      
      ctx.canvas.width = 400; 
      ctx.canvas.height = 400; 
      ctxDoughnut.canvas.width = 300; 
      ctxDoughnut.canvas.height = 300; 

      this.myBarChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mar", "Apr", "May", "June", "July", "Aug"],
    datasets: [
      {
        label: "Utilities",
        data: [450, 500, 620, 800, 690, 500],
        backgroundColor: "rgba(34, 167, 240)",
        borderColor: "rgba(34, 167, 240)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
      {
        label: "Housing",
        data: [300, 250, 400, 400, 350, 250],
        backgroundColor: "rgba(242, 38, 19)",
        borderColor: "rgba(242, 38, 19)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
      {
        label: "Entertainment",
        data: [200, 150, 400, 450, 350, 150],
        backgroundColor: "rgba(249, 105, 14)",
        borderColor: "rgba(249, 105, 14)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
      {
        label: "Transportation",
        data: [350, 120, 300, 300, 350, 190],
        backgroundColor: "rgba(249, 191, 59)",
        borderColor: "rgba(249, 191, 59)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
      {
        label: "Food",
        data: [100, 100, 100, 150, 150, 100],
        backgroundColor: "rgba(1,1,122)",
        borderColor: "rgba(1,1,122)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
      {
        label: "Other",
        data: [400, 200, 350, 350, 350, 100],
        backgroundColor: "rgba(102, 51, 153)",
        borderColor: "rgba(102, 51, 153)",
        borderWidth: 1,
        barPercentage: 0.7,
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#000", // Color of x-axis labels
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#000", // Color of y-axis labels
          callback: function (value) {
            if (value >= 1500) {
              return (value / 1000).toFixed(1) + "k";
            }
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333", // Font color for legend labels
          usePointStyle: true,
          borderRadius: 1,
          boxWidth: 30,
        },
        align: "center",
        maxItems: 3,
      },
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 1500,
            borderColor: "black",
            borderWidth: 0.5,
            label: {
              content: "1.5k",
              enabled: true,
              position: "end",
            },
          },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 2000,
            borderColor: "rgba(255, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [3, 3],
            label: {
              position: "right",
              enabled: true,
            },
          },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 2500,
            borderColor: "rgba(255, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [3, 3],
            label: {
              position: "right",
              enabled: true,
            },
          },
        ],
      },
    },
  },
  plugins: [
    {
      id: "highlightAugust",
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const labelIndex = chart.data.labels.indexOf("Aug");

        if (labelIndex !== -1) {
          const x = xAxis.getPixelForTick(labelIndex);
          const y = xAxis.bottom;

          ctx.save();

          ctx.fillStyle = "#5157bf";
          ctx.fillRect(x - 20, y - 20, 40, 20); 

          ctx.fillStyle = "white";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Aug", x, y - 10);
          ctx.arcTo = "4px"; 

          ctx.restore();
        }
      },
    },
  ],
});


      // Initialize doughnut chart
      this.myDoughnutChart = new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
          labels: ["Expenses", "Savings"],
          datasets: [
            {
              data: [300, 300],
              backgroundColor: ["#31cd3e", "#d5d5d5"],
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          cutout: 90,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          animation: {
            onComplete: function (context) {
              var chartInstance = context.chart;
              var ctx = chartInstance.ctx;

              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              var centerX =
                (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
              var centerY =
                (chartInstance.chartArea.top + chartInstance.chartArea.bottom) / 2;

              ctx.fillStyle = "#008000";
              ctx.font = "bold 40px 'Outfit'";
              ctx.fillText("$300", centerX, centerY - 8);

              ctx.fillStyle = "#000";
              ctx.font = "normal 16px 'Outfit'";
              ctx.fillText("of 600 saved", centerX, centerY + 25);
              ctx.fillText("this month", centerX, centerY + 45);
            },
          },
        },
      });

      // Add additional text
      document.getElementById('additionalText').innerText = "Total Savings: $300 of $3,000";
      document.getElementById('additionalText1').innerText = "by April 15, 2023";
    },
  },
};
</script>

<style scoped>
#rhs{
    display: flex;
    min-height: max-content;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
    width: 30%;
    margin: 3rem 8rem;
    max-width: 110%;

}

.active-budget-card {
  padding: 32px 20px;
  border: 0.01px solid #000;
  border-radius: 20px;
  margin-left: 1.2rem;
  position: relative;
  margin-top: 40px;
}

.stats{
  width: 50%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.total {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 30px;
  margin-left: 5rem;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  text-align: center;
}

.divider {
  border: 1px solid #000;
  background-color: #000;
  width: 0;
  height: 40px;
}

.middle{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 30px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  text-align: center;
  align-items: center;
}

.right1{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: -7rem;
  padding: 30px 30px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  text-align: center;
  align-items: center;
}

.box-progress-bar {
  width: 100%;
  height: 32px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #d5d5d5;
  margin: 2px;
}

.box-progress {
  display: block;
  height: 32px;
  background-color: #6970c9;
  border-radius: 6px;
}

.recent{
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  text-align: left;
  margin-left: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recent-transactions {
  flex: 1; 
}

.see-all {
  cursor: pointer; 
}

.minimal-info {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
  
}
.purchased-card{
  padding: 10px 30px;
  border: 0.01px solid #000;
  border-radius: 15px;
  margin: 0.7rem;
  margin-left: 1rem;
  position: relative;
  .right{
    margin-right: -90px;
    text-align: right;
  }
}

#additionalText {
  position: absolute;
  font-size: 14px;
  right: 20px; 
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
}

#additionalText1 {
  position: absolute;
  font-size: 14px;
  right: 60px; 
  top: 60%;
  transform: translateY(-50%);
  text-align: left;
}

/*chart*/


.graph{
  padding: 32px 40px;
  border: 0.01px solid #000;
  border-radius: 20px;
  margin-left: 1rem;
  position: relative;
}

.graph1{
  height: 180px;
  padding: 50px 40px;
  border: 0.01px solid #000;
  border-radius: 20px;
  margin-left: 1rem;
  position: relative;
  
}

.trip{
  margin-left: -17rem;
  margin-top: -2rem;
  font-size: 1.2rem;
}

#bank{
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-left: 10px;
}

#amount1{
  color: #53bd71;
}

@media (max-width: 768px) {
  #rhs{
    display: none;
  }
}
</style>

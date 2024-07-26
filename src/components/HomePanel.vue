<!-- HomePanel.vue -->
<template>
  <div id="main-panel" v-show="currentSection === 'home'">
    <div class="situational-budget">
      Monthly Budget
      <i class="fa-solid fa-angle-down" style="padding: 9px; margin: -4px 0 0 6px;"></i>
      <i class="fa-solid fa-share-nodes"></i>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <i class="fa-solid fa-ellipsis-vertical"></i>
      &nbsp; &nbsp;
      <button class="addbutton" @click="showPopUp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 73" fill="none">
          <circle cx="28" cy="37" r="28" fill="#6970C9"></circle>
          <path d="M25.3539 47.75V25.25H30.7039V47.75H25.3539ZM16.5039 39V34H39.5539V39H16.5039Z" fill="white"></path>
        </svg>
      </button>
    </div>

    <budget-add v-if="showPopup" :categories="categories" @add-budget="handleAddBudget" @close-popup="hidePopUp"></budget-add>

    <select v-model="selectedMonth" class="month">
      <span class="dropdown-arrow"></span>

      <option value="" disabled selected>Month</option>
      <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
    </select>

    <h2 class="category">
      Categories
    </h2>

    <div class="category-scrollview" v-if="selectedMonth === 'April 2023'">
      <div class="category-card" v-for="item in budgetTitle" :key="item.label" style="cursor: pointer;">
        <div class="minimal-info">
          <div class="left">
            <div class="icon">
              <div style="position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column;">
                <div style="position: relative; display: flex; justify-content: center; align-items: center;">
                  <div id="middle-circle">
                    <i :class="item.image" style="color:#fff"></i>
                  </div>
                  <div id="progress-spinner" :style="{ backgroundColor: item.hex }">
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              <div id="title"><span>{{ item.label }}</span></div>
              <div class="additional">
                <span>Spent
                  <span class="amount" style="color: #53bd71">${{ item.spent }}
                  </span> of ${{ item.total }}</span>
              </div>
            </div>
          </div>

          <div class="right">
            <span id="amount" style="color: #53bd71">${{ item.total - item.spent }}</span>
            <span id="green">left</span>
          </div>
        </div>

        <div class="transactions">
          <br>
          <div id="myProgress">
            <div id="myBar" :style="{ width: ((item.spent / item.total) * 100) + '%', backgroundColor: item.hex }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BudgetAdd from './BudgetAdd.vue';

export default {
  name: 'HomePanel',
  components: {
    BudgetAdd,
  },
  data() {
    return {
      showPopup: false,
      currentSection: 'home',
      selectedMonth: '',
      message: '',
      months: [
        'January 2023',
        'February 2023',
        'March 2023',
        'April 2023',
        'June 2023',
        'July 2023',
        'August 2023',
        'September 2023',
        'October 2023',
        'November 2023',
        'December 2023'
      ],
      budgetTitle: [
        { label: "Education", hex: 'rgb(83, 213, 228)', image: 'fa-solid fa-graduation-cap', spent: '40', total: '100' },
        { label: "Entertainment", hex: 'rgb(240, 151, 18)', image: 'fa-solid fa-ticket', spent: '10', total: '50' },
        { label: "Food", hex: 'rgb(17, 6, 135)', image: 'fa-solid fa-utensils', spent: '65', total: '150' },
        { label: "Groceries", hex: 'rgb(52, 196, 62)', image: 'fa-solid fa-bag-shopping', spent: '100', total: '200' },
        { label: "Healthcare", hex: 'rgb(153, 25, 178)', image: 'fa-solid fa-notes-medical', spent: '100', total: '100' },
        { label: "Housing", hex: 'rgb(222, 12, 23)', image: 'fa-solid fa-house', spent: '1750', total: '1750' },
        { label: "Miscellaneous", hex: 'rgb(160, 111, 74)', image: 'fa-brands fa-microsoft', spent: '0', total: '50' },
        { label: "Office", hex: 'rgb(213, 18, 164)', image: 'fa-solid fa-briefcase', spent: '0', total: '20' },
        { label: "Pets", hex: 'rgb(109, 46, 6)', image: 'fa-solid fa-dog', spent: '0', total: '20' },
        { label: "Shopping", hex: 'rgb(28, 66, 192)', image: 'fa-solid fa-cart-shopping', spent: '20', total: '100' },
        { label: "Subscriptions", hex: 'rgb(51, 103, 143)', image: 'fa-solid fa-tv', spent: '35', total: '50' },
        { label: "Transportation", hex: 'rgb(230, 216, 70)', image: 'fa-solid fa-car', spent: '30', total: '100' },
        { label: "Travel", hex: 'rgb(123, 95, 170)', image: 'fa-solid fa-plane', spent: '50', total: '100' },
        { label: "Utilities", hex: 'rgb(89, 148, 224)', image: 'fa-solid fa-lightbulb', spent: '160', total: '300' },
      ],
      categories: {
        Education: { image: 'fa-solid fa-graduation-cap', hex: 'rgb(83, 213, 228)' },
        Entertainment: { image: 'fa-solid fa-ticket', hex: 'rgb(240, 151, 18)' },
        Food: { image: 'fa-solid fa-utensils', hex: 'rgb(17, 6, 135)' },
        Groceries: { image: 'fa-solid fa-bag-shopping', hex: 'rgb(52, 196, 62)' },
        Healthcare: { image: 'fa-solid fa-notes-medical', hex: 'rgb(153, 25, 178)' },
        Housing: { image: 'fa-solid fa-house', hex: 'rgb(222, 12, 23)' },
        Miscellaneous: { image: 'fa-brands fa-microsoft', hex: 'rgb(160, 111, 74)' },
        Office: { image: 'fa-solid fa-briefcase', hex: 'rgb(213, 18, 164)' },
        Pets: { image: 'fa-solid fa-dog', hex: 'rgb(109, 46, 6)' },
        Shopping: { image: 'fa-solid fa-cart-shopping', hex: 'rgb(28, 66, 192)' },
        Subscriptions: { image: 'fa-solid fa-tv', hex: 'rgb(51, 103, 143)' },
        Transportation: { image: 'fa-solid fa-car', hex: 'rgb(230, 216, 70)' },
        Travel: { image: 'fa-solid fa-plane', hex: 'rgb(123, 95, 170)' },
        Utilities: { image: 'fa-solid fa-lightbulb', hex: 'rgb(89, 148, 224)' },
        Gas: { image: 'fa-solid fa-gas-pump', hex: 'rgb(8, 143, 143)' },
      },
    };
  },
  methods: {
    toggleSection(section) {
      this.currentSection = section;
    },
    showPopUp() {
      this.showPopup = true;
    },
    hidePopUp() {
      this.showPopup = false;
    },
    handleAddBudget(budgetData) {
      const existingCategory = this.budgetTitle.find(
        (budget) => budget.label?.toLowerCase() === budgetData.label.toLowerCase()
      );

      if (existingCategory) {
        alert(`${budgetData.label} category already exists.`);
      } else {
        const category = this.categories[budgetData.label];
        if (!category) {
          alert("Selected category does not exist.");
          return;
        }

        const newBudgetData = {
          label: budgetData.label,
          hex: category.hex,
          image: category.image,
          spent: budgetData.spent,
          total: budgetData.total
        };

        this.budgetTitle.push(newBudgetData);
        localStorage.setItem('budgetCategories', JSON.stringify(this.budgetTitle));

        alert(`${budgetData.label} category added successfully.`);
      }
    },
  },
  created() {
    const savedCategories = localStorage.getItem('budgetCategories');
    if (savedCategories) {
      this.budgetTitle = JSON.parse(savedCategories);
    }
  },
};
</script>

<style scoped>
#main-panel{
  display: flex;
  min-height: max-content;
  height: 100%;
  font-size: 19px;
  position: relative;
  box-sizing: border-box;
  padding: 0;
 flex-direction: column;
 align-items: center;
 width: 50%;
 margin: 0px -60px 0px 70px;
 z-index: 1;
}

.situational-budget{
  margin: 10px;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 100px;
    
}
.addbutton{
    all: unset;
    cursor: pointer;
    display: flex;
    margin: -0.8rem;
    width: 80px;
    height: 50px;
    float: right;
    margin-left: 1rem;
}
.fa-share-nodes{
  float: right;
  margin-left: 50%;
  
}

.month {
  margin-right: 12rem;
  font-family: Outfit;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 1;
  color: #53bd71;
  border-radius: 8px;
  border: 1px solid #9DD7AB;
  background: #e6f5ea;
  padding: 8px;
  width: 175px;
  height: 45px;
  text-align: left;
}

.category-scrollview{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 75%;
  padding-bottom: 2rem;
  align-items: center;
  margin-left: 200px;
}

.category-card {
 box-shadow: 0 1px 1px rgba(221,221,221,1);
 width: 35rem;
 height: 84px;
 padding: 12px 0px 12px 0px;
}
.category-scrollview::-webkit-scrollbar {
  display: none;
}

.minimal-info {
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: space-between;
  
}

#myProgress {
  width: 95%;
  background-color: #ddd;
  margin-left: 5%;
}

#myBar {
  text-align: center;
  line-height: 30px;
  color: white;
  height: 6px;
  margin-top:-10px
}

#green{
  text-align: right;
}

</style>

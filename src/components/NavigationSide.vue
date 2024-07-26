<template>
  <div class="left-sidebar">
    <ul class="sidebar">
      <li>
        <a
          href="#" :class="{ active: activeItem === 'overview' }" @click.prevent="toggleActive('overview')">
          Overview
        </a>
      </li>
      <li>
        <a
          href="#" :class="{ active: activeItem === 'budget' }" @click.prevent="toggleActive('budget')">
          Budget
        </a>
      </li>
      <li>
        <a
          href="#" :class="{ active: activeItem === 'transactions' }" @click.prevent="toggleActive('transactions')">
          Transactions
        </a>
      </li>
      <li>
        <a
          href="#" :class="{ active: activeItem === 'trends' }" @click.prevent="toggleActive('trends')">
          Trends
        </a>
      </li>
      <li>
        <a
          href="#" :class="{ active: activeItem === 'savings' }" @click.prevent="toggleActive('savings')">
          Savings Goals
        </a>
      </li>
      <li>
        <a href="#" :class="{ active: activeItem === 'alerts' }" @click.prevent="toggleActive('alerts')">
          Alerts
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationSide',
  data() {
    return {
      activeItem: 'overview', 
    };
  },
  methods: {
    toggleActive(item) {
      this.activeItem = item; 
    },
  },
};
</script>

<style scoped>
.left-sidebar {
  max-height: 100%;
  overflow: hidden;
  position: fixed;
}

.sidebar {
  all: unset;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  height: 200rem;
  box-sizing: border-box;
  text-align: left;
  width: min-content;
  padding: 100px 30px 0 30px;
  gap: 25px;
  border-right: 1px solid #dbdbdb;
  white-space: nowrap;
}

a {
  cursor: pointer;
  font-size: 20px;
  color: #707070;
  text-decoration: none;
  position: relative;
  font-weight: 400;
  transition: color 0.3s;
}

a.active {
  color: #2b2b2b;
}

.sidebar a.active:before {
  content: "";
  width: 3px;
  height: 100%;
  left: -15px;
  background-color: #2b2b2b;
  position: absolute;
}
</style>
